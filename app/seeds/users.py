from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demouser', email='demo1@aa.io', password='password', profile_picture='https://i.pinimg.com/736x/ef/f1/5e/eff15eeedbf44c30c43d0bcc9bd29161.jpg')
    oscar = User(
        username='Oscar', email='oscar@gmail.com', password='password', profile_picture='https://static.fotor.com/app/minitools/aiimage/static/media/ai-image-no-task.861133f7.jpg')
    bobbie = User(
        username='Bobbie', email='bobbie@aa.io', password='password', profile_picture='https://skills-swap.s3.us-east-2.amazonaws.com/8721c6c413bc422d8e002a182fe98535.png')
    josh = User(
        username='Josh', email="josh@gmail.com", password="passcode", profile_picture="https://skills-swap.s3.us-east-2.amazonaws.com/ac4bcfdebc5446a0a60629df3f1409d1.jpg")

    Emily = User(
        username="Emily", email="emily@example.com", password="passcode", profile_picture="https://skills-swap.s3.us-east-2.amazonaws.com/abe9ed60ceb340bdb58ca7172f7676c1.png"
    )
    Peter = User(username="Peter", email="peter@example.com", password="passcode",
                 profile_picture="https://skills-swap.s3.us-east-2.amazonaws.com/27495338f0af452ba490ab28fa2fadf3.jpeg")
    Dan = User(username="Dan", email="dan@example.com", password="passcode",
               profile_picture="https://skills-swap.s3.us-east-2.amazonaws.com/f06bd7bf0655499fa8595b50bf7c4386.jpeg")
    Jorge = User(username="Jorge", email="jorge@example.com", password="passcode",
                 profile_picture="https://skills-swap.s3.us-east-2.amazonaws.com/e12be0ff767e40598cb6d02fc433b3ef.png")
    Shay = User(username="Shay", email="shay@example.com", password="passcode", profile_picture="https://skills-swap.s3.us-east-2.amazonaws.com/32b3c65777254947b898cf5dfc314c9b.jpg")
    julian = User(username="Jufeez", email="juliancuh@example.com", password="passcode", profile_picture="https://skills-swap.s3.us-east-2.amazonaws.com/505345a31b7741caa63a880e288ac8e4.png")
    Adan = User(username="Adan939", email="adan@example.com", password="passcode", profile_picture="https://skills-swap.s3.us-east-2.amazonaws.com/667658963cab4f809b4a1f3fd0cf33c8.png")
    Michelle = User(username="Michelle", email="michi@example.com", password="passcode", profile_picture="https://skills-swap.s3.us-east-2.amazonaws.com/5bed9110b05c4dba89555a35b164ec5a.png")
    Vinny = User(username="Vinny", email="vinny@example.com", password="passcode", profile_picture="https://skills-swap.s3.us-east-2.amazonaws.com/e205a670e4774318b1185df4e5608012.png")
    Julia = User(username="Julia", email="julia@example.com", password="passcode", profile_picture="https://skills-swap.s3.us-east-2.amazonaws.com/297ac1a6a48044a89af2ff355fb56476.png")
    Triss = User(username="Triss", email="triss@example.com", password="passcode", profile_picture="https://skills-swap.s3.us-east-2.amazonaws.com/2c537f82b8f54b6e87b1e65dbe322434.png")
    Wolf = User(username="Wolf", email="wolf@example.com", password="passcode", profile_picture="https://skills-swap.s3.us-east-2.amazonaws.com/d218af7396d44082b5a223d66b7cd85b.png")
    Julissa = User(username="Julissa", email="julissa@example.com", password="passcode", profile_picture="https://skills-swap.s3.us-east-2.amazonaws.com/a3f9dff381f64c898fc259fd6171681c.png")
    Juan = User(username="Juan", email="juan@example.com", password="passcode", profile_picture="https://skills-swap.s3.us-east-2.amazonaws.com/286385480bd543508e34c678c8316070.png")
    Daniel = User(username="Daniel", email="daniel@example.com", password="passcode", profile_picture="https://skills-swap.s3.us-east-2.amazonaws.com/2ca2e35ed865486e9e532d21521cefed.png")
    Batman = User(username="Batman", email="batman@example.com", password="passcode", profile_picture="https://skills-swap.s3.us-east-2.amazonaws.com/85023fb262e94ef48fd108cee08e4ec6.png")
    Busyeye = User(username="Busyeye", email="special@example.com", password="Hippo123", profile_picture="https://skills-swap.s3.us-east-2.amazonaws.com/8869064b4669422e8491d72bfd2b5853.png")
    Jasmine = User(username="Jazz", email="jazz@gmail.com", password="passcode", profile_picture="https://skills-swap.s3.us-east-2.amazonaws.com/87837b28ac814c98b80b7d5325cdf354.png")

    db.session.add(demo)
    db.session.add(oscar)
    db.session.add(bobbie)
    db.session.add(josh)
    db.session.add(Emily)
    db.session.add(Peter)
    db.session.add(Dan)
    db.session.add(Jorge)
    db.session.add(Shay)
    db.session.add(julian)
    db.session.add(Adan)
    db.session.add(Michelle)
    db.session.add(Vinny)
    db.session.add(Julia)
    db.session.add(Triss)
    db.session.add(Wolf)
    db.session.add(Julissa)
    db.session.add(Juan)
    db.session.add(Daniel)
    db.session.add(Batman)
    db.session.add(Busyeye)
    db.session.add(Jasmine)

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
