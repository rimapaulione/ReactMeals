import { useState } from "react";

const useInput = (
  checkValidity = (enteredValue) => enteredValue.trim() !== ""
) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [inputTouched, setInputTouched] = useState(false);

  const valueIsValid = checkValidity(enteredValue);
  const inputError = !valueIsValid && inputTouched;

  const valueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };
  const valueBlurHandler = () => {
    setInputTouched(true);
  };
  const reset = () => {
    setEnteredValue("");
    setInputTouched(false);
  };

  return {
    enteredValue,
    valueIsValid,
    inputError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};
export default useInput;
