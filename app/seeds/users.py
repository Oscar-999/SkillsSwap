from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demouser', email='demo1@aa.io', password='password', profile_picture='https://i.pinimg.com/736x/ef/f1/5e/eff15eeedbf44c30c43d0bcc9bd29161.jpg')
    oscar = User(
        username='Oscar', email='oscar@gmail.com', password='password', profile_picture='https://static.fotor.com/app/minitools/aiimage/static/media/ai-image-no-task.861133f7.jpg')
    bobbie = User(

        username='Bobbie', email='bobbie@aa.io', password='password', profile_picture='https://marketplace.canva.com/EAE6OJ2qP8U/1/0/1600w/canva-gamer-with-glasses-character-twitch-profile-picture-CVfgWIJGgRo.jpg')
    josh = User(
        username='Josh', email="josh@gmail.com", password="passcode", profile_picture="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg")

    Emily = User(
        username="Emily", email="emily@example.com", password="passcode", profile_picture="https://marketplace.canva.com/EAFbOMDjHes/1/0/1600w/canva-blue-geometric-linkedin-profile-picture-3wa9KTVCgfk.jpg"
    )
    db.session.add(demo)
    db.session.add(oscar)
    db.session.add(bobbie)
    db.session.add(josh)
    db.session.add(Emily)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
