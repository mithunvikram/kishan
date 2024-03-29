import mongoose = require('mongoose');
import { Userschema } from '../models/User';
import { Roleschema } from '../models/Role';
import * as jwt from 'jsonwebtoken';

const signinmodel = mongoose.model('User', Userschema);
const rolemodel = mongoose.model('role', Roleschema)

export class ConsentDao {
    public consentdao(consentdata, callback) {


        if (consentdata.scope === 'openid' && consentdata.submit === 'Allow access') {
            signinmodel.findById(consentdata.id).populate({
                path: 'role', model: rolemodel
            }).then((result) => {
                    var payload = {
                        username: result.username,
                        firstname: result.firstname,
                        lastname: result.lastname,
                        email: result.email,
                        id: result._id,
                        role: result.role.role
                    }
                    var token = jwt.sign(payload, 'geppettosecret', {
                        expiresIn: 86400
                    });
                    signinmodel.findByIdAndUpdate(consentdata.id, { $set: { Idtoken: token } }, function (err, response) {
                        if (err) {
                            callback(err);
                        }
                        response.Idtoken = token;
                        callback(response);
                    });
            })
        }
    }

}