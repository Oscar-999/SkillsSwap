from flask_wtf import FlaskForm
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField
from wtforms.validators import DataRequired
from flask_wtf.file import FileField, FileAllowed, FileRequired
from ..api.AWS_helpers import ALLOWED_EXTENSIONS


class UpdateRequestForm(FlaskForm):
    name = StringField("Name", validators=[DataRequired()])
    budget = IntegerField("Budget", validators=[DataRequired()])
    req_image = FileField("Request Image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
    request_description = StringField("Request Description")
    submit = SubmitField("Submit")
