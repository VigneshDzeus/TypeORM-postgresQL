import express from 'express';
import { Client } from '../entities/client';
import { Banker } from '../entities/banker';

const router = express.Router();

router.post("/api/banker/:bankerId/client/:clientId", async (req,res) => {
    const {clientId,bankerId} = req.params;

    const client = await Client.findOne(parseInt(clientId));
    const banker = await Banker.findOne(parseInt(bankerId));

    if(!banker || !client){
        return res.json({
            msg: "banker or client not found"
        })
    }

    banker.clients = [
        ...banker.clients,
        client
    ]

    await banker.save();
    
     return res.json({
            msg: "banker is connected to the client"
        }) 

})

export {
    router as ConnectBankertoClient
}