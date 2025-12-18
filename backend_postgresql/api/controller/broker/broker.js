const brokerService = require("../../service/broker/broker");

exports.createBroker = async (req, res) => {
    const body = req.body;
    const userId = req.user.id;
    console.log("🚀 ~ userId:", userId)
    body.userId = userId;
  const result = await brokerService.createBroker(body);
  res.status(result.status).json(result);
};

exports.updateBroker = async (req, res) => {
    const body = req.body;
    const userId = req.user.id;
    console.log("🚀 ~ userId:", userId)
    body.userId = userId;
  const result = await brokerService.updateBroker(body, req.params.id);
  res.status(result.status).json(result);
};

exports.getAllBroker = async (req, res) => {
  const result = await brokerService.getAllBroker();
  res.status(result.status).json(result);
};

exports.getBrokerById = async (req, res) => {
  const result = await brokerService.getBrokerById(req.params.id);
  res.status(result.status).json(result);
};

exports.deleteBroker = async (req, res) => {
  const result = await brokerService.deleteBroker(req.params.id);
  res.status(result.status).json(result);
};
