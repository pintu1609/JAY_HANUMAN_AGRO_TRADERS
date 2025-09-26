const model = require("../../model/client/clientdetails");
const dal = require("../../helper/dal");
const { required } = require("joi");
const companymodel = require("../../model/companydetail/companydetails");

exports.createClient = async (body) => {

  if (body.email) {
    const findEmail = await dal.findOne(model, { email: body.email });
    if (findEmail) {
      return {
        status: 400,
        message: "Email already exists",
      };
    }
  }

  const findPhone = await dal.findOne(model, {  phone: { $in: body.phone }});
  if (findPhone) {
    return {
      status: 400,
      message: "Phone number already exists",
    };
  }

  

  const clientDetail = await dal.create(model, body);
  return {
    status: 200,
    message: "Client Details Created Successfully",
    data: clientDetail,
  };
};

exports.updateClientDetails = async (id, body) => {

  if (body.email) {
    const findEmail = await dal.findOne(
      model,
      { email: body.email , _id: { $ne: id } },
    );
    if (findEmail) {
      return {
        status: 400,
        message: "Email already exists",
      };
    }
  }

   const findPhone = await dal.findOne(model, {  phone: { $in: body.phone }, _id: { $ne: id } });
 
  if (findPhone) {
    return {
      status: 400,
      message: "Phone number already exists",
    };
  }


  const clientDetail = await dal.findOneAndUpdate(model, { _id: id }, body, {
    new: true,
  });
  return {
    status: 200,
    message: "Client details updated Successfully",
    data: clientDetail,
  };
};

exports.getAllClient = async () => {
  const clientDetail = await dal.findAndPopulate(model,{}, {}, {}, {}, ["companyName"]);
  console.log("🚀 ~ clientDetail:", clientDetail)
  // const CompanyDetails= await dal.findByID(companymodel, id);
  console.log("🚀 ~ clientDetail:", clientDetail)
  return {
    status: 200,
    message: "Client Details Fetched Successfully",
    data: clientDetail ||[],
  };
};

exports.getClientById = async (id) => {
  const clientDetails = await dal.findByID(model, id);
  const companydetail= await dal.findByID(companymodel, clientDetails.companyName);

  clientDetails.companyName=companydetail


  if (!clientDetails) {
    return {
      status: 400,
      message: "Client details not found",
    };
  }

  return {
    status: 200,
    message: "Client Details Fetched Successfully",
    data: clientDetails,
  };
};

exports.deleteClient = async (id) => {
  const clientDetail = await dal.findOneAndDelete(model, id);
  if (!clientDetail) {
    return {
      status: 400,
      message: "Client Details not found",
    };
  }
  return {
    status: 200,
    message: "Client Deleted Successfully",
  };
};
