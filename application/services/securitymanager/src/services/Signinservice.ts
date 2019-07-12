import { Request, response } from 'express';
import { SigninDao } from '../daos/SigninDao';

let signindao = new SigninDao();
export class Signinservice {

    public signupservice(req: Request, callback) {
        console.log('requst----->',req.body);
        const users = req.body;
        signindao.signindao(users, (response) => {
            callback(response);
        });
    }

    public loginservice(req: Request, callback) {
        const logindetails = req.body;
        console.log('------------loginrequest----', logindetails);
        signindao.logindao(logindetails, (response) => {
            callback(response)
        });
    }

    public logoutservice(req: Request, callback) {
        const user = req.body;
        signindao.logoutdao(user.userid, (response) => {
            callback(response);
        })
    }

    public googleservice(req: Request,callback){
        const googledata = req.body;
        signindao.googledao(googledata,(response) =>{
            callback(response);
        })
    }

    public getalluserservice(req:Request,callback){
        signindao.getalluserdao((response)=>{
            callback(response);
        })
    }

    public getbyiduserservice(req:Request, callback){
        console.log('-------paramsid------', req.params.id);
        const userId = req.params.id;
        signindao.getbyiduserdao(userId,(response)=>{
            callback(response);
        })
    }

    public getrolesservice(req:Request,callback){

        signindao.getrolesdao((response)=>{
            callback(response);
        })
    }

    public updateuserservice(req:Request,callback){
        const userdetails = req.body;

        signindao.updateuserdao(userdetails,(response)=>{
            callback(response);
        })
    }
}