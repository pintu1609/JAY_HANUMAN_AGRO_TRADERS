const model = require("../../model/seller/seller");
const dal = require("../../helper/dal");
const brokerModel = require("../../model/broker/broker");
const modelPayment = require("../../model/broker/brokerPayment");

exports.createSeller = async (body) => {
  let totalAmount = 0;
  let commisionAmount = 0;
  let weightCost = 0;

  const packagesWithCalculation = body.packages.map((pkg) => {
    const amount = ((pkg.package * pkg.weight) / 40) * pkg.rate;

    let packageTotal;
    if (!pkg.commision || pkg.commision === 0) {
      packageTotal = amount;
    } else {
      const commissionDeduction = (amount * pkg.commision) / 100;
      const weightDecuction = pkg.package * 5;
      packageTotal = amount - commissionDeduction - weightDecuction;
      commisionAmount += commissionDeduction;
      weightCost += weightDecuction;
    }

    totalAmount += packageTotal;

    return {
      ...pkg,
      amount,
      remaining: pkg.package,
    };
  });

  const sellerData = {
    userId: body.userId,
    name: body.name,
    address: body.address,
    totalAmount,
    commisionAmount,
    weightCost,
    packages: packagesWithCalculation,
  };

  const user = await dal.create(model, sellerData);
  return {
    message: "Seller Good details Created successfully",
    status: 200,
    data: user,
  };
};

exports.getAllSellerGoodsWithPayment = async (body) => {
  const sellerData = await dal.aggregate(model, body);

  return {
    message: "Seller Good details fetched successfully",
    status: 200,
    data: sellerData || [],
  };
};

exports.getAllSeller = async (quries) => {
  const selleeGoodsData = await dal.aggregate(model, quries);

  return {
    message: "Seller Good details fetched successfully",
    status: 200,
    data: selleeGoodsData || [],
  };
};
exports.getSellerById = async (id) => {
  const user = await dal.findByID(model, id);
  if (!user) {
    return {
      message: "Seller Good details not found",
      status: 400,
    };
  }
  return {
    message: "Seller Good details fetched successfully",
    status: 200,
    data: user,
  };
};

exports.updateSeller = async (body, id) => {
  const goodDetails = await dal.findByID(model, id);
  if (!goodDetails) {
    return {
      message: "Seller Good details not found",
      status: 400,
    };
  }

  let totalAmount = 0;
  let commisionAmount = 0;
  let weightCost = 0;

  const packagesWithCalculation = body.packages.map((pkg) => {
    // const amount = ((pkg.package * pkg.weight) / 40) * pkg.rate;

    const existingPkg = goodDetails.packages.find(
      (p) => String(p._id) === String(pkg._id)
    );

    // let soldPackages = 0;
    // if (existingPkg && existingPkg.clientDetails) {
    //   soldPackages = existingPkg.clientDetails.reduce((acc, client) => {
    //     return acc + Number(client.soldPackages || 0);
    //   }, 0);
    // }
    // totalLfetPackages = Number(pkg.package) - soldPackages;

    const clientDetails = existingPkg?.clientDetails || [];

    // const soldPackages = existingPkg?.soldPackages || 0; // optional, if you track sold
    // const remaining = pkg.package - soldPackages;

    const totalSold = clientDetails.reduce(
      (acc, c) => acc + Number(c.soldPackages || 0),
      0
    );
    const remaining = pkg.package - totalSold;

    const amount = ((pkg.package * pkg.weight) / 40) * pkg.rate;

    let packageTotal;
    if (!pkg.commision || pkg.commision === 0) {
      packageTotal = amount;
    } else {
      const commissionDeduction = (amount * pkg.commision) / 100;
      const weightDecuction = pkg.package * 5;
      packageTotal = amount - commissionDeduction - weightDecuction;
      commisionAmount += commissionDeduction;
      weightCost += weightDecuction;
    }

    totalAmount += packageTotal;

    return {
      ...pkg,
      amount,
      // clientDetails: existingPkg.clientDetails,
     remaining,
      clientDetails,
    };
  });

  const updatedSellerData = {
    userId: body.userId,
    name: body.name,
    address: body.address,
    totalAmount,
    commisionAmount,
    weightCost,
    packages: packagesWithCalculation,
  };

  const user = await dal.findOneAndUpdate(
    model,
    { _id: id },
    updatedSellerData
  );
  return {
    message: "Seller Good details updated successfully",
    status: 200,
    data: user,
  };
};

exports.deleteSeller = async (id) => {
  const goodDetails = await dal.findByID(model, id);
  if (!goodDetails) {
    return {
      message: "Seller Good details not found",
      status: 400,
    };
  }
  await dal.findOneAndDelete(model, { _id: id });
  return {
    message: "Seller Good details deleted successfully",
    status: 200,
  };
};

exports.sellerDetailsByBrokerId = async (quries, quriespayment, id) => {
  const sellerDettailforbroker = await dal.aggregate(model, quries);

  const paymentDettailforbroker = await dal.aggregate(
    modelPayment,
    quriespayment
  );
  const brokerDetails = await dal.findByID(brokerModel, id);
  if (!sellerDettailforbroker) {
    return {
      message: "seller Good details not found",
      status: 400,
    };
  }

  const paymentType = brokerDetails.paymentCalculation;
  const paymentValue = brokerDetails.paymentValue;
  const totalCount = sellerDettailforbroker[0]?.totalCount?.[0]?.count || 0;
  const brokerPayments = paymentDettailforbroker[0]?.data || [];

  const updateSellerDetails = sellerDettailforbroker[0]?.data.map((seller) => {
    let commissionTotal = 0;
    const updatedPackages = seller.packages.map((pkg) => {
      let commission = 0;

      if (paymentType === "percentage") {
        commission = (pkg.amount * paymentValue) / 100;
      } else {
        commission = pkg.package * paymentValue;
      }

      commissionTotal += commission;
      return {
        ...pkg,
        brokerCommission: commission,
      };
    });
    return {
      ...seller,
      totalBrokerCommission: commissionTotal,
      packages: updatedPackages,
    };
  });

  return {
    message: "seller Good details fetched successfully",
    status: 200,
    data: updateSellerDetails,
    totalCount,
    brokerPayments,
  };
};
