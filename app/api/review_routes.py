from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import Review, db

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


@review_routes.route('<int:reviewId', methods=["PUT"])
@login_required
def edit_review():
    None


    
