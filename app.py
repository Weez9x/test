from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

# Настройка базы данных (SQLite)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///x2group.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Модель пользователя
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    telegram_id = db.Column(db.String(50), unique=True, nullable=False)
    balance = db.Column(db.Float, default=0.0)

# Создание таблиц в базе данных
with app.app_context():
    db.create_all()

# Роут для получения баланса пользователя
@app.route('/get_balance', methods=['POST'])
def get_balance():
    data = request.json
    telegram_id = data.get('telegram_id')

    user = User.query.filter_by(telegram_id=telegram_id).first()
    if user:
        return jsonify({"balance": user.balance})
    else:
        return jsonify({"error": "Пользователь не найден"}), 404

# Роут для обновления баланса
@app.route('/update_balance', methods=['POST'])
def update_balance():
    data = request.json
    telegram_id = data.get('telegram_id')
    amount = data.get('amount')

    user = User.query.filter_by(telegram_id=telegram_id).first()
    if user:
        user.balance += amount
        db.session.commit()
        return jsonify({"balance": user.balance})
    else:
        return jsonify({"error": "Пользователь не найден"}), 404

if __name__ == '__main__':
    app.run(debug=True)
