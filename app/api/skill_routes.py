from flask import Blueprint, jsonify, session, request
from flask_login import current_user, login_required
from app.models import User, Skill, db
from .AWS_helpers import get_unique_filename, upload_file_to_s3, remove_file_from_s3


skill_routes = Blueprint('skill', __name__)

@skill_routes.route('/')
@login_required
def get_skills():
    """
    Get a list of all skills.
    """
    skills = Skill.query.all()
    return jsonify([skill.to_dict() for skill in skills])



