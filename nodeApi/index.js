const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();

const router = require('./router/Router');

app.use(cors());
app.use('/', router);

//cofiguration
dotenv.config();

const uri = process.env.DB_URI;
// Connect to MongoDB Atlas
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Atlas");
}).catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server started at http://localhost:${PORT}`);
});
