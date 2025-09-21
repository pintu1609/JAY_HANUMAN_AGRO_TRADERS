const model = require("../../model/broker/broker");
const dal = require("../../helper/dal");

/**
 * Update a broker
 */
exports.createBroker = async (body) => {
  const existingPhone = await dal.findOne(model, { phone: body.phone });
  if (existingPhone) {
    return {
      message: "Phone number already exists",
      status: 400,
    };
  }

  const user = await dal.create(model, body);

  return {
    message: "Broker Created successfully",
    status: 200,
    data: user,
  };
};

/**
 * Update a broker
 */
exports.updateBroker = async (body, id) => {
  const existingUser = await dal.findByID(model, id);
  if (!existingUser) {
    return {
      status: 400,
      message: "Broker Details not found",
    };
  }
  if (body.email) {
    const existingEmail = await dal.findOne(model, {
      email: body.email,
      _id: { $ne: id },
    });

    if (existingEmail) {
      return {
        status: 400,
        message: "Email already exists",
      };
    }
  }
  const existingPhone = await dal.findOne(model, {
    phone: body.phone,
    _id: { $ne: id },
  });

  if (existingPhone) {
    return {
      status: 400,
      message: "Phone number already exists",
    };
  }

  const updatedBroker = await dal.findOneAndUpdate(model, { _id: id }, body);
  return {
    message: "Broker updated successfully",
    status: 200,
    data: updatedBroker,
  };
};

exports.getAllBroker = async () => {
  const broker = await dal.find(model);
  return {
    message: "Broker fetched successfully",
    status: 200,
    data: broker ? broker : [],
  };
};

exports.getBrokerById = async (id) => {
  const broker = await dal.findByID(model, id);
  if (!broker) {
    return {
      message: "Broker not found",
      status: 400,
    };
  }
  return {
    message: "Broker fetched successfully",
    status: 200,
    data: broker,
  };
};

exports.deleteBroker = async (id) => {
  const broker = await dal.findByID(model, id);
  if (!broker) {
    return {
      message: "Broker not found",
      status: 400,
    };
  }
  const deletedBroker = await dal.findOneAndDelete(model, { _id: id });
  return {
    message: "Broker deleted successfully",
    status: 200,
    data: deletedBroker,
  };
};

