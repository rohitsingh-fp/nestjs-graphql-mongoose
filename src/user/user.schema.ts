import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';


@Schema()
@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Prop({ required: true })
  @Field()
  fullName: string;

  @Prop({ required: true })
  @Field()
  mobile: string;

  @Prop({ required: true, unique: true })
  @Field()
  email: string;

  @Prop({ required: true })
  @Field()
  password: string;

  @Field()
  confirmToken: string;

  @Prop({ default: 0 })
  @Field()
  confirmOtp: number;

  @Field()
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

  // Random additional data
  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hashSync(user.password, salt);

  // Replace the password with the hash
  user.password = hash;
  return next();
});
