import * as arctic from "arctic";

const {
  OAUTH_GOOGLE_CLIENT_ID: clientId,
  OAUTH_GOOGLE_CLIENT_SECRET: clientSecret,
  OAUTH_GOOGLE_REDIRECT_URI: redirectURI,
} = process.env;

const id = clientId || "";
const secret = clientSecret || "";
const uri = redirectURI || "";

export const google = new arctic.Google(id, secret, uri);
