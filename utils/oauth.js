const axios = require("axios").default;

exports.getAccessToken = async (code) => {
  const { data } = await axios.post("https://oauth2.googleapis.com/token", {
    client_id: process.env.OAUTH_CLIENT_ID,
    client_secret: process.env.OAUTH_CLIENT_SECRET,
    redirect_uri: "https://yogaq.herokuapp.com/api/user/auth/callback",
    grant_type: "authorization_code",
    code,
  });

  return data.access_token;
};

exports.getProfile = async (accessToken) => {
  const { data } = await axios({
    url:
      "https://people.googleapis.com/v1/people/me?personFields=names,phoneNumbers,birthdays,genders,emailAddresses",
    method: "get",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return data;
};
