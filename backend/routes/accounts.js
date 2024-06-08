var express = require("express");
var axios = require("axios");
const { tokenData } = require("./auth");
var router = express.Router();

// curl -X 'GET' \
//   'http://localhost:3000/accounts' \
//   -H 'accept: application/json' \
//   -H 'Bankin-Version: 2019-08-22' \
//   -H 'Bankin-Device: 26ac2fb6-4b1f-4e7c-a35d-aaa40b5c00b5' \

/* GET accounts using token */
router.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://sync.bankin.com/v2/accounts", {
      headers: {
        Authorization: `Bearer ${tokenData.token}`,
      },
    });

    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response ? error.response.status : 500).json({
      error: error.message,
      details: error.response ? error.response.data : {},
    });
  }
});

module.exports = router;
