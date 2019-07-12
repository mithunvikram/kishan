import { CamundaService } from '../services/Camundaservice';
import { Request, Response } from 'express';

let camunda = new CamundaService;

export class CamundaController {

    public camundacontroller (req: Request, res: Response){

        camunda.camundarequest(req,(response) => {
            res.status(200);
            res.json(response)    
        })
    }
}