import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Date, Document, now} from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
  _id: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  
  @Prop({ required: true , default: "free"})
  planType: string;

  @Prop({ required: true, default: 2 })
  roleNo: Number;

  @Prop({ required: true, default: 'client-admin' })
  roleName: string;

  @Prop({ required: true, default: false })
  active: boolean;
  
  @Prop({ default: false })
  gdpr: boolean;
  
  @Prop({type: Date, default: new Date() })
  RegistrationDate: Date;
  
  @Prop({type: Date})
  ExpirationDate: Date;
  
  @Prop({ required: false})
  confirmToken: string;

}



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
