from flask.cli import AppGroup
from .users import seed_users, undo_users
from .skills import seed_skills, undo_skills
from .users_skills import seed_users_skills, undo_users_skills
from .reviews import seed_reviews, undo_reviews
from .service_requests import seed_service_requests, undo_service_requests

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_service_requests()
        undo_reviews()
        undo_users_skills()
        undo_skills()
        undo_users()
    seed_users()
    seed_skills()
    seed_users_skills()
    seed_reviews()
    seed_service_requests()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_service_requests()
    undo_reviews()
    undo_users_skills()
    undo_skills()
    undo_users()
