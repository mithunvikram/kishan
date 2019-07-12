import * as express from 'express';
import { Request, Response } from 'express';
import * as Constant from '../config/Constant';
import { ApiAdaptar }  from '../config/apiAdapter';
import Controller from '../interface/controller.interface';

export class CamundaController implements Controller {
      public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/accesslevel', this.camundacontroller);
    }

public camundacontroller(req: Request, res: Response) {
        new ApiAdaptar().post(Constant.CAMUNDAURL + `/accesslevel` , req.body).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/desktop' ? res.send(result) : res.send(null)
        }).catch(err => {
            res.send(err);
        });
    }

}
