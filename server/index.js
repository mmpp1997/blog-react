import express from "express";
//import passport from "passport";
//import session from "express-session";
import cors from "cors";

const app = express();
app.use(cors());

const port = 3001;


//app.use(express.static('public'));
app.get('/api/data', (req, res) => {
    console.log('Received request for /api/data');
    res.json({ message: 'Hello from the server!' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });