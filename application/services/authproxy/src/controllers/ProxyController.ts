import { Request, Response, NextFunction } from 'express';
import { Proxyservice } from '../services/Proxyservice';

let proxyservice = new Proxyservice;

export class Proxycontroller {

    public usercontroller(req: Request, res: Response) {

        var userdetails = req.body;
        proxyservice.userservice(userdetails, (response) => {
            res.status(200);
            res.json(response);
        })
    }
}