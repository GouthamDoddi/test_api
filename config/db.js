import mongodb from 'mongodb';


const { MongoClient, Db } = mongodb;


//db init
const url = `mongodb+srv://goutham:Price121212@cluster0.ipdqc.mongodb.net/`

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