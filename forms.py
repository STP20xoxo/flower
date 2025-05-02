from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length

class CheckoutForm(FlaskForm):
    name = StringField("Cardholder Name", validators=[DataRequired()])
    card_number = StringField("Card Number", validators=[DataRequired(), Length(min=16, max=16)])
    expiry = StringField("Expiry Date (MM/YY)", validators=[DataRequired()])
    cvv = StringField("CVV", validators=[DataRequired(), Length(min=3, max=4)])
    submit = SubmitField("Confirm Payment")