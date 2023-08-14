from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Review, db
from ..forms.createreview_form import CreateReviewForm

review_routes = Blueprint('review', __name__)


@review_routes.route('/<int:reviewId>', methods=["DELETE"])
@login_required
def delete_review(reviewId):

    review = Review.query.get(reviewId)

    if review is None:
        return jsonify({'message': "Review doesn't exist"}), 404

    if current_user.id != review.reviewer_id:
        return jsonify({'message': "You do not have permission to delete this review"}), 403

    db.session.delete(review)
    db.session.commit()

    return jsonify({'message': 'Review deleted success'}), 200


@review_routes.route('<int:reviewId>', methods=["PUT"])
@login_required
def edit_review(reviewId):

    form = CreateReviewForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review = Review.query.filter(Review.id == reviewId).first()

        if not review:
            return jsonify({"message": "Review couldn't be found"}), 404

        if review.reviewer_id != current_user.id:
            return jsonify({"message": "You don't have permission to update this review"}), 403

        if form.data["review_text"]:
            review.review_text = form.data["review_text"]
        if form.data["stars"]:
            review.stars = form.data["stars"]

        db.session.commit()

        updated_review = review.to_dict()

        print(updated_review)

        return updated_review

    if form.errors:
        return jsonify({"message": "Form validation failed", "errors": form.errors}), 400

    return jsonify({"error": "An unknown error has occurred"}), 500
