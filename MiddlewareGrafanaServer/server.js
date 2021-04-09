
const http = require("http")

const { URL } = require('url');
const PORT = 4000
const server = http.createServer()

const express = require('express');
const cors = require('cors');
const crypto = require('crypto-js')

const login_grafana = require('./login_grafana')
const influxdb = require('./influx-connector')

const secret_key = "c35c0607957d96fd4d8fd53b0840d3b4b7f44ea4854c2b4efa118f635ce5998a*UFfw_GxF-mZyiE9tJmIBeQ*A7lcT_k5ZARxs77FeEmAae5D_yG0htqHEJiDycBstOaKLdoekcjYA0BBpDELBge-I_CA9KNRwjAiRs_2ciOP-Sic6iJ49KYXCnCXxhpuk7s**e71b626fc41725ff8e809d5b09212234a886c6cf9c231281b1efb4745f5d6c1e*yScoJL0j3vmknhFFKJcShCvcsFgpU23XAaRnv4QSC7M"
const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.raw());

app.get('/sensores', (req, res) => {

  influxdb.get_sensores(res)

});

app.post('/login', (req, res) => {

  decrypted = crypto.AES.decrypt(req.body.raw, secret_key).toString(crypto.enc.Utf8)

  user_info = JSON.parse(decrypted)

  const data = JSON.stringify({
    user: user_info.user,
    password: user_info.password
  })

  login_grafana.login_grafana(data, res)

});

app.listen(PORT, () => {
  console.log('server is listening on port ' + PORT);
});


