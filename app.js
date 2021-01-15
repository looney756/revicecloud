const express = require(`express`);
const config = require(`config`);
const mongoose = require(`mongoose`);
const router = require("./routes/auth.routes");

const app = express();

app.use(`/api/auth`, router);

const PORT = config.get(`port`) || 5000;

async function start() {
    try {
        await mongoose.connect(config.get(`mongoUri`), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        });
    } catch (e) {
        console.log(`Server error`, e.message);
        process.exit(1);
    }
}

app.listen(PORT, () => console.log(`App has been started at port ${PORT}..`));
