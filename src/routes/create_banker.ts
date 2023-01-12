import express from 'express';
import { Banker } from '../entities/banker';

const router = express.Router();

router.post("/api/banker", async (req,res)=> {
    const banker = await Banker.save({...req.body});

    return res.json(banker);
})

export{
    router as createBankerRouter
}