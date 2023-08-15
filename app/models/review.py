from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    reviewer_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')), nullable=False)
    skill_id = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('skills.id')), nullable=False)
    text = db.Column(db.String(100))
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='reviews')
    skill = db.relationship('Skill', back_populates='reviews')

    def __repr__(self):
        return f"<Review id:{self.id} reviewer_id:{self.reviewer_id}>"

    def to_dict(self):
        return {
            'id': self.id,
            'reviewerId': self.reviewer_id,
            'skillId': self.skill_id,
            'text': self.text,
            'stars': self.stars,
            'createdAt': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'updatedAt': self.updated_at.strftime('%Y-%m-%d %H:%M:%S')
        }
