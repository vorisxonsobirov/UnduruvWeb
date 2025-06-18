// proxy.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const PORT = 4000;


app.use(cors());

app.get("/api/debtors", async (req, res) => {
  const username = process.env.API_USERNAME;
  const password = process.env.API_PASSWORD;
  const auth = Buffer.from(`${username}:${password}`).toString("base64");

  //   const url = "http://nasiya.mxsoft.uz/demo_nasiya/hs/GPScontrol/apigps/getdebtors?page=1&count=500&branch_id=1";
  const url = "http://nasiya.mxsoft.uz/demo_nasiya/hs/GPScontrol/apigps/getdebtors?page=1&count=500";


  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Ошибка прокси:", error);
    res.status(500).json({ error: "Ошибка при получении данных" });
  }
});

app.listen(PORT, () => {
  console.log(`Прокси сервер запущен: http://localhost:${PORT}`);
});
