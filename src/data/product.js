const baseUrl = "https://fakestoreapi.com";
const productList = document.querySelector("product-list");
let product;

const getProduct = async () => {
  return await fetch(`${baseUrl}/products`)
    .then((res) => res.json())
    .then((res) => (product = res));
};

const filterProductByTitle = (key) => {
  const filteredProduct = [];
  product.filter((value) => {
    if (value.title.toLowerCase().match(key)) {
      return filteredProduct.push(value);
    }
  });
  productList.products = filteredProduct;
};

const getProductById = (id) => {
  return product.find((value) => (value.id == id ? value : null));
};

export { getProduct, product, filterProductByTitle, getProductById };
