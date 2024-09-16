export const LinkedInApi = {
  clientId: "86zllnqjpdcyws",
  redirectUrl: "http://localhost:3000/login",
  oauthUrl:
    "https://www.linkedin.com/oauth/v2/authorization?response_type=code",
  scope: "r_liteprofile%20r_emailaddress",
  state: "123456",
};

export const NodeServer = {
  baseURL: "http://localhost:5000",
  getUserCredentials: "/api",
};