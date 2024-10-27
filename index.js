// Import Express
const express = require('express');
const app = express();
const Population = require("./models/Population");
const cors = require("cors");
const cron = require('node-cron');

require("dotenv").config();
require("./config/db")

// Set the port
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({}));

app.get('/api/data', async (req, res) => {
    const population_data = await Population.findOne();
    res.json({ data: population_data });
});

cron.schedule('*/10 * * * *', async () => {
    const population_data = await Population.findOne();
    if (population_data.currentBatch < 8) {
        await Population.updateOne({ _id: population_data._id }, {
            currentBatch: population_data.currentBatch + 1
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
