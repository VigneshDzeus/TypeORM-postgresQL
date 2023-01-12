import express from 'express';
import { Client } from '../entities/client';

const router = express.Router();

router.post("/api/client", async (req,res)=> {
    const client = await Client.save({...req.body});

    return res.json(client);
})

export{
    router as createClientRouter
}