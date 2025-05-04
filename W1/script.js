const products = [
  { image: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg", name: "Wireless Headphones", price: "₹7,999", description: "Noise-cancelling over-ear headphones." },
  { image: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg", name: "Smartwatch", price: "₹12,999", description: "Fitness tracking smartwatch." },
  { image: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg", name: "Gaming Mouse", price: "₹2,499", description: "Ergonomic gaming mouse." },
  { image: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg", name: "Laptop Stand", price: "₹1,999", description: "Adjustable aluminium stand." },
  // Add more products (at least 10) for pagination
  { image: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg", name: "Tablet", price: "₹24,999", description: "Portable and lightweight tablet." },
  { image: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg", name: "Bluetooth Speaker", price: "₹3,499", description: "High-quality sound." },
  { image: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg", name: "Keyboard", price: "₹1,299", description: "Mechanical keyboard." },
  { image: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg", name: "Webcam", price: "₹2,799", description: "HD webcam for video calls." },
  { image: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg", name: "External Hard Drive", price: "₹5,999", description: "1TB storage capacity." },
  { image: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg", name: "Monitor", price: "₹9,999", description: "Full HD monitor." },
  { image: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SY679_.jpg", name: "Router", price: "₹2,499", description: "High-speed internet router." }
];

let currentPage = 1;

const rowsPerPage = 5;

function displayProduct(){

  const tbody = document.querySelector('#productTable tbody');
  
  tbody.innerHTML = "";

  const start = (currentPage-1) * rowsPerPage;
  const end = start + rowsPerPage;

  const pageProds = products.slice(start,end);

  pageProds.forEach(product => {
    const row = `
      <tr>
        <td><img src="${product.image}"/></td>
        <td>${product.name}</td>
        <td>${product.price}</td>
        <td>${product.description}</td>
      </tr>
    `

    tbody.innerHTML += row;
  })

  document.getElementById('pageinfo').textContent = `Page ${currentPage} of ${Math.ceil(products.length/rowsPerPage)}`

}

function nextpage(){
  if(currentPage * rowsPerPage < products.length){
    currentPage ++;
    displayProduct();
  }
}

function prevpage(){
  if(currentPage > 1){
    currentPage --;
    displayProduct();
  }
}

displayProduct();