from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Flower(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(300), nullable=False)
    price = db.Column(db.Float, nullable=False)
    image_url = db.Column(db.String(100), nullable=False)
    
    product_info = db.Column(db.Text)
    detailed_environmental_impact = db.Column(db.Text)
    extended_delivery_info = db.Column(db.Text)

    def __repr__(self):
        return f"<Flower {self.name}>"
