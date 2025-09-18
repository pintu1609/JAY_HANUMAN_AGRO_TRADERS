const registerModel = require("../../model/auth/register");
const dal = require("../../helper/dal");
const bcrypt = require("bcryptjs");



exports.registerUser = async (body) => {
    const existingUser = await dal.findOne(registerModel, { email: body.email });
    if (existingUser) {
        return {
            message: "Email already exists",
            status: 400,
        };
    }
    const existingPhone = await dal.findOne(registerModel, { phone: body.phone });
    if (existingPhone) {
        return {
            message: "Phone number already exists",
            status: 400,
        };
    }
    const password = await bcrypt.hash(body.password, 10);
    body.password = password;
        const user = await dal.create(registerModel, body);
        return {
            message: "User registered successfully",
            status: 200,
            data: user,
        };
    };