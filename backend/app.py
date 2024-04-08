from flask import Flask, jsonify
from flask_cors import CORS,cross_origin
from pymongo import MongoClient
import datetime
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# MongoDB connection string. Replace it with your connection string if you're using MongoDB Atlas or a different setup.
mongo_uri = "mongodb+srv://jhivanb:25may2001@solarforecast.lh6oebd.mongodb.net/"
client = MongoClient(mongo_uri)


# Replace 'your_db_name' with your actual database name and 'your_collection_name' with your collection's name.
db = client['solarforecast']
collection = db['plant1']

@app.route('/solar/<int:records>', methods=['GET'])
@cross_origin()
def get_solar(records):
    solar_data_point = list(collection.find().sort('Hourly_DATE_TIME', -1).limit(records))
    modified_items = []
    for item in solar_data_point:
        modified_item = {
            'data_time': item['Hourly_DATE_TIME'],
            'power': item['Total_AC_Power']
        }
        modified_items.append(modified_item)
    return jsonify(modified_items)

if __name__ == "__main__":
    app.run()
