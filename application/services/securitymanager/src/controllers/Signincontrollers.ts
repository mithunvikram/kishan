import { Request, Response, response } from 'express';
import { Signinservice } from '../service/Signinservice';

let signinservice = new Signinservice;
export class Signincontroller {

    public signup(req: Request, res: Response) {

        signinservice.signupservice(req, (response) => {
            res.status(201);
            res.json(response);
        })
    }

    public login(req: Request, res: Response) {
        signinservice.loginservice(req, (response) => {
            res.status(200);
            res.json(response);
        })

    }

    public logout(req: Request, res: Response) {

        signinservice.logoutservice(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public googlecontroller(req: Request, res: Response) {

        signinservice.googleservice(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getallusers(req: Request, res: Response) {

        signinservice.getalluserservice(req, (response) => {
            res.status(200);
            res.json(response);
        });
    }

    public getuserbyid(req: Request, res: Response) {

        signinservice.getbyiduserservice(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public getallroles(req: Request, res: Response) {

        signinservice.getrolesservice(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

    public updateuser(req: Request, res: Response) {

        signinservice.updateuserservice(req, (response) => {
            res.status(200);
            res.json(response);
        })
    }

}