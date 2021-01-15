const { Router } = require(`express`);
const router = Router();
const User = require(`../models/User`);

router.post("/register", async (req, res) => {
    try {
        const { login, password } = req.body;

        const candidate = a;
    } catch (e) {
        res.status(500).json({ message: `/auth/register\n${e.message}` });
    }
});

router.post("/login", async (req, res) => {});

module.exports = router;
