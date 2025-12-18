const dal = require("../../helper/dal"); // PostgreSQL DAL
const model = require("../../model/broker/broker");

/**
 * Create Broker
 */
exports.createBroker = async (body) => {
  console.log("🚀 ~ body:", body);
  const phoneExists = await dal.findOne(model, {
    phone: body.phone,
  });

  if (phoneExists) {
    return { status: 400, message: "Phone number already exists" };
  }

  const broker = await dal.create(model, body);

  return {
    status: 200,
    message: "Broker Created successfully",
    data: broker,
  };
};

/**
 * Update Broker
 */
exports.updateBroker = async (body, id) => {
  const existingBroker = await dal.findByID(model, id);

  if (!existingBroker) {
    return { status: 400, message: "Broker Details not found" };
  }

  if (body.email) {
    const emailExists = await dal.findOneExcludeId(
      model,
      "email",
      body.email,
      id
    );

    if (emailExists) {
      return { status: 400, message: "Email already exists" };
    }
  }

  if (body.phones) {
    const phoneExists = await dal.findOneExcludeId(
      model,
      "phone",
      body.phone,
      id
    );

    if (phoneExists) {
      return { status: 400, message: "Phone number already exists" };
    }
  }
  console.log("🚀 ~ body:", body)

  const updatedBroker = await dal.findOneAndUpdate(model, {id}, body);
  console.log("🚀 ~ updatedBroker:", updatedBroker)

  return {
    status: 200,
    message: "Broker updated successfully",
    data: updatedBroker,
  };
};

/**
 * Get All Brokers
 */
exports.getAllBroker = async () => {
  const brokers = await dal.find(model);
  const formattedBrokers = (brokers || []).map((broker) => {
    return {
      _id: broker.id, // id → _id
      userId: broker.userid,
      name: broker.name,
      email: broker.email,
      phone: broker.phone, 
      paymentCalculation: broker.paymentcalculation,
      paymentValue: Number(broker.paymentvalue,0),
      createdAt: broker.createdat,
      updatedAt: broker.updatedat,
    };
  });

  return {
    status: 200,
    message: "Broker fetched successfully",
    data: formattedBrokers || [],
  };
};

/**
 * Get Broker By ID
 */
exports.getBrokerById = async (id) => {
  const broker = await dal.findByID(model, id);

  if (!broker) {
    return { status: 400, message: "Broker not found" };
  }

  return {
    status: 200,
    message: "Broker fetched successfully",
    data: broker,
  };
};

/**
 * Delete Broker
 */
exports.deleteBroker = async (id) => {
  const broker = await dal.findByID(model, id);

  if (!broker) {
    return { status: 400, message: "Broker not found" };
  }

  const deletedBroker = await dal.findOneAndDelete(model, {id});

  return {
    status: 200,
    message: "Broker deleted successfully",
    data: deletedBroker,
  };
};
