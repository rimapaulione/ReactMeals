import { useState } from "react";

import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showHandler = () => {
    setCartIsShown(true);
  };

  const hideHandler = () => {
    setCartIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Cart onClick={hideHandler} />}
      <Header onClick={showHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
