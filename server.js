const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const path = require("path");
const querystring = require("querystring");
const request = require("request");

const baseAppUri = "/app";
const appBuildPath = "client/build";
const appDevServerPath = "client/public";
const indexFile = "index.html";

const resulstLimit = 20;
const serverPort = 5000;

dotenv.load();

const {
  APP_MODE,
  USER_COOKIE_KEY,
  STATE_COOKIE_KEY,
  ACCESS_TOKEN_COOKIE_KEY,
  REFRESH_TOKEN_COOKIE_KEY,
  SP_API_CLIENT_ID,
  SP_API_CLIENT_SECRET,
  SP_API_REDIRECT_URI_DEV,
  SP_API_REDIRECT_URI_PROD
} = process.env;

const DEV_MODE = APP_MODE === "development";

const SP_API_REDIRECT_URI = DEV_MODE
  ? SP_API_REDIRECT_URI_DEV
  : SP_API_REDIRECT_URI_PROD;

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
      new Buffer(SP_API_CLIENT_ID + ":" + SP_API_CLIENT_SECRET).toString(
        "base64"
      )
  };
};

const generateHeadersBearerAuthorization = accessToken => {
  return {
    Authorization: "Bearer " + accessToken
  };
};

const app = express();

app
  .use(express.static(appBuildPath))
  .use(cors())
  .use(cookieParser());

app.get("/api/login", (req, res) => {
  const state = generateRandomString(16);

  res.cookie(STATE_COOKIE_KEY, state);

  const scope = "user-read-private user-read-email";

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: SP_API_CLIENT_ID,
        scope: scope,
        redirect_uri: SP_API_REDIRECT_URI,
        state: state
      })
  );
});

app.get("/api/callback", (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[STATE_COOKIE_KEY] : null;

  if (state === null || state !== storedState) {
    res.redirect(`${baseAppUri}/error/state_mismatch`);
  } else {
    res.clearCookie(STATE_COOKIE_KEY);

    const authOptions = {
      url: "https://accounts.spotify.com/api/token",
      form: {
        code: code,
        redirect_uri: SP_API_REDIRECT_URI,
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
    headers: generateHeadersBearerAuthorization(access_token),
    json: true
  };

  request.get(options, (error, response, body) => {
    const { id } = body;

    if (body && id) {
      res.cookie(USER_COOKIE_KEY, body);
      res.cookie(ACCESS_TOKEN_COOKIE_KEY, access_token);
      res.cookie(REFRESH_TOKEN_COOKIE_KEY, refresh_token);

      res.redirect(`${baseAppUri}/user/${id}`);
    } else {
      res.redirect(`${baseAppUri}/error/spotify_authentication_error`);
    }
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

      res.cookie(ACCESS_TOKEN_COOKIE_KEY, access_token);

      res.send({
        accessTokenRefreshed: true
      });
    }
  });
});

app.get("/api/search", (req, res) => {
  const storedAccessToken = req.cookies
    ? req.cookies[ACCESS_TOKEN_COOKIE_KEY]
    : null;

  if (storedAccessToken === null) {
    res.redirect(`${baseAppUri}/error/access_token_missing`);
  }

  const safeKeyword = String(req.query.q).replace("", "%20");
  const searchType = req.query.type;

  const reqOptions = {
    url:
      "https://api.spotify.com/v1/search?q=" +
      safeKeyword +
      "&type=" +
      searchType +
      "&limit=" +
      resulstLimit,
    headers: generateHeadersBearerAuthorization(storedAccessToken),
    json: true
  };

  request.get(reqOptions, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      res.send(body);
      res.end();
    } else {
      const { error } = body;
      const { message } = error;

      const storedRefreshToken = req.cookies
        ? req.cookies[REFRESH_TOKEN_COOKIE_KEY]
        : null;

      if (storedRefreshToken === null) {
        res.redirect(`${baseAppUri}/error/refresh_token_missing`);
      }

      res.redirect(
        "/api/refresh_token?" +
          querystring.stringify({
            refresh_token: storedRefreshToken
          })
      );
    }
  });
});

app.get("/api/logout", (req, res) => {
  res.clearCookie(USER_COOKIE_KEY);
  res.clearCookie(ACCESS_TOKEN_COOKIE_KEY);
  res.clearCookie(REFRESH_TOKEN_COOKIE_KEY);

  res.redirect(`${baseAppUri}/landing`);
});

app.get("*", (req, res) => {
  if (DEV_MODE) {
    res.sendFile(path.join(__dirname, appDevServerPath, indexFile));
  } else {
    res.sendFile(path.join(__dirname, appBuildPath, indexFile));
  }
});

app.listen(serverPort, () => {
  console.log(
    `Web Server listening on port : ${serverPort} (pid: ${process.pid})`
  );

  if (!DEV_MODE) {
    setTimeout(() => {
      console.log("Please open your browser at 'http://localhost:5000'");
    }, 10000);
  }
});
