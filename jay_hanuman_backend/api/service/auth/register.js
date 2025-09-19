const registerModel = require("../../model/auth/register");
const dal = require("../../helper/dal");
const bcrypt = require("bcryptjs");
const { getAccessToken } = require("../../helper/helper");

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

  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;
  return {
    message: "User registered successfully",
    status: 200,
    data: userWithoutPassword,
  };
};

exports.loginUser = async (body) => {
  const existingUser = await dal.findOne(registerModel, { email: body.email });
  if (!existingUser) {
    return {
      status: 400,
      message: "user doesn't exist",
    };
  }
  const isPasswordMatch = await bcrypt.compare(
    body.password,
    existingUser.password
  );
  if (!isPasswordMatch) {
    return {
      message: "Invalid password",
      status: 400,
    };
  }

  const token = getAccessToken({
    id: existingUser._id,
    role: existingUser.role,
    email: existingUser.email,
    name: existingUser.name,
  });

  const userWithoutPassword = existingUser.toObject();
  delete userWithoutPassword.password;

  return {
    message: "User logged in successfully",
    status: 200,
    data: {
      data: userWithoutPassword,
      token,
    },
  };
};

exports.getAllUser=async()=>{
  const users = await dal.find(registerModel);
  const usersWithoutPassword = users.map(user => {
    const { password, ...userWithoutPassword } = user.toObject ? user.toObject() : user;
    return userWithoutPassword;
  });
  return {
    message: "All User fetched successfully",
    status: 200,
    data: usersWithoutPassword,
  };
}

exports.getUserById=async(id)=>{
  const user = await dal.findByID(registerModel,id);
  if(!user){
    return {
      message: "User not found",
      status: 200,
      data: {},
    };
  }
  const userWithoutPassword = user.toObject();
  delete userWithoutPassword.password;
  return {
    message: "User fetched successfully",
    status: 200,
    data: user,
  };
}

exports.updateUser=async(id,body)=>{
  const user = await dal.findByID(registerModel,id);
  if(!user){
    return {
      message: "User not found",
      status: 400,
    };
  }
  const existingEmail = await dal.findOne(registerModel, { email: body.email ,_id: { $ne: id } });
  if (existingEmail) {
    return {
      message: "Email already exists",
      status: 400,
    };
  }
  const existingPhone = await dal.findOne(registerModel, { phone: body.phone ,_id: { $ne: id } });
  if (existingPhone) {
    return {
      message: "Phone number already exists",
      status: 400,
    };
  }
  if(body.password){
    const password = await bcrypt.hash(body.password, 10);
    body.password = password;
  }
  const updatedUser = await dal.findOneAndUpdate(registerModel,{_id:id},body);
  const userWithoutPassword = updatedUser.toObject();
  delete userWithoutPassword.password;
  return {
    message: "User updated successfully",
    status: 200,
    data: userWithoutPassword,
  };
}

exports.deleteUser=async(id)=>{
  const user = await dal.findByID(registerModel,id);
  if(!user){
    return {
      message: "User not found",
      status: 400,
    };
  }
  await dal.findOneAndDelete(registerModel,{_id:id});
  return {
    message: "User deleted successfully",
    status: 200,
    data: {},
  };
}