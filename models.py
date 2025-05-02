from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Flower(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(100), nullable=False)
    environment_impact = db.Column(db.Float, nullable=False)  # kg CO2

    def __repr__(self):
        return f"<Flower {self.name}>"
