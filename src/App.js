import "./App.css";
import { useState, useEffect } from "react";
import Products from "./components/Products/Products";
import Navbar from "./components/Navbar/Navbar";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/CheckoutForm/Checkout/Checkout";
import { commerce } from "./components/lib/commerce";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order,setOrder] = useState({});
  const [errorMessage,setErrorMessage] = useState("");

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  };

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  };

  const handelAddToCart = async (productId, quantity) => {
    const { cart } = await commerce.cart.add(productId, quantity);
    setCart(cart);
  };

  const handelUpdateCartQty = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, { quantity });
    setCart(cart);
  };

  const handelRemoveFromCart = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);
    setCart(cart);
  };

  const handelEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();
    setCart(cart);
  };

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();
    setCart(newCart)
  }

  const handelCaptureCheckout = async (checkoutTokenId, newOrder) => {
    try {
      const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
      setOrder(incomingOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  console.log("products :", products);
  console.log("cart :", cart);

  return (
    <Router>
      <div className="App">
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products products={products} onAddToCart={handelAddToCart} />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              handelUpdateCartQty={handelUpdateCartQty}
              handelRemoveFromCart={handelRemoveFromCart}
              handelEmptyCart={handelEmptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout
            cart={cart}
            order={order}
            onCaptureCheckout={handelCaptureCheckout}
            error={errorMessage}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
