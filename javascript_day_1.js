function purchaseBook(buku, diskon, pajak) {
    //Hitung amount of discount
    const discount = buku.harga * (diskon / 100);
  
    //Hitung price after discount
    const hargaSetelahDiskon = buku.harga - discount;
  
    //Hitung amount of tax
    const tax = hargaSetelahDiskon * (pajak / 100);
  
    //Hitung price after tax
    const priceAfterTax = hargaSetelahDiskon + tax;
  
    // Display semua data
    console.log(`Buku: ${buku.title}`);
    console.log(`Author: ${buku.author}`);
    console.log(`Harga: ${buku.harga.toFixed(2)}`);
    console.log(`Diskon: ${discount.toFixed(2)} (${diskon}%)`);
    console.log(`Harga setelah diskon: ${hargaSetelahDiskon.toFixed(2)}`);
    console.log(`Pajak: ${tax.toFixed(2)} (${pajak}%)`);
    console.log(`Harga setelah pajak: ${priceAfterTax.toFixed(2)}`);
  }
  
  const buku = {
    title: "Crazy Rich Asians",
    author: "Kevin Kwans",
    harga: 120000,
  };
  
  purchaseBook(buku, 10, 2);
  