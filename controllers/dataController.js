import admin from "../app.js";

// Fonction d'ajout des datas à la collection "Categories" dans Firestore
export const addDataToCategories = async (category, data) => {
  try {
    const categoriesRef = admin.firestore().collection("Categories");

    await categoriesRef.doc(category).set({ Rap: data });

    return { success: true, message: "Data added successfully" };
  } catch (error) {
    console.error("Error adding data:", error);
    return { success: false, message: "Failed to add data" };
  }
};

// Récupérer les mots aléatoirement
export const getRandomData = async (req, res) => {
  try {
    let category = "films";

    if (req.query.category) {
      category = req.query.category;
    }

    const collectionRef = admin
      .firestore()
      .collection("Categories")
      .doc(category);
    const doc = await collectionRef.get();

    if (!doc.exists) {
      res.status(404).json({ success: false, message: "Category not found" });
      console.error("Problème de récup categories");

      return;
    }

    const categoryData = doc.data();
    const categoryArray = categoryData[category];

    if (!categoryArray || categoryArray.length === 0) {
      res
        .status(404)
        .json({ success: false, message: "Category data not found or empty" });
      return;
    }

    const randomIndex = Math.floor(Math.random() * categoryArray.length);
    const randomTitle = categoryArray[randomIndex].title;

    res.status(200).json(randomTitle);
  } catch (error) {
    console.error("Error handling getRandomData route:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getAllCategoryNames = async (req, res) => {
  try {
    const collectionRef = admin.firestore().collection("Categories");
    const snapshot = await collectionRef.get();

    const categoryNames = snapshot.docs.map((doc) => doc.id);

    res.status(200).json(categoryNames);
  } catch (error) {
    console.error("Error handling getAllCategoryNames route:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Ajout des datas à Firestore
export const addData = async (req, res) => {
  try {
    const { category, data } = req.body;

    // Fonction d'ajout des datas à Firestore
    const result = await addDataToCategories(category, data);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error handling addData route:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
