const User = require('../../model/user/user');
const dal = require('../../helper/dal');
const bcrypt = require('bcryptjs');
const { getAccessToken } = require('../../helper/helper');

exports.registerUser = async (body) => {
  const emailExists = await dal.findOne(User, { email: body.email });
  if (emailExists) return { status: 400, message: 'Email already exists' };

  const phoneExists = await dal.findOne(User, { phone: body.phone });
  if (phoneExists) return { status: 400, message: 'Phone already exists' };

  body.password = await bcrypt.hash(body.password, 10);

  const user = await dal.create(User, body);
  delete user.password;

  return { status: 200, message: 'User registered', data: user };
};

exports.loginUser = async (body) => {
  console.log("🚀 ~ body:", body)
  const user = await dal.findOne(User, { email: body.email });
  if (!user) return { status: 400, message: 'User not found' };

  const match = await bcrypt.compare(body.password, user.password);
  if (!match) return { status: 400, message: 'Invalid password' };

  const token = getAccessToken({
    id: user.id,
    role: user.role,
    email: user.email,
    name: user.name,
  });

  delete user.password;
  return { status: 200, message: 'Login successful', data: { data: user, token } };
};

exports.getAllUser = async () => {
  const users = await dal.find(User);
  // users.forEach(u => delete u.password);
  const formattedUsers = users.map(u => {
    const user = { ...u };

    // rename id -> _id
    user._id = user.id;
    delete user.id;

    // remove password
    delete user.password;

    return user;
  });
  return { status: 200, message: 'Users fetched', data: formattedUsers };
};

exports.getUserById = async (id) => {
  const user = await dal.findByID(User, id);
  if (!user) return { status: 404, message: 'User not found' };

  delete user.password;
  return { status: 200, message: 'User fetched', data: user };
};

exports.updateUser = async (id, body) => {
  if (body.password) {
    body.password = await bcrypt.hash(body.password, 10);
  }

  const updated = await dal.findOneAndUpdate(User, { id }, body);
  delete updated.password;

  return { status: 200, message: 'User updated', data: updated };
};

exports.deleteUser = async (id) => {
  await dal.findOneAndDelete(User, { id });
  return { status: 200, message: 'User deleted', data: {} };
};
