function purchaseBook(buku, diskon, pajak, stock, pembelian) {
  let totalPrice = 0;
  let datastock = stock;

  //Loop
  for (let i = 0; i < pembelian; i++) {
    // Check stock
    if (datastock <= 0) {
      console.log(`Maaf, stok buku ${buku.title} habis.`);
      break;
    }

    totalPrice = buku.harga * pembelian;
    discount = totalPrice * (diskon / 100);
    hargaSetelahDiskon = totalPrice - discount;
    tax = (totalPrice - discount) * (pajak / 100);
    priceAftexTax = hargaSetelahDiskon + tax;
    datastock--;
  }

  console.log(`Detail Buku:`);
  console.log(`Judul: ${buku.title}`);
  console.log(`Author: ${buku.author}`);
  console.log(`Harga Buku: ${buku.harga}`);

  //Kondisi dapat membeli lagi atau tidak
  if (datastock > 0) {
    console.log(`Jumlah Pembelian: ${pembelian}`);
    console.log(`Total Harga: ${totalPrice}`);
    console.log(`Diskon: ${diskon}%`);
    console.log(`Harga setelah diskon: ${hargaSetelahDiskon}`);
    console.log(`Pajak: ${pajak}%`);
    console.log(`Harga setelah pajak: ${priceAftexTax}`);
    console.log(`Sisa stock buku ${buku.title} : ${datastock}`);
  } else {
    console.log(`Sisa stock buku ${buku.title} : ${datastock}`);
  }
}

const databuku = {
  title: "Crazy Rich Asians",
  author: "Kevin Kwans",
  harga: 120000,
};

purchaseBook(databuku, 10, 2, 5, 1);
