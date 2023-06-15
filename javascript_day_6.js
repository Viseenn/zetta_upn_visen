const express = require("express");
const bodyParser = require("body-parser");
const basicAuth = require("express-basic-auth");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

app.use(
  basicAuth({
    users: { admin: "password" },
    unauthorizedResponse: getUnauthorizedResponse,
  })
);

app.post("/purchase", async (req, res) => {
  const { buku, diskon, pajak, stock, pembelian, credit, additionalPrice } =
    req.body;
  let totalPrice = pembelian * additionalPrice;
  let datastock = stock;
  let payment = [];
  let totalCredit = 0;
  let hargaSetelahDiskon = totalPrice * (1 - diskon / 100);
  let priceAftexTax = hargaSetelahDiskon * (1 + pajak / 100);
  const priceOfEachTerm = await calculateTermsOfCredit(
    pembelian,
    credit,
    additionalPrice
  );

  const response = {
    book: buku.title,
    author: buku.author,
    purchaseQuantity: pembelian,
    totalPrice: totalPrice,
    discount: diskon,
    priceAfterDiscount: hargaSetelahDiskon,
    tax: pajak,
    priceAfterTax: priceAftexTax,
    creditTerm: credit,
    priceOfEachTerm: priceOfEachTerm,
    creditPayment: payment,
    totalCredit: totalCredit,
    remainingStock: datastock,
  };

  res.json(response);
});

app.get("/read-file-with-await", async (req, res) => {
  try {
    const fileContent = await readFileWithPromise("file.txt");
    console.log("File content (await):", fileContent);
    res.send("File content retrieved (await)");
  } catch (error) {
    console.error("Error reading file (await):", error);
    res.status(500).send("Error reading file");
  }
});

app.get("/read-file-without-await", (req, res) => {
  readFileWithPromise("file.txt")
    .then((fileContent) => {
      console.log("File content (without await):", fileContent);
      res.send("File content retrieved (without await)");
    })
    .catch((error) => {
      console.error("Error reading file (without await):", error);
      res.status(500).send("Error reading file");
    });
});

function readFileWithPromise(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function getUnauthorizedResponse(req) {
  return req.auth ? "Invalid credentials" : "No credentials provided";
}

app.listen(3000, () => {
  console.log("Server berjalan di port 3000");
});
