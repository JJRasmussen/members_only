const { body } = require('express-validator');
const { getUserFromUsername } = require('../../db/queries/userQueries');

const newUserSchema = [
    body('username')
        .trim()
        .notEmpty()
        .withMessage('Username can not be empty.')
        .bail()
        .isLength({ max: 22 })
        .withMessage('Username cannot be longer than 22 characters')
        .bail()
        .custom(async value => {
            const user = await getUserFromUsername(value);
            if (user) {
                return false;
            }
            return true;
        })
        .withMessage('Username is already in use'),
    body('password')
        .notEmpty()
        .withMessage('Password can not be empty')
        .isLength({ min: 6 })
        .withMessage('Password length must be at least six characters'),
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