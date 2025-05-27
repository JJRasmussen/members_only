const { body } = require('express-validator');

const newUserSchema = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username can not be empty.')
        .bail()
        .isAlpha()
        .withMessage('Name must only contain alphanumeric letters (A-Z)')
        .bail()
        .custom(async value => {
            const user = await getUserFromUsername(username);
        })
        .withMessage('Username is already in use'),
    body('password')
        .notEmpty()
        .withMessage('Password can not be empty')
        .isLength({ min: 3 })
        .withMessage('Password length must be at least three characters'),
    body('passwordConfirmation')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                return false;
            }
            return true;
        })
        .withMessage('The passwords did not match'),
];

module.exports = {
    newUserSchema,
};