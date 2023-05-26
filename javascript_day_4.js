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

app.post('/purchase', (req, res) => {
  const { buku, diskon, pajak, stock, pembelian, credit } = req.body;
  let totalPrice = 0;
  let datastock = stock;
  let payment = [];
  let totalCredit = 0;

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
    priceOfEachTerm: priceofeachterm,
    creditPayment: payment,
    totalCredit: totalCredit,
    remainingStock: datastock,
  };

  res.json(response);
});


function getUnauthorizedResponse(req) {
  return req.auth
    ? 'Invalid credentials'
    : 'No credentials provided';
}

app.listen(3000, () => {
  console.log('Server berjalan di port 3000');
});
