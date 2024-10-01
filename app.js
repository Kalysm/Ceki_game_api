import dotenv from "dotenv";
import admin from "firebase-admin";
import express from "express";
import router from "./routes.js";

dotenv.config();

const serviceAccount = {
  projectId: process.env.FIRESTORE_PROJECT_ID,
  privateKey: process.env.FIRESTORE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  clientEmail: process.env.FIRESTORE_CLIENT_EMAIL,
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();

app.use(router);

app.get("/", (req, res) => {
  res.send("Bienvenue sur mon serveur !");
});

const port = 3000;

app.listen(port, () => {
  console.log(`Le serveur est en cours d'écoute sur le port ${port}`);
});

export default admin;
