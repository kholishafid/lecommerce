let cart = {
  data: [],
  total: 0,
};

const setLocal = () => {
  localStorage.setItem("lecommerce-cart", JSON.stringify(cart));
};

const getLocal = () => {
  let localData = localStorage.getItem("lecommerce-cart");
  if (!localData) {
    return setLocal();
  }
  cart = JSON.parse(localData);
};

const getCart = () => {
  getLocal();
  return { products: cart.data, total: cart.total };
};

const addToCart = (productId) => {
  const isAvaible = cart.data.find((elements) =>
    elements.productId == productId ? true : false
  );
  if (!isAvaible) {
    cart.data.push({ productId, quantity: 1 });
    sumTotal();
    setLocal();
    return;
  }
  const location = cart.data.indexOf(isAvaible);
  const dataOld = cart.data[location];
  cart.data[location] = { productId, quantity: dataOld.quantity + 1 };
  sumTotal();
  setLocal();
  return;
};

const sumTotal = () => {
  cart.total = cart.data.reduce((accm, current) => accm + current.quantity, 0);
};

const removeFromCart = async (id) => {
  cart.data = cart.data.filter((elements) => {
    if (elements.productId !== id) {
      return elements;
    }
  });
  sumTotal();
  setLocal();
  document.querySelector("cart-content").cart = getCart();
};

export { getCart, addToCart, removeFromCart };
