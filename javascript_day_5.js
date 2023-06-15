const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');

const app = express();
app.use(bodyParser.json());

app.use(
  basicAuth({
    users: { admin: 'password' },
    unauthorizedResponse: getUnauthorizedResponse,
  })
);

app.post('/purchase', async (req, res) => {
  const { buku, diskon, pajak, stock, pembelian, credit, additionalPrice } = req.body;
  let totalPrice = 0;
  let datastock = stock;
  let payment = [];
  let totalCredit = 0;

  const priceOfEachTerm = await calculateTermsOfCredit(pembelian, credit, additionalPrice);

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

async function calculateTermsOfCredit(quantity, creditTerm, additionalPrice) {
  // Perform asynchronous calculations here
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const priceOfEachTerm = (quantity * additionalPrice) / creditTerm;
      resolve(priceOfEachTerm);
    }, 1000);
  });
}

function getUnauthorizedResponse(req) {
  return req.auth
    ? 'Invalid credentials'
    : 'No credentials provided';
}

app.listen(3000, () => {
  console.log('Server berjalan di port 3000');
});
