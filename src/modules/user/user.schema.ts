import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';


@Schema()
export class User {
  _id: string;

  @Prop({ required: true })
  fullName: string;

  @Prop({ required: true })
  mobile: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  confirmToken: string;

  @Prop({ default: 0 })
  confirmOtp: number;

  @Prop({ required: true, default: false })
  active: boolean;
}

export type UserDocument = User & mongoose.Document;

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.index({ email: 1 });


UserSchema.pre('save', async function (next: Function) {
  let user = this as UserDocument;
  if (!user.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  return next();
});
