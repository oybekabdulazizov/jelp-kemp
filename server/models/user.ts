import { model, Schema } from 'mongoose';

interface IUser {
  email: string;
  username: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<IUser>('User', UserSchema);

export default User;
