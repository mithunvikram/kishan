import { Request } from 'express';
import { ConsentDao } from '../daos/ConsentDao';

let consentdao = new ConsentDao();

export class Consentservice {
    public consentservice(req: Request, callback) {
        const consentbody = req.body;
        consentdao.consentdao(consentbody, (response) => {
            callback(response);
        });

    }

}
