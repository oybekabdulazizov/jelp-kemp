import { model, Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

interface IUser {
  email: string;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
});

UserSchema.plugin(passportLocalMongoose);

const User = model<IUser>('User', UserSchema);

export default User;
