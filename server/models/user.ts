import { model, Schema } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

interface IUser {
  email?: string;
  // username: string;
  // hash: string;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  // username: {
  //   type: String,
  //   required: true,
  // },
  // hash: {
  //   type: String,
  //   required: true,
  // },
});

UserSchema.plugin(passportLocalMongoose);

const User = model<IUser>('User', UserSchema);

export default User;
