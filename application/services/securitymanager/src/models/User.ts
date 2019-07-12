
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
   firstname: String,
   lastname: String,
   username: String,
   email: String,
   password: String,
   phonenumber: String
})

const UserModel = mongoose.model('User', UserSchema, 'User');
export default UserModel;
