import React, { useEffect, useState } from "react";
import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealsItem from "./MealItem/MealsItem";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState();

  useEffect(() => {
    const getFetchData = async () => {
      const res = await fetch(
        "https://react-food-app-55be0-default-rtdb.firebaseio.com/meals.json"
      );
      if (!res.ok) {
        throw new Error("Something went wrong...");
      }
      const data = await res.json();
      setMeals(data);
      setIsLoading(false);
    };
    getFetchData().catch((err) => {
      setIsLoading(false);
      setIsError(err.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section>
        <p className={classes.loading}>Loading...</p>
      </section>
    );
  }
  if (isError) {
    return (
      <section>
        <p className={classes.error}>Something went wrong...</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealsItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};
export default AvailableMeals;
