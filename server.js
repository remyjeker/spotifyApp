const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const querystring = require("querystring");
const request = require("request");
const http = require("http");

const builtAppPath = "client/build";
const stateKey = "spotify_auth_state";
const userKey = "spotify_app_user";

const serverPort = 5000;
const appPort = 5001;

const baseAppUri = "/#";

const generateRandomString = length => {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const generateHeadersBasicAuthorization = () => {
  return {
    Authorization:
      "Basic " +
      new Buffer(
        process.env.SP_API_CLIENT_ID + ":" + process.env.SP_API_CLIENT_SECRET
      ).toString("base64")
  };
};

dotenv.load();

const app = express();

app
  .use(express.static(builtAppPath))
  .use(cors())
  .use(cookieParser());

app.route("/user/:id").get((req, res) => {
  const { params } = req;
  res.redirect(200, `/user/${params.id}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, builtAppPath, "index.html"));
});

app.get("/api/login", (req, res) => {
  const state = generateRandomString(16);

  res.cookie(stateKey, state);

  const scope = "user-read-private user-read-email";
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: process.env.SP_API_CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.SP_API_REDIRECT_URI,
        state: state
      })
  );
});

app.get("/api/callback", (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(`${baseAppUri}/error/state_mismatch`);
  } else {
    res.clearCookie(stateKey);

    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: process.env.SP_API_REDIRECT_URI,
        grant_type: "authorization_code"
      },
      headers: generateHeadersBasicAuthorization(),
      json: true
    };

    request.post(authOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const { access_token, refresh_token } = body;

        res.redirect(
          "/api/me?" +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token
            })
        );
      } else {
        res.redirect(`${baseAppUri}/error/invalid_token`);
      }
    });
  }
});

app.get("/api/me", (req, res) => {
  const { access_token, refresh_token } = req.query;

  const options = {
    url: "https://api.spotify.com/v1/me",
    headers: { Authorization: "Bearer " + access_token },
    json: true
  };

  request.get(options, (error, response, body) => {
    if (body && "id" in body) {
      res.redirect(`/user/${body.id}`);
    } else {
      res.redirect(`/error/auth_error`);
    }
    res.end();
  });
});

app.get("/api/refresh_token", (req, res) => {
  const refresh_token = req.query.refresh_token;
  const authOptions = {
    url: "https://accounts.spotify.com/api/token",
    headers: generateHeadersBasicAuthorization(),
    form: {
      grant_type: "refresh_token",
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      res.send({
        access_token: access_token
      });
    }
  });
});

var server = http.createServer(app);

app.listen(appPort, () => {
  console.log(`App listening on port : ${appPort}`);
});

server.listen(serverPort, () => {
  console.log("Web Server listening on port : " + serverPort);
});
