import dotenv from "dotenv";
import { google } from "googleapis";
dotenv.config();

const GOOGLE_CLIENT_ID =
  "590709606901-b60io7tp935mamtl6hnt80fikrt1e8ve.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

export const oauth2client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  "postmessage"
);
