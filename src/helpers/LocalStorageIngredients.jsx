import { getStorage, setStorage } from './Storage';

export function storageCocktails(drink, ingredient, id) {
  if (drink) {
    let newLocalStorageDrinks;
    const saveLocalStorage = getStorage('inProgressRecipes');
    if (saveLocalStorage.cocktails[id]) {
      if (saveLocalStorage.cocktails[id].includes(ingredient)) {
        newLocalStorageDrinks = { cocktails: { ...saveLocalStorage.cocktails,
          [id]: [...saveLocalStorage.cocktails[id]
            .filter((removeItem) => removeItem !== ingredient)],
        },
        meals: { ...saveLocalStorage.meals },
        };
        setStorage('inProgressRecipes', (newLocalStorageDrinks));
        return ([...saveLocalStorage.cocktails[id]
          .filter((removeItem) => removeItem !== ingredient)]);
      }
      newLocalStorageDrinks = { cocktails: { ...saveLocalStorage.cocktails,
        [id]: [...saveLocalStorage.cocktails[id], ingredient],
      },
      meals: { ...saveLocalStorage.meals },
      };
      setStorage('inProgressRecipes', (newLocalStorageDrinks));
      return ([...saveLocalStorage.cocktails[id], ingredient]);
    }
    newLocalStorageDrinks = { cocktails: { ...saveLocalStorage.cocktails,
      [id]: [ingredient],
    },
    meals: { ...saveLocalStorage.meals },
    };
    setStorage('inProgressRecipes', (newLocalStorageDrinks));
    return ([ingredient]);
  }
}

export function storageMeals(food, ingredient, id) {
  if (food) {
    let newLocalStorageMeals;
    const saveLocalStorage = getStorage('inProgressRecipes');
    if (saveLocalStorage.meals[id]) {
      if (saveLocalStorage.meals[id].includes(ingredient)) {
        newLocalStorageMeals = { meals: { ...saveLocalStorage.meals,
          [id]: [...saveLocalStorage.meals[id]
            .filter((removeItem) => removeItem !== ingredient)],
        },
        cocktails: { ...saveLocalStorage.cocktails },
        };
        setStorage('inProgressRecipes', (newLocalStorageMeals));
        return ([...saveLocalStorage.meals[id]
          .filter((removeItem) => removeItem !== ingredient)]);
      }
      newLocalStorageMeals = {
        cocktails: {
          ...saveLocalStorage.cocktails,
        },
        meals: { ...saveLocalStorage.meals,
          [id]: [...saveLocalStorage.meals[id], ingredient] },
      };
      setStorage('inProgressRecipes', (newLocalStorageMeals));
      return ([...saveLocalStorage.meals[id], ingredient]);
    }
    newLocalStorageMeals = { cocktails: {
      ...saveLocalStorage.cocktails },
    meals: { ...saveLocalStorage.meals,
      [id]: [ingredient] } };
    setStorage('inProgressRecipes', (newLocalStorageMeals));
    return ([ingredient]);
  }
}
