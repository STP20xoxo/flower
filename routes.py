from flask import Blueprint, render_template, redirect, url_for, session, request
from models import db, Flower
from forms import CheckoutForm
from flask import jsonify 

main = Blueprint('main', __name__)


@main.route('/')
def home():
    flowers = Flower.query.all()
    return render_template('home.html', flowers=flowers)

@main.route('/product/<int:flower_id>')
def product(flower_id):
    flower = Flower.query.get_or_404(flower_id)
    return render_template('product.html', flower=flower)

@main.route('/add_to_basket/<int:flower_id>')
def add_to_basket(flower_id):
    basket = session.get('basket', [])
    basket.append(flower_id)
    session['basket'] = basket
    return redirect(url_for('main.basket'))

@main.route('/basket')
def basket():
    basket_ids = session.get('basket', [])
    flowers = Flower.query.filter(Flower.id.in_(basket_ids)).all()
    total = sum(f.price for f in flowers)
    return render_template('basket.html', flowers=flowers, total=total)

@main.route('/checkout', methods=['GET', 'POST'])
def checkout():
    form = CheckoutForm()
    basket_ids = session.get('basket', [])
    flowers = Flower.query.filter(Flower.id.in_(basket_ids)).all()
    total = sum(f.price for f in flowers)

    if form.validate_on_submit():
        session['basket'] = []
        success = True
        return render_template('checkout.html', form=form, total=total, success=success, name=form.name.data)

    return render_template('checkout.html', form=form, total=total, success=False)

@main.route('/flower-description/<int:flower_id>', methods=['GET'])
def flower_description(flower_id):
    flower = Flower.query.get_or_404(flower_id)
    return jsonify(description=flower.description)