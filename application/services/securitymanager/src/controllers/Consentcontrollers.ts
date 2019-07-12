import { Request, Response } from 'express';
import { Consentservice } from '../service/consentservice';

let consentservice = new Consentservice;

export class Consentcontroller {
    public consent(req: Request, res: Response) {

        consentservice.consentservice(req, (response) => {
            res.status(201);
            res.json(response);
        })
    }
}

