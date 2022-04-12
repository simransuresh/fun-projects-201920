from flask import Flask, json, jsonify, request
from flask_mysqldb import MySQL
from datetime import datetime
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from flask_jwt_extended import create_access_token

app = Flask(__name__)

app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
#app.config['MYSQL_DB'] = 'user1'
app.config['MYSQL_DB'] = 'usertest'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
app.config['JWT_SECRET_KEY'] = 'secret'

mysql = MySQL(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
CORS(app)

@app.route("/users/register", methods=['POST'])
def register():
    cur = mysql.connection.cursor()
    name = request.get_json()['name']
    email = request.get_json()['email']
    password = bcrypt.generate_password_hash(request.get_json()['password']).decode('utf-8')
    #password = request.get_json()['password']
    created = datetime.utcnow()

    query1 = "INSERT INTO accountdraft(name, email, password, created) values('{0}','{1}','{2}','{3}');".format(name, email, password, created)
    cur.execute(query1)
    mysql.connection.commit()

    query2 = "INSERT INTO moneydraft(name, income, source, expense, reason,  balance, created) VALUES('{0}',0,'',0,'',0,'{1}')".format(name,created)
    cur.execute(query2)
    mysql.connection.commit()

    result = {
         'name':name,
         'email':email,
         'password':password,
         'created':created
    }

    return jsonify({'result':result})

@app.route("/users/login", methods=['POST'])
def login():
    cur = mysql.connection.cursor()
    email = request.get_json()['email']
    password = request.get_json()['password']
    result = ''
    query = "SELECT * FROM accountdraft where email='{0}'".format(email)
    cur.execute(query)

    rv = cur.fetchone()

    # if rv['password']==password:
    #     result = jsonify({"result":"login success"})

    if bcrypt.check_password_hash(rv['password'],password):
        access_token = create_access_token(identity = {'name': rv['name'],'email': rv['email']})

        result = jsonify({'token':access_token})
    else:
	    result = jsonify({'error': 'invalid userpass'})

    return result

@app.route('/users/income', methods=['POST'])
def addIncome():
    cur = mysql.connection.cursor()
    name = request.get_json()['name']
    income = request.get_json()['income']
    source = request.get_json()['source']
    created = datetime.utcnow()
    #complete query
    query1 = "SELECT balance FROM moneydraft WHERE moneydraft.name='{0}' ORDER BY created DESC".format(name)
    cur.execute(query1)
    mysql.connection.commit()

    rv = cur.fetchone()
    #print(rv['balance'])
    balance = rv['balance'] + income
    print(balance)

    query2 = "INSERT INTO moneydraft(name, income, source, expense, reason,  balance, created) VALUES('{0}',{1},'{2}',0,'NA',{3},'{4}')".format(name,income,source,balance,created)
    cur.execute(query2)
    mysql.connection.commit()

    result=  {
        'response': 'income added',
        'balance' : balance
    }

    #return jsonify({'response': 'income added','balance' : balance})
    return jsonify(result)

@app.route('/users/expense', methods=['POST'])
def addExpense():
    cur = mysql.connection.cursor()
    name = request.get_json()['name']
    expense = request.get_json()['expense']
    reason = request.get_json()['reason']
    created = datetime.utcnow()
    #complete query
    query1 = "SELECT balance FROM moneydraft WHERE moneydraft.name='{0}' ORDER BY created DESC".format(name)
    cur.execute(query1)
    mysql.connection.commit()
    
    rv = cur.fetchone()
    print(rv['balance'])
    balance = rv['balance'] - expense
    print(balance)

    query2 = "INSERT INTO moneydraft(name, income, source, expense, reason,  balance, created) VALUES('{0}',0,'NA',{1},'{2}',{3},'{4}')".format(name,expense,reason,balance,created)
    cur.execute(query2)
    mysql.connection.commit()

    result=  {
        'response': 'expense added',
        'balance' : balance
    }

    #return jsonify({'response': 'income added','balance' : balance})
    return jsonify(result)

@app.route('/users/balance', methods=['POST'])
def showBalance():
    cur = mysql.connection.cursor()
    name = request.get_json()['name']

    query = "SELECT balance FROM moneydraft WHERE moneydraft.name='{0}' ORDER BY created DESC".format(name)
    cur.execute(query)
    mysql.connection.commit()
    rv = cur.fetchone()
    balance = rv['balance']

    print("CURRENT BALANCE AS ON '{0}' IS {1}".format(datetime.utcnow(),balance))

    result = {
        'username': name,
        'balance': balance
    }

    return jsonify(result)

@app.route('/users/transactions',methods=['POST'])
def viewTransactions():
    cur = mysql.connection.cursor()
    name = request.get_json()['name']
    start_date = request.get_json()['start_date']
    end_date = request.get_json()['end_date']

    #query = "SELECT * from moneydraft WHERE moneydraft.name='{0}' AND moneydraft.created >= '{1}' AND moneydraft.created <= '{2}'".format(name,start_date,end_date)
    query = "SELECT * from moneydraft WHERE name='{0}' AND created BETWEEN '{1} 00:00:00' AND '{2} 23:59:00' ORDER BY created DESC".format(name,start_date,end_date)
    cur.execute(query)
    mysql.connection.commit()
    rv = cur.fetchall()
    #num_fields = len(cursor.description)
    #field_names = [i[0] for i in rv]

    print(rv)

    result = {
        'response': 'transactions retrieved success',
        'data': rv
    }

    return jsonify(result)

if __name__ == "__main__":
    app.run(debug=True)