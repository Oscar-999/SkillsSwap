from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ServiceRequest(db.Model):
    __tablename__ = 'service_requests'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('skills.id')), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    budget = db.Column(db.Integer)
    name = db.Column(db.String(50), nullable=False)
    # image = db.Column(db.String(225))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='service_requests')
    skill = db.relationship('Skill', back_populates='service_requests')

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.user_id,
            'skillId': self.skill_id,
            'description': self.description,
            'budget': self.budget,
            'name': self.name,
            # 'image': self.image,
            'createdAt': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'updatedAt': self.updated_at.strftime('%Y-%m-%d %H:%M:%S')
        }
