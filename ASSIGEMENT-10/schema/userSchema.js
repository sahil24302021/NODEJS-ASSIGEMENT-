const Joi = require("joi");

const userSchema = Joi.object({
    name: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Name is required",
            "any.required": "Name is required"
        }),

    email: Joi.string()
        .email()
        .required()
        .messages({
            "string.email": "Please provide a valid email",
            "string.empty": "Email is required",
            "any.required": "Email is required"
        }),

    age: Joi.number()
        .integer()
        .min(18)
        .max(100)
        .required()
        .messages({
            "number.base": "Age must be a number",
            "number.min": "Age must be at least 18",
            "number.max": "Age must not exceed 100",
            "any.required": "Age is required"
        }),

    course: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Course is required",
            "any.required": "Course is required"
        })
});

module.exports = userSchema;