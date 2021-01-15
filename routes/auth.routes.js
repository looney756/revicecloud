const { Router } = require(`express`);
const bcrypt = require(`bcryptjs`);
const { check, validationResult } = require(`express-validator`);
const router = Router();
const User = require(`../models/User`);

router.post(
    "/register",
    [
        check(`login`, `Uncorrect login.`)
            .exists()
            .withMessage(`Login is required.`)
            .isLength({ min: 4, max: 12 })
            .withMessage(`Minimum length is 4 symbols.`)
            .matches(`/^[A-Za-z][A-Za-z0-9]{4,12}$/gi`)
            .withMessage(`Only symbols and digits.`),
        check(`password`, `Uncorrect password`)
            .isLength({ min: 6, max: 24 })
            .withMessage(`Minimum length is 4 & Maximum length is 24`),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: `Uncorrect data`,
                });
            }
            const { login, password } = req.body;

            const candidate = await User.findOne({ login });

            if (candidate) {
                res.status(400).json({ message: `This login already taken.` });
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({ login, password: hashedPassword });

            await user.save();

            res.status(201).json({ message: `Succefully registered.` });
        } catch (e) {
            res.status(500).json({ message: `/auth/register\n${e.message}` });
        }
    }
);

router.post("/login", async (req, res) => {});

module.exports = router;
