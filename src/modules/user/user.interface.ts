/* eslint-disable no-unused-vars */
import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

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

export type TUserRole = keyof typeof USER_ROLE;

export interface TUserModel extends Model<TUser> {
  isUserExist(email: string): Promise<TUser>;
}
