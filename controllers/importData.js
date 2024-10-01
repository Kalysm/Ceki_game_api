import { jsonData } from "../models/jsonData.js";
import { addDataToCategories } from "./dataController.js";

// Call de addDataToCategories pour ajouter des datas à Firestore (changer le mot 'category' par le titre de la collection)
addDataToCategories("category", jsonData.category)
  .then((result) => {
    console.log(result);
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error importing data:", error);
    process.exit(1);
  });
