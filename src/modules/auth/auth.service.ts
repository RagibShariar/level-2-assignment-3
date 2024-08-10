import { TUser } from "../user/user.interface";
import { User } from "../user/user.model";

// sign up user
const userSignUp = async (payload: TUser) => {
  const result = User.create(payload);
  return result;
};

export const authService = {
  userSignUp,
};
