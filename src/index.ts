import * as grpc from '@grpc/grpc-js';
import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';

class Server {
    private server: grpc.Server;
    private dbClient: MongoClient;

    constructor() {
        this.server = new grpc.Server();
        this.dbClient = new MongoClient(MONGO_URI);
    }

    start() {
        this.dbClient.connect().then(() => {
            console.log('Connected to MongoDB');
        }).catch((err) => {
            console.error('Error connecting to MongoDB', err);
        });

        this.server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), (err, port) => {
            console.log(`Server started, listening:`);
        });
    }
}

const server = new Server();
server.start();