from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    for review in [

        # SKill2 is a graphic designer
        {
            "reviewer_id": 1,
            "skill_id": 2,
            "text": 'Great graphic design work!!',
        },
        {
            "reviewer_id": 20,
            "skill_id": 2,
            "text": 'I am Vengeance!!',
        },
        {
            "reviewer_id": 7,
            "skill_id": 2,
            "text": 'Guys ill make u money💵💵 check me out!',
        },
        {
            "reviewer_id": 12,
            "skill_id": 2,
            "text": 'They helped me create my logo!!'
        },
        {
            "reviewer_id": 8,
            "skill_id": 2,
            "text": 'They were actually decent I like it!!'
        },


 #Skill 3 is a writer
        {
            "reviewer_id": 2,
            "skill_id": 3,
            "text": 'Excellent writing skills!',
        },
        {
            "reviewer_id": 6,
            "skill_id": 3,
            "text": "I used them for an animation of mine they did great 10/10 would recommend!"
        },
        {
            "reviewer_id": 20,
            "skill_id": 3,
            "text": 'I am Vengeance!!',
        },

#Skill 4 is a video editor
        {
            "reviewer_id": 3,
            "skill_id": 4,
            "text": 'Professional video editing!',
        },
        {
            "reviewer_id": 6,
            "skill_id": 4,
            "text": 'They did an amazing edit on my wedding video!',
        },
        {
            "reviewer_id": 11,
            "skill_id": 4,
            "text": 'Josh edits my val clips he does amazing!',
        },
        {
            "reviewer_id": 20,
            "skill_id": 4,
            "text": 'I am Vengeance!!',
        },

#Skill 5 is a photographer
        {
            "reviewer_id": 4,
            "skill_id": 5,
            "text": 'Amazing photography skills!',
        },
        {
            "reviewer_id": 20,
            "skill_id": 5,
            "text": 'I am Vengeance!!',
        },

#Skill 1 is a coder
        {
            "reviewer_id": 5,
            "skill_id": 1,
            "text": 'Impressive coding expertise!',
        },
        {
            "reviewer_id": 6,
            "skill_id": 1,
            "text": 'Yooo chill!',
        },
        {
            "reviewer_id": 7,
            "skill_id": 1,
            "text": 'Guys ill make u money check me out!',
        },
        {
            "reviewer_id": 8,
            "skill_id": 1,
            "text": 'It was so valid they coding me a website!',
        },
        {
            "reviewer_id": 20,
            "skill_id": 1,
            "text": 'I am Vengeance!!',
        },

        # Skill 7 is a stockbroker
        {
            "reviewer_id": 6,
            "skill_id": 7,
            "text": 'Amc to the 🌑!',
        },
        {
            "reviewer_id": 8,
            "skill_id": 7,
            "text": 'This guy stole all my money!',
        },
        {
            "reviewer_id": 20,
            "skill_id": 7,
            "text": 'I am Vengeance!!',
        },

        #Skill 20
        {
            "reviewer_id": 20,
            "skill_id": 20,
            "text": 'I am Vengeance🧟!!',
        },
        {
            "reviewer_id": 1,
            "skill_id": 20,
            "text": 'Thank you for the carry🧟!!',
        },
        {
            "reviewer_id": 16,
            "skill_id": 20,
            "text": 'Had fun playing with them!!',
        },

        #SKill 10
         {
            "reviewer_id": 8,
            "skill_id": 8,
            "text": "The amg couldn't beat my truck!!",
        },
        {
            "reviewer_id": 6,
            "skill_id": 8,
            "text": "The amg yoo it was valid yooo!!",
        },
         {
            "reviewer_id": 1,
            "skill_id": 8,
            "text": "I even got to drive the amgggg!!",
        },

    ]:
        db.session.add(Review(**review))

    db.session.commit()

def undo_reviews():
    if environment=='production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
