import * as express from 'express';
import { Request, Response } from 'express';
import * as Constant from '../config/Constant';
import { ApiAdaptar }  from '../config/apiAdapter';
import Controller from '../interface/controller.interface';

export class securityController implements Controller {
      public router = express.Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post('/signup', this.signup);
this.router.post('/login', this.login);
this.router.put('/consent', this.consent);
this.router.put('/logout', this.logout);
this.router.post('/googlesignin', this.googlecontroller);
this.router.get('/getallusers', this.getallusers);
this.router.get('/getuser/:id', this.getuserbyid);
this.router.get('/getallroles', this.getallroles);
this.router.put('/updateuser', this.updateuser);
    }

public signup(req: Request, res: Response) {
        new ApiAdaptar().post(Constant.SECURITYURL + `/signup` , req.body).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/desktop' ? res.send(result) : res.send(null)
        }).catch(err => {
            res.send(err);
        });
    }
public login(req: Request, res: Response) {
        new ApiAdaptar().post(Constant.SECURITYURL + `/login` , req.body).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/desktop' ? res.send(result) : res.send(null)
        }).catch(err => {
            res.send(err);
        });
    }
public consent(req: Request, res: Response) {
        new ApiAdaptar().put(Constant.SECURITYURL + `/consent` , req.body).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/desktop' ? res.send(result) : res.send(null)
        }).catch(err => {
            res.send(err);
        });
    }
public logout(req: Request, res: Response) {
        new ApiAdaptar().put(Constant.SECURITYURL + `/logout` , req.body).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/desktop' ? res.send(result) : res.send(null)
        }).catch(err => {
            res.send(err);
        });
    }
public googlecontroller(req: Request, res: Response) {
        new ApiAdaptar().post(Constant.SECURITYURL + `/googlesignin` , req.body).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/desktop' ? res.send(result) : res.send(null)
        }).catch(err => {
            res.send(err);
        });
    }
public getallusers(req: Request, res: Response) {
        new ApiAdaptar().get(Constant.SECURITYURL + `/getallusers` ).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/desktop' ? res.send(result) : res.send(null)
        }).catch(err => {
            res.send(err);
        });
    }
public getuserbyid(req: Request, res: Response) {
        new ApiAdaptar().get(Constant.SECURITYURL + `/getuser/req.params.id` ).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/desktop' ? res.send(result) : res.send(null)
        }).catch(err => {
            res.send(err);
        });
    }
public getallroles(req: Request, res: Response) {
        new ApiAdaptar().get(Constant.SECURITYURL + `/getallroles` ).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/desktop' ? res.send(result) : res.send(null)
        }).catch(err => {
            res.send(err);
        });
    }
public updateuser(req: Request, res: Response) {
        new ApiAdaptar().put(Constant.SECURITYURL + `/updateuser` , req.body).then(result => {
              req.baseUrl === '/mobile' ? res.send(result) :
              req.baseUrl === '/desktop' ? res.send(result) : res.send(null)
        }).catch(err => {
            res.send(err);
        });
    }

}
