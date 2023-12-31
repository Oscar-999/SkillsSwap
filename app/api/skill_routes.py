from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import User, Skill, Review, ServiceRequest, db
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3
from app.forms import CreateSkillForm, UpdateSkillForm, CreateReviewForm, CreateRequestForm

skill_routes = Blueprint('skill', __name__)


@skill_routes.route('/all', methods=['GET'])
@login_required
def get_skills():
    """
    Get a list of all skills.
    """
    skills = Skill.query.all()
    return jsonify([skill.to_dict() for skill in skills])


@skill_routes.route('/<int:skillId>/reviews', methods=['GET'])
@login_required
def get_skill_reviews(skillId):
    """
    Returns a list of all reviews for the specified skill, including user information.
    """
    skill = Skill.query.get(skillId)

    if skill is None:
        return jsonify({'message': "Skill doesn't exist"}), 404

    review_list = []
    for review in skill.reviews:
        review_dict = review.to_dict()

        # Include user information in the review dictionary
        review_dict['user'] = review.user.to_dict()

        review_list.append(review_dict)

    return jsonify(review_list)



@skill_routes.route('/<int:skillId>/requests', methods=['GET'])
@login_required
def get_skill_request(skillId):
    """
    Returns a list of all reviews for the specified skill.
    """
    skill = Skill.query.get(skillId)

    if skill is None:
        return jsonify({'message': "Skill doesn't exist"}), 404

    request_list = []
    for service_request in skill.service_requests:
        request_list.append(service_request.to_dict())

    return jsonify(request_list)


@login_required
@skill_routes.route('/<int:skillId>', methods=['GET'])
def get_single_skill(skillId):
    skill = Skill.query.get(skillId)

    if skill is None:
        return jsonify({'message': "Skill doesn't exist"}), 404

    return jsonify(skill.to_dict()), 200


@login_required
@skill_routes.route('/<int:skillId>', methods=['DELETE'])
def delete_skill(skillId):

    skill = Skill.query.get(skillId)

    if skill is None:
        return jsonify({'message': "Skill doesn't exist"}), 404

    if current_user.id != skill.owner_id:
        return jsonify({'message': "You do not have permission to delete this skill"}), 403

    db.session.delete(skill)
    db.session.commit()

    return jsonify({'message': 'Skill deleted success'}), 200


@login_required
@skill_routes.route('/create', methods=['POST'])
def create_skill():
    form = CreateSkillForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        newSkill = Skill(
            name=form.data['name'],
            owner_id=current_user.id,
            price=form.data['price'])

        description = form.data['description']
        newSkill.description = description if description != None else ""

        skill_image = form.data['skill_image']
        skill_image.filename = get_unique_filename(skill_image.filename)
        uploadSkillImage = upload_file_to_s3(skill_image)
        if 'url' not in uploadSkillImage:
            return uploadSkillImage
        else:
            newSkill.skill_image = uploadSkillImage['url']

        secondary_image = form.data['secondary_image']
        secondary_image.filename = get_unique_filename(
            secondary_image.filename)
        uploadSecondaryImage = upload_file_to_s3(secondary_image)
        if 'url' not in uploadSecondaryImage:
            return uploadSecondaryImage
        else:
            newSkill.secondary_image = uploadSecondaryImage['url']

        third_image = form.data['third_image']
        third_image.filename = get_unique_filename(third_image.filename)
        uploadThirdImage = upload_file_to_s3(third_image)
        if 'url' not in uploadThirdImage:
            return uploadThirdImage
        else:
            newSkill.third_image = uploadThirdImage['url']

        db.session.add(newSkill)
        db.session.commit()

        skill_dict = newSkill.to_dict()
        print('success skill route')
        return skill_dict
    else:
        print('fail skill route')
        return form.errors, 400


@login_required
@skill_routes.route('/<int:skillId>', methods=['PUT'])
def edit_skill(skillId):

    skill = Skill.query.get(skillId)

    if skill is None:
        return jsonify({'message': "Skill doesn't exist"}), 404

    if current_user.id != skill.owner_id:
        return jsonify({"message": 'You do not have permission to edit this skill'}), 403

    form = UpdateSkillForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        skill.name = form.data['name']
        skill.price = form.data['price']

        description = form.data['description']
        skill.description = description if description != None else ""

        # Handle image updates (similar to the create_skill route)
        skill_image = form.data['skill_image']
        if skill_image:
            skill_image.filename = get_unique_filename(skill_image.filename)
            uploadSkillImage = upload_file_to_s3(skill_image)
            if 'url' in uploadSkillImage:
                skill.skill_image = uploadSkillImage['url']

        secondary_image = form.data['secondary_image']
        if secondary_image:
            secondary_image.filename = get_unique_filename(
                secondary_image.filename)
            uploadSecondaryImage = upload_file_to_s3(secondary_image)
            if 'url' in uploadSecondaryImage:
                skill.secondary_image = uploadSecondaryImage['url']

        third_image = form.data['third_image']
        if third_image:
            third_image.filename = get_unique_filename(third_image.filename)
            uploadThirdImage = upload_file_to_s3(third_image)
            if 'url' in uploadThirdImage:
                skill.third_image = uploadThirdImage['url']

        db.session.commit()

        skill_dict = skill.to_dict()
        return skill_dict
    else:
        return form.errors, 400

@skill_routes.route('/<int:skill_id>/reviews', methods=["POST"])
@login_required  # Assuming you want to require authentication for creating reviews
def create_review(skill_id):
    form = CreateReviewForm()
    form.csrf_token.data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
        new_review = Review(
            skill_id=skill_id,
            reviewer_id=current_user.id,
            text=form.text.data,
            # stars=form.stars.data
        )

        db.session.add(new_review)
        db.session.commit()

        # Fetch the user object associated with the current_user and convert it to a dictionary
        user_dict = current_user.to_dict()

        # Include the user information in the new_review dictionary
        review_data = new_review.to_dict()
        review_data['user'] = user_dict

        return jsonify(review_data)  # Return review data with user information as JSON
    else:
        error_messages = []
        for field, errors in form.errors.items():
            for error in errors:
                error_messages.append(f"{form[field].label.text}: {error}")

        return jsonify({"errors": error_messages}), 400


@skill_routes.route('/<int:skill_id>/requests', methods=["POST"])
def create_request(skill_id):
    form = CreateRequestForm()
    form.csrf_token.data = request.cookies.get('csrf_token')

    if form.validate_on_submit():
        try:
            new_request = ServiceRequest(
                skill_id=skill_id,
                user_id=current_user.id,
                name=form.name.data,
                description=form.description.data,
                budget=form.budget.data,
            )

            db.session.add(new_request)
            db.session.commit()

            return jsonify(new_request.to_dict()), 201
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    else:
        error_messages = [f"{form[field].label.text}: {error}" for field, errors in form.errors.items() for error in errors]
        return jsonify({'errors': error_messages}), 400

@skill_routes.route('/current', methods=['GET'])
def get_user_skills():
    """
    Get a list of all skills owned by the current user.
    """
    user_skills = Skill.query.filter_by(owner_id=current_user.id).all()
    return jsonify([skill.to_dict() for skill in user_skills])
