import { Request, Response, NextFunction } from 'express';
import { Proxydao } from '../dao/Proxydao';

let proxydao = new Proxydao;

export class Proxyservice {

    public userservice(userdetails, callback) {

        proxydao.userdao(userdetails, (response) => {
            callback(response);
        })
    }
}
