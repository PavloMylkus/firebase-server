"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_1 = __importDefault(require("firebase/app"));
require("firebase/database");
const app = (0, express_1.default)();
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
const apiIni = app_1.default.initializeApp(firebaseConfig);
const firebaseDB = app_1.default.database();
// Middleware для роботи з JSON
app.use(express_1.default.json());
// Роут для зберігання даних у Firebase
app.post("/api/markers", async (req, res) => {
    try {
        const { lat, lng, label } = req.body;
        if (!lat || !lng || !label) {
            return res.status(400).send("Invalid data provided");
        }
        firebaseDB.ref(`markers/Quest-${label}`).set({ lat, lng }, (error) => {
            if (error) {
                console.error("Error saving marker:", error);
                return res.status(500).send("Error saving marker");
            }
            else {
                return res.status(200).send("Marker saved successfully");
            }
        });
    }
    catch (error) {
        console.error("Error saving marker:", error);
        return res.status(500).send("Error saving marker");
    }
});

// Слухання запитів на вказаному порті
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
