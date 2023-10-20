import { useRef, useState } from "react";

import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";

const MealItemForm = ({ id, onAddAmount }) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    const amountInput = amountInputRef.current.value;
    const numberAmountInput = +amountInput;
    if (
      amountInput.trim().length === 0 ||
      numberAmountInput < 1 ||
      numberAmountInput > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    //onAddAmount(numberAmountInput);
    onAddAmount(numberAmountInput);
  };
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <Input
        ref={amountInputRef}
        label={"Amount"}
        input={{
          id: id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button> + Add</button>
      {!amountIsValid && <p>Please enter a valid amount (1 - 5).</p>}
    </form>
  );
};

export default MealItemForm;
