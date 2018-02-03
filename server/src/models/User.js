import mongoose, { Schema } from 'mongoose';
import { hashSync, compareSync } from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';

import constants from '../config/constants';

const UserSchema = new Schema({
        username: {
                type: String,
                unique: true
        },
        firstName: String,
        lastName: String,
        avatar: String,
        password: String,
        email: String
}, { timestamps: true });

UserSchema.pre('save', function (next) {
        if (this.isModified('password')) {
                this.password = this._hsahPassword(this.password);
                return next();
        }
        return next();
});

UserSchema.methods = {
        _hsahPassword(password) {
                return hashSync(password);
        },
        authenicateUser(password) {
                return compareSync(password, this.password);
        },
        createToken() {
                return jwt.sign(
                        {
                                _id: this._id
                        },
                        constants.JWI_SECRET
                )
        }
};

export default mongoose.model('User', UserSchema);