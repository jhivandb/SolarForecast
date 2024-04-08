import { MongoClient } from "mongodb";

const uri = "mongodb+srv://jhivanb:25may2001@solarforecast.lh6oebd.mongodb.net/";
const client = new MongoClient(uri);

const getSolarData = async () => {
  try {
    await client.connect();
    const database = client.db("solarforecast");
    const plant1 = database.collection("plant1");

    const query = {};
    const solar_data = await plant1.find(query).toArray();

    console.log(solar_data);
    return solar_data;
  } catch (error) {
    console.error("Error fetching solar data:", error);
    throw error;
  } finally {
    await client.close();
  }
};

export default getSolarData;
