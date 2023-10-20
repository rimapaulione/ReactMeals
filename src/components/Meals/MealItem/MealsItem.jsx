import { useContext } from "react";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";

import classes from "./MealsItem.module.css";

const MealsItem = ({ id, name, description, price }) => {
  const cartCtx = useContext(CartContext);

  const addToCartHandler = (amount) => {
    cartCtx.addItem({
      id: id,
      name: name,
      price: price,
      amount: amount,
    });
  };

  return (
    <li className={classes.meal}>
      <div>
        <h3>{name}</h3>
        <div className={classes.description}>{description}</div>
        <div className={classes.price}>{price.toFixed(2)}</div>
      </div>
      <div>
        <MealItemForm id={id} onAddAmount={addToCartHandler} />
      </div>
    </li>
  );
};

export default MealsItem;
