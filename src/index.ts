import {createConnection} from 'typeorm';
import express  from 'express';
import { Banker } from './entities/banker';
import {Client} from "./entities/client"
import { Transaction } from './entities/transaction';
import { createClientRouter } from './routes/create_client';
import { createBankerRouter } from './routes/create_banker';
import { createTransactionRouter } from './routes/create_transaction';
import { ConnectBankertoClient } from './routes/connect_bankerToClient';

const app = express()

const main =  async()=>{
    try {
        const connection = await createConnection({
        type: "postgres",
        host: "localhost",
        port: 5432, 
        username: 'postgres',
        password: "password",
        database: "postgres",
        entities: [Client,Banker,Transaction],
        synchronize: true
    })
    console.log("connected to database");   

    app.use(express.json());
    app.use(createTransactionRouter)
    app.use(createClientRouter)
    app.use(createBankerRouter)
    app.use(ConnectBankertoClient)

    app.listen(5000, ()=> console.log("running on port 5000"))

    } catch (error) {
        console.log(error)
    }
}
main();