from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired,  ValidationError


class CreateReviewForm(FlaskForm):
    text = StringField("Text")
    # stars = IntegerField("Stars", validators=[DataRequired()])
    submit = SubmitField("Submit")
