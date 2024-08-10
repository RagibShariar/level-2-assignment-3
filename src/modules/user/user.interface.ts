import { Model } from "mongoose";

export type TUser = {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "admin" | "user";
};

export type TUserLogin = {
  email: string;
  password: string;
};

export interface TUserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser>;
}
