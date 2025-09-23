const model = require("../../model/companydetail/companydetails");
const dal = require("../../helper/dal");

exports.createCompany = async (body) => {
  const rawCompanyName = body.companyName || "";
const companyName = rawCompanyName.trim();

  const findCompanyName = await dal.findOne(model, {
    companyName:  { $regex: new RegExp(`^${companyName}$`, "i") },
  });
  if (findCompanyName) {
    return {
      status: 400,
      message: "Company Name already exists",
    };
  }
  if (body.email) {
    const findEmail = await dal.findOne(model, { email: body.email });
    if (findEmail) {
      return {
        status: 400,
        message: "Email already exists",
      };
    }
  }

  const findPhone = await dal.findOne(model, { phone: { $in: body.phone } });
  if (findPhone) {
    return {
      status: 400,
      message: "Phone number already exists",
    };
  }
  if (body.gst) {
    const findgst = await dal.findOne(model, { gst: body.gst });
    if (findgst) {
      return {
        status: 400,
        message: "GST already exists",
      };
    }
  }
  if (body.pan) {
    const findpan = await dal.findOne(model, { pan: body.pan });
    if (findpan) {
      return {
        status: 400,
        message: "PAN already exists",
      };
    }
  }

  
  const companydetail = await dal.create(model, {...body,
    companyName:companyName
  });
  return {
    status: 200,
    message: "Company Created Successfully",
    data: companydetail,
  };
};

exports.updateCompanyDetails = async (id, body) => {
  const find = await dal.findByID(model, id);

  if (!find) {
    return {
      status: 400,
      message: "Company Details not found",
    };
  }

  const rawCompanyName = body.companyName || "";
const companyName = rawCompanyName.trim();


  const findCompanyName = await dal.findOne(model, {
    companyName: { $regex: new RegExp(`^${companyName}$`, "i") },
    _id: { $ne: id },
  });
  if (findCompanyName) {
    return {
      status: 400,
      message: "Company Name already exists",
    };
  }
  if (body.email) {
    const findEmail = await dal.findOne(model, {
      email: body.email,
      _id: { $ne: id },
    });
    if (findEmail) {
      return {
        status: 400,
        message: "Email already exists",
      };
    }
  }

  const findPhone = await dal.findOne(model, {
    phone: { $in: body.phone },
    _id: { $ne: id },
  });

  if (findPhone) {
    return {
      status: 400,
      message: "Phone number already exists",
    };
  }
if (body.gst){
  const findgst = await dal.findOne(model, { gst: body.gst, _id: { $ne: id } });
  if (findgst) {
    return {
      status: 400,
      message: "GST already exists",
    };
  }
}
  if(body.pan){
  const findpan = await dal.findOne(model, { pan: body.pan, _id: { $ne: id } });
  if (findpan) {
    return {
      status: 400,
      message: "PAN already exists",
    };
  }
  }
  const companydetail = await dal.findOneAndUpdate(model, { _id: id }, {...body,
    companyName:companyName
  },{ new: true } );
  return {
    status: 200,
    message: "Company details updated Successfully",
    data: companydetail,
  };
};

exports.getCompany = async () => {
  const companydetail = await dal.find(model);
  return {
    status: 200,
    message: "Company Details",
    data: companydetail || [],
  };
};

exports.getCompanyById = async (id) => {
  const companydetail = await dal.findByID(model, id);

  if (!companydetail) {
    return {
      status: 400,
      message: "Company not found",
    };
  }

  return {
    status: 200,
    message: "Company Dtails Fetched Successfully",
    data: companydetail,
  };
};

exports.deleteCompany = async (id) => {
  const companydetail = await dal.findOneAndDelete(model, id);
  if (!companydetail) {
    return {
      status: 400,
      message: "Company not found",
    };
  }
  return {
    status: 200,
    message: "Company Deleted Successfully",
  };
};
