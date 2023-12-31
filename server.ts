import express, { Request, Response } from "express";
import firebase from "firebase/app";
import "firebase/database";
var cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

const firebaseConfig = {
  apiKey: "AIzaSyCat9_20juvFqlxJV5SP8FeymTYF53QMxw",
  authDomain: "server-mark.firebaseapp.com",
  databaseURL: "https://server-mark-default-rtdb.firebaseio.com",
  projectId: "server-mark",
  storageBucket: "server-mark.appspot.com",
  messagingSenderId: "804218325323",
  appId: "1:804218325323:web:c9d7d451cc87a7ede380ce",
};

const apiIni = firebase.initializeApp(firebaseConfig);

const firebaseDB = firebase.database();

app.use(express.json());
app.use(cors());

app.post("/api/markers", async (req: Request, res: Response) => {
  try {
    const { location, timestamp, label } = req.body;
    if (!location.lat || !location.lng || !label || !timestamp) {
      return res.status(400).send("Invalid data provided");
    }

    firebaseDB
      .ref(`markers/Quest-${label}`)
      .set({ location, timestamp }, (error: any) => {
        if (error) {
          console.error("Error saving marker:", error);
          return res.status(500).send("Error saving marker");
        } else {
          return res.status(200).send("Marker saved successfully");
        }
      });
  } catch (error) {
    console.error("Error saving marker:", error);
    return res.status(500).send("Error saving marker");
  }
});

app.get("/api/markers", async (req: Request, res: Response) => {
  try {
    const markersSnapshot = await firebaseDB.ref("markers").once("value");
    const markers = markersSnapshot.val(); // Отримання значень

    return res.status(200).json(markers);
  } catch (error) {
    console.error("Error fetching markers:", error);
    return res.status(500).send("Error fetching markers");
  }
});

app.delete("/api/markers", async (req: Request, res: Response) => {
  try {
    await firebaseDB.ref("markers").remove();
    return res.status(200).send("All markers deleted successfully");
  } catch (error) {
    console.error("Error deleting markers:", error);
    return res.status(500).send("Error deleting markers");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
