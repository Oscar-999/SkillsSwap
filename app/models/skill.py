from .db import db, environment, SCHEMA, add_prefix_for_prod
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
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    user = db.relationship('User', back_populates='skills')
    reviews = db.relationship('Review', back_populates='skill', cascade="all, delete-orphan")
    service_requests = db.relationship('ServiceRequest', back_populates='skill',cascade="delete-orphan, all")



    def __repr__(self):
        return f"<Skill id:{self.id} name:{self.name}>"

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'skill_image': self.skill_image,
            'price': self.price
        }

    def average_rating(self):
        if not self.reviews:
            return None
        total_ratings = sum(review.rating for review in self.reviews)
        average = total_ratings / len(self.reviews)
        return round(average, 1)
