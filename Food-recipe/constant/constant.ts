import { Recipe } from "@/type";
import { router } from "expo-router";
import { Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;
const convertType = (type: string) => {
  switch (type) {
    case "Breakfast":
      return "Bữa sáng";
    case "MainCourse":
      return "Món chính";
    case "Vegetable":
      return "Món rau";
    case "Sweets":
      return "Đồ ngọt";
    case "Noodle":
      return "Món nước";
    default:
      return "";
      break;
  }
};
const handlePressRecipe = (recipe: Recipe) => {
  router.push({
    pathname: "/favorite/itemdetail",
    params: {
      id_recipe: 1,
      name: recipe.title,
      image: recipe.image,
      description: recipe.description,
      ingredients: recipe.ingredients,
      instructions: recipe.formula,
    },
  });
};
export { windowHeight, windowWidth, convertType, handlePressRecipe };
