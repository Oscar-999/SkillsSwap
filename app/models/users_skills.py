from .db import db, environment, SCHEMA, add_prefix_for_prod

user_skills = db.Table(
    'user_skills',
    db.Model.metadata,
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), primary_key=True ),
    db.Column('skill_id', db.Integer, db.ForeignKey(add_prefix_for_prod('skills.id')), primary_key=True )
)

if environment == "production":
    user_skills.schema = SCHEMA
