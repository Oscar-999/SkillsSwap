from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import User, ServiceRequest, db
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from app.forms import CreateRequestForm, UpdateRequestForm

request_routes = Blueprint('request', __name__)

@request_routes.route('/all', methods=['GET'])
@login_required
def get_request():
    """
    Get a list of all request.
    """
    requests = ServiceRequest.query.all()
    return jsonify([request.to_dict() for request in requests])


@login_required
@request_routes.route('/<int:requestId>', methods=['GET'])
def get_single_request(requestId):
    request = ServiceRequest.query.get(requestId)

    if request is None:
        return jsonify({'message': "Request doesn't exist"}), 404

    return jsonify(request.to_dict()), 200


@login_required
@request_routes.route('/<int:requestId>', methods=['DELETE'])
def delete_request(requestId):

    request = ServiceRequest.query.get(requestId)

    if request is None:
        return jsonify({'message': "Request doesn't exist"}), 404

    if current_user.id != request.owner_id:
        return jsonify({'message': "You do not have permission to delete this request"}), 403

    db.session.delete(request)
    db.session.commit()

    return jsonify({'message': 'Request deleted success'}), 200

@login_required
@request_routes.route('/create', methods =['POST'])
def create_request():
    form = CreateRequestForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newRequest = ServiceRequest(
            name=form.data['name'],
            owner_id=current_user.id,
            budget=form.data['budget'])


        req_description = form.data['request_description']
        newRequest.req_description = req_description if req_description != None else ""

        req_image = form.data['req_image']
        req_image.filename = get_unique_filename(req_image.filename)
        uploadReqImage = upload_file_to_s3(req_image)
        if 'url' not in uploadReqImage:
            return uploadReqImage
        else:
            newRequest.req_image = uploadReqImage['url']


        db.session.add(newRequest)
        db.session.commit()

        request_dict = newRequest.to_dict()
        print('success request route')
        return request_dict
    else:
        print('fail request route')
        return form.errors, 400


@login_required
@request_routes.route('/<int:requestId>', methods=['PUT'])
def edit_request(requestId):

    request = ServiceRequest.query.get(requestId)

    if request is None:
        return jsonify({'message': "Request doesn't exist"}), 404

    if current_user.id != request.owner_id:
        return jsonify({"message": 'You do not have permission to edit this request'}), 403

    form = UpdateRequestForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        request.name = form.data['name']
        request.budget = form.data['budget']

        req_description = form.data['request_description']
        request.req_description = req_description if req_description != None else ""

        req_image = form.data['req_image']
        if req_image:
            req_image.filename = get_unique_filename(req_image.filename)
            uploadReqImage = upload_file_to_s3(req_image)
            if 'url' in uploadReqImage:
                request.req_image = uploadReqImage['url']

        db.session.commit()

        req_dict = request.to_dict()
        return req_dict
    else:
        return form.errors, 400
