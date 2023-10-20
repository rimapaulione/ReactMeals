import classes from "./Checkout.module.css";
import useInput from "../hooks/use-input";

const Checkout = (props) => {
  const {
    enteredValue: enteredName,
    valueIsValid: nameIsValid,
    inputError: nameInputError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput();

  const {
    enteredValue: enteredStreet,
    valueIsValid: streetIsValid,
    inputError: streetInputError,
    valueChangeHandler: streetChangeHandler,
    valueBlurHandler: streetBlurHandler,
    reset: streetReset,
  } = useInput();

  const {
    enteredValue: enteredCode,
    valueIsValid: codeIsValid,
    inputError: codeInputError,
    valueChangeHandler: codeChangeHandler,
    valueBlurHandler: codeBlurHandler,
    reset: codeReset,
  } = useInput((enteredValue) => enteredValue.trim().length >= 5);

  const {
    enteredValue: enteredCity,
    valueIsValid: cityIsValid,
    inputError: cityInputError,
    valueChangeHandler: cityChangeHandler,
    valueBlurHandler: cityBlurHandler,
    reset: cityReset,
  } = useInput();

  let formIsValid = false;
  if (nameIsValid && streetIsValid && codeIsValid && cityIsValid) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();
    if (!nameIsValid) return;
    props.onConfirmation({
      name: enteredName,
      street: enteredStreet,
      postCode: enteredCode,
      city: enteredCity,
    });
    nameReset();
    streetReset();
    codeReset();
    cityReset();
  };

  const classesValidity = (value) => {
    if (value) {
      return ` ${classes.control} ${classes.invalid} `;
    } else {
      return `${classes.control} `;
    }
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={classesValidity(nameInputError)}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameInputError && (
          <p className={classes.error}>Please enter correct name.</p>
        )}
      </div>
      <div className={classesValidity(streetInputError)}>
        <label htmlFor="street">Street</label>
        <input
          type="text"
          id="street"
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetInputError && (
          <p className={classes.error}>Please enter correct street.</p>
        )}
      </div>
      <div className={classesValidity(codeInputError)}>
        <label htmlFor="postal">Postal Code</label>
        <input
          type="text"
          id="postal"
          value={enteredCode}
          onChange={codeChangeHandler}
          onBlur={codeBlurHandler}
        />
        {codeInputError && (
          <p className={classes.error}>Please enter correct postal code.</p>
        )}
      </div>
      <div className={classesValidity(cityInputError)}>
        <label htmlFor="city">City</label>
        <input
          type="text"
          id="city"
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityInputError && (
          <p className={classes.error}>Please enter correct city.</p>
        )}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button disabled={!formIsValid} className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
