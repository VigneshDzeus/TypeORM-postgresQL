import express from "express";
import {Transaction, TransactionTypes} from "../entities/transaction";
import {Client} from "../entities/client"

const router = express.Router();

router.post("/api/client/:clientId/transaction", async (req,res)=> {
    const {clientId} = req.params;
    const client = await Client.findOne(parseInt(clientId))
    if(!client){
        return res.json({
            msg: "client not found"
        })
    }

    await Transaction.save({
        ...req.body,
        client
    })
    
    if(req.body.type === TransactionTypes.DEPOSIT){
        client.balance = client.balance +req.body.amount 
    }
    else if( req.body.type === TransactionTypes.WITHDRAW){
        client.balance = client.balance - req.body.amount
    }

    await client.save();

    return res.json({
        msg: "Trancaction completed"
    })
})

export {
    router as createTransactionRouter
}