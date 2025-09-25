const dal = require("../../helper/dal");
const model = require("../../model/ClientBuyerGoods/ClientBuyerGoods");
const sellermodal = require("../../model/seller/seller");
exports.create = async (body) => {
  const clientTotalPackages = body.packages.reduce((totalpkg, pkg) => {
    return totalpkg + Number(pkg.package);
  }, 0);

  async function calculateSellerTotalPackages(body) {
    let sellerTotalPackages = 0;

    for (const seller of body.sellersDetails) {
      let subtotalpkg = 0;
      const sellerDoc = await dal.findByID(sellermodal, seller.sellerId);

      for (const pkg of seller.sellerPackages) {
        subtotalpkg += Number(pkg.package);

        const pkgdetails = sellerDoc.packages.find(
          (p) => p._id.toString() === pkg.packageId
        );

        if (!pkgdetails) continue;

        const subAmount =
          ((Number(pkg.package) * pkgdetails.weight) / 40) * pkgdetails.rate;

        let amount;
        if (!pkgdetails.commision || pkgdetails.commision === 0) {
          amount = subAmount;
        } else {
          const commissionDeduction = (subAmount * pkgdetails.commision) / 100;
          const weightDecuction = Number(pkg.package) * 5;
          amount = subAmount - commissionDeduction - weightDecuction;
        }

        // totalAmount += amount;
        pkg.sellerAmount = amount || 0;
      }
      sellerTotalPackages += subtotalpkg;
    }

    return sellerTotalPackages;
  }

  const sellerTotalPackages = await calculateSellerTotalPackages(body);

  if (sellerTotalPackages !== clientTotalPackages) {
    return {
      message: "Both Packge of client and seller should be same",
      status: 400,
    };
  }

  const subtotalamount = body.packages.reduce((total, pkg) => {
    let multiplier = pkg.calculation === "Quantal" ? 100 : 40;

    return total + ((Number(pkg.package) * pkg.weight) / multiplier) * pkg.rate;
  }, 0);

  const clientAmount = subtotalamount + body.misleniousCharge;
  const goodsData = {
    ...body,
    clientAmount,
  };
  const createClientGoods = await dal.create(model, goodsData);
  return {
    message: "Client Buyer Goods created successfully",
    status: 200,
    data: createClientGoods,
  };
};

exports.update = async (id, body) => {
  const existingClientGoods = await dal.findByID(model, id);
  if (!existingClientGoods) {
    return {
      message: "Client Buyer Goods not found",
      status: 400,
    };
  }

  const clientTotalPackages = body.packages.reduce((totalpkg, pkg) => {
    return totalpkg + Number(pkg.package);
  }, 0);

  async function calculateSellerTotalPackages(body) {
    let sellerTotalPackages = 0;

    for (const seller of body.sellersDetails) {
      let subtotalpkg = 0;
      const sellerDoc = await dal.findByID(sellermodal, seller.sellerId);

      for (const pkg of seller.sellerPackages) {
        subtotalpkg += Number(pkg.package);

        const pkgdetails = sellerDoc.packages.find(
          (p) => p._id.toString() === pkg.packageId
        );

        if (!pkgdetails) continue;

        const subAmount =
          ((Number(pkg.package) * pkgdetails.weight) / 40) * pkgdetails.rate;

        let amount;
        if (!pkgdetails.commision || pkgdetails.commision === 0) {
          amount = subAmount;
        } else {
          const commissionDeduction = (subAmount * pkgdetails.commision) / 100;
          const weightDecuction = Number(pkg.package) * 5;
          amount = subAmount - commissionDeduction - weightDecuction;
        }

        // totalAmount += amount;
        pkg.sellerAmount = amount || 0;
      }
      sellerTotalPackages += subtotalpkg;
    }

    return sellerTotalPackages;
  }

  const sellerTotalPackages = await calculateSellerTotalPackages(body);

  if (sellerTotalPackages !== clientTotalPackages) {
    return {
      message: "Both Packge of client and seller should be same",
      status: 400,
    };
  }

  const subtotalamount = body.packages.reduce((total, pkg) => {
    let multiplier = pkg.calculation === "Quantal" ? 100 : 40;

    return total + ((Number(pkg.package) * pkg.weight) / multiplier) * pkg.rate;
  }, 0);

  const sellerAmount = subtotalamount + body.misleniousCharge;
  const goodsData = {
    ...body,
    sellerAmount,
  };
  console.log("🚀 ~ goodsData:", goodsData);

  const updateClientGoods = await dal.findOneAndUpdate(
    model,
    { _id: id },
    goodsData,
    {
      new: true,
    }
  );
  return {
    message: "Client Buyer Goods updated successfully",
    status: 200,
    data: updateClientGoods,
  };
};

exports.delete = async (id) => {
  const deleteClientGoods = await dal.findOneAndDelete(model, { _id: id });
  if (!deleteClientGoods) {
    return {
      message: "Client Buyer Goods not found",
      status: 400,
    };
  }
  return {
    message: "Client Buyer Goods deleted successfully",
    status: 200,
  };
};

exports.getClientGoodsDetails = async (quries) => {
  const getClientGoods = await dal.aggregate(model, quries);
  return {
    message: "Client Buyer Goods fetched successfully",
    status: 200,
    data: getClientGoods,
  };
};
