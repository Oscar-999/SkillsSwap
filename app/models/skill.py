from .db import db, environment, SCHEMA, add_prefix_for_prod
from .users_skills import user_skills
from datetime import datetime
class Skill(db.Model):
    __tablename__ = 'skills'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    skill_image = db.Column(db.String(255))
    price = db.Column(db.Integer)

    users = db.relationship('User', secondary=user_skills, back_populates='skills', cascade='all, delete-orphan')
    reviews = db.relationship('Review', back_populates='skill', cascade='all, delete-orphan')
    service_requests = db.relationship('ServiceRequest', back_populates='skill', cascade='all, delete-orphan')


    def __repr__(self):
        return f"<Skill id:{self.id} name:{self.name}>"

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'created_at': self.created_at.strftime('%Y-%m-%d %H:%M:%S'),
            'skill_image': self.skill_image,
            'price': self.price
        }

    def average_rating(self):
        if not self.reviews:
            return None
        total_ratings = sum(review.rating for review in self.reviews)
        average = total_ratings / len(self.reviews)
        return round(average, 1)
