from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import User, Skill, db
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3


skill_routes = Blueprint('skill', __name__)

@skill_routes.route('/all', methods=['GET'])
@login_required
def get_skills():
    """
    Get a list of all skills.
    """
    skills = Skill.query.all()
    return jsonify([skill.to_dict() for skill in skills])


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
        return jsonify({'message': "You do not have permission to delete this server"}), 403


@login_required
@skill_routes.route('/create', methods =['POST'])
def create_skill():
    None
