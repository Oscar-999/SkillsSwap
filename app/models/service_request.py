from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ServiceRequest(db.Model):
    __tablename__ = 'service_requests'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey('skills.id'), nullable=False)
    request_description = db.Column(db.String)
    budget = db.Column(db.Integer)
    name = db.Column(db.String(50))
    req_image = db.Column(db.String(225))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    user = db.relationship('User', back_populates='service_requests', cascade='all, delete-orphan')
    skill = db.relationship('Skill', back_populates='service_requests', cascade='all, delete-orphan')
