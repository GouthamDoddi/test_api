import mongodb from 'mongodb';
import dotenv  from "dotenv"
import { dirname } from 'path';
import { fileURLToPath } from 'url';


const { MongoClient, Db } = mongodb;

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: __dirname+'././.env' });


//db init
const url = process.env.db

console.log(url);

const connect = async () => {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log(`this cluster is Cluster0`)

    try {
        await client.connect();
        const db = client.db('test_apis')

        console.log(`connected to db Cluster0`)
        console.log(`connected to db Cluster0`);
        return db

    } catch (err) {
        console.log(err)
        console.error(`error connecting to db Cluster0`);
        console.error(err);
        client.close();
    }

}

const db = await connect()


export default db;