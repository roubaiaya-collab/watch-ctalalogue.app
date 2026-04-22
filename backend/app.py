from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_db_connection

app = Flask(__name__)
CORS(app)

# ➕ Add product
@app.route('/api/products', methods=['POST'])
def add_product():
    try:
        data = request.json
        
        # Validation
        name = data.get('name')
        price = data.get('price')
        description = data.get('description', '')
        image = data.get('image', '')

        if not name or not price:
            return jsonify({"error": "fill the name and the price field"}), 400

        try:
            price = float(price)
        except ValueError:
            return jsonify({"error": "the price must be a number"}), 400

        # DB connection
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
        INSERT INTO products (name, description, price, image)
        VALUES (%s, %s, %s, %s)
        """
        values = (name, description, price, image)

        cursor.execute(query, values)
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({"message": "Product added successfully"}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# 📋 Get + 🔍 Search products
@app.route('/api/products', methods=['GET'])
def get_products():
    try:
        search = request.args.get('search')

        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM products")

        products = cursor.fetchall()

        cursor.close()
        conn.close()

        return jsonify(products)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
