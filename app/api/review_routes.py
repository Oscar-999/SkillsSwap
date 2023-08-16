from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Review, db
from ..forms.createreview_form import CreateReviewForm

review_routes = Blueprint('review', __name__)


@review_routes.route('/<int:reviewId>', methods=["DELETE"])
@login_required
def delete_review(reviewId):

    review = Review.query.filter(Review.id == reviewId).first()

    db.session.delete(review)
    db.session.commit()

    message = f"Channel {reviewId} deleted"

    print(message)

    return {"message": message}


@review_routes.route('<int:reviewId>', methods=["PUT"])
@login_required
def edit_review(reviewId):

    form = CreateReviewForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review.query.filter(Review.id == reviewId).first()

        if form.data["text"]:
            review.text = form.data["text"]
        # if form.data["stars"]:
        #     review.stars = form.data["stars"]

        db.session.commit()

        updated_review = review.to_dict()

        print(updated_review)

        return updated_review

    if form.errors:
        return jsonify({"message": "Form validation failed", "errors": form.errors}), 400

    return jsonify({"error": "An unknown error has occurred"}), 500



@review_routes.route('/current', methods=['GET'])
@login_required
def get_user_reviews():

    """
    Get a list of all reviews written by the current user.
    """
    user_reviews = Review.query.filter_by(reviewer_id=current_user.id).all()
    return jsonify([review.to_dict() for review in user_reviews])
