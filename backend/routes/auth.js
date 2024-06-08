var express = require("express");
var axios = require("axios");
var router = express.Router();

// create a tokenData object to store the token and its expiration date
let tokenData = {};

// curl -X POST http://localhost:3000/authenticate -H "Content-Type: application/json" -d '{"email": "user1@mail.com", "password": "a!Strongp#assword1"}'

// POST /authenticate
router.post("/", async (req, res) => {
  // pass mail and pwd from the request
  // so we can later use it from the front-end
  const { email, password } = req.body;

  try {
    // post request to the bankin api
    const response = await axios.post(
      "https://sync.bankin.com/v2/authenticate",
      {
        email: email,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
          "Bankin-Version": "2019-08-22",
          "Bankin-Device": "26ac2fb6-4b1f-4e7c-a35d-aaa40b5c00b5",
        },
      }
    );
    // store the token and its expiration date
    tokenData.token = response.data.access_token;
    tokenData.expires_at = new Date(response.data.expires_at);

    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      error: error.message,
      details: error.response ? error.response.data : {},
    });
  }
});

module.exports = { router, tokenData };
