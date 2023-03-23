function purchaseBook(buku, diskon, pajak, stock, pembelian, credit) {
    let totalPrice = 0;
    let datastock = stock;
    let payment = [];
    let totalCredit = 0;
  
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

    priceofeachterm = priceAftexTax/credit;
    for(let i = 0; i < credit; i++){
        payment.push({
            term: i+1,
            amount: priceofeachterm,
        });
        totalCredit += priceofeachterm;
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
      console.log(`\nCredit:`);
      console.log(`Credit Term: ${credit}`);
      console.log(`Price of each term: ${priceofeachterm}`);
      payment.forEach(element => {
        console.log(`Credit due every month: ` + element.term + ": " +element.amount);
      });
      console.log(`Total credit: ${totalCredit}`);
      console.log(`\nSisa stock buku ${buku.title} : ${datastock}`);
    } else {
      console.log(`\nSisa stock buku ${buku.title} : ${datastock}`);
    }
  }
  
  const databuku = {
    title: "Crazy Rich Asians",
    author: "Kevin Kwans",
    harga: 120000,
  };
  
  purchaseBook(databuku, 10, 2, 5, 1, 5);
  