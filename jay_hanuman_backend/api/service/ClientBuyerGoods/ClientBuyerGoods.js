const dal = require("../../helper/dal");
const model = require("../../model/ClientBuyerGoods/ClientBuyerGoods");
// const sellermodal = require("../../model/seller/seller");
const sellerModel = require("../../model/seller/seller");
// exports.create = async (body) => {
//   const clientTotalPackages = body.packages.reduce((totalpkg, pkg) => {
//     return totalpkg + Number(pkg.package);
//   }, 0);

//   async function calculateSellerTotalPackages(body) {
//     let sellerTotalPackages = 0;

//     for (const seller of body.sellersDetails) {
//       let subtotalpkg = 0;
//       const sellerDoc = await dal.findByID(sellermodal, seller.sellerId);

//       for (const pkg of seller.sellerPackages) {
//         subtotalpkg += Number(pkg.package);

//         const pkgdetails = sellerDoc.packages.find(
//           (p) => p._id.toString() === pkg.packageId
//         );

//         if (!pkgdetails) continue;

//         const subAmount =
//           ((Number(pkg.package) * pkgdetails.weight) / 40) * pkgdetails.rate;

//         let amount;
//         if (!pkgdetails.commision || pkgdetails.commision === 0) {
//           amount = subAmount;
//         } else {
//           const commissionDeduction = (subAmount * pkgdetails.commision) / 100;
//           const weightDecuction = Number(pkg.package) * 5;
//           amount = subAmount - commissionDeduction - weightDecuction;
//         }

//         // totalAmount += amount;
//         pkg.sellerAmount = amount || 0;
//       }
//       sellerTotalPackages += subtotalpkg;
//     }

//     return sellerTotalPackages;
//   }

//   const sellerTotalPackages = await calculateSellerTotalPackages(body);

//   if (sellerTotalPackages !== clientTotalPackages) {
//     return {
//       message: "Both Packge of client and seller should be same",
//       status: 400,
//     };
//   }

//   const subtotalamount = body.packages.reduce((total, pkg) => {
//     let multiplier = pkg.calculation === "Quantal" ? 100 : 40;

//     return total + ((Number(pkg.package) * pkg.weight) / multiplier) * pkg.rate;
//   }, 0);

//   const clientAmount = subtotalamount + body.misleniousCharge;

//   const goodsData = {
//     ...body,
//     clientAmount,
//   };

//   for (const seller of body.sellersDetails) {
//     const sellerDoc = await dal.findByID(sellerModel, seller.sellerId);
//     if (!sellerDoc) continue;

//     for (const pkg of seller.sellerPackages) {
//       const pkgdetails = sellerDoc.packages.find(
//         (p) => p._id.toString() === pkg.packageId
//       );
//       if (!pkgdetails) continue;

//       pkgdetails.clientDetails.push({
//         clientId: body.clientId,
//         soldPackages: String(pkg.package), // schema expects String
//       });

//       const totalSold = pkgdetails.clientDetails.reduce(
//         (acc, c) => acc + Number(c.soldPackages || 0),
//         0
//       );

//       pkgdetails.leftPackages = String(Number(pkgdetails.package) - totalSold);
//     }

//     await dal.findOneAndUpdate(sellerModel, { _id: sellerDoc._id }, sellerDoc);
//   }

//   const createClientGoods = await dal.create(model, goodsData);
//   return {
//     message: "Client Buyer Goods created successfully",
//     status: 200,
//     data: createClientGoods,
//   };
// };

// exports.create = async (body) => {
//   // 1. Validate total packages
//   const clientTotalPackages = body.packages.reduce((total, pkg) => total + Number(pkg.package), 0);

//   let sellerTotalPackages = 0;

//   // 2. Update seller package amounts and check total
//   for (const seller of body.sellersDetails) {
//     const sellerDoc = await dal.findByID(sellerModel, seller.sellerId);
//     if (!sellerDoc) throw new Error(`Seller not found: ${seller.sellerId}`);

//     let subtotalpkg = 0;

//     for (const pkg of seller.sellerPackages) {
//       const pkgDetails = sellerDoc.packages.find(p => p._id.toString() === pkg.packageId);
//       if (!pkgDetails) throw new Error(`Package not found in seller: ${pkg.packageId}`);

//       // Amount calculation
//       const subAmount = ((Number(pkg.package) * pkgDetails.weight) / 40) * pkgDetails.rate;
//       let amount;
//       if (!pkgDetails.commision || pkgDetails.commision === 0) {
//         amount = subAmount;
//       } else {
//         const commissionDeduction = (subAmount * pkgDetails.commision) / 100;
//         const weightDeduction = Number(pkg.package) * 5;
//         amount = subAmount - commissionDeduction - weightDeduction;
//       }
//       pkg.sellerAmount = amount;

//       // Update seller clientDetails
//       pkgDetails.clientDetails.push({
//         clientId: body.clientId,
//         soldPackages: Number(pkg.package),
//       });

//       // Update remaining packages
//       const totalSold = pkgDetails.clientDetails.reduce((acc, c) => acc + Number(c.soldPackages || 0), 0);
//       pkgDetails.remaining = Number(pkgDetails.package) - totalSold;

//       subtotalpkg += Number(pkg.package);
//     }

//     sellerTotalPackages += subtotalpkg;

//     // Save updated seller
//     await dal.findOneAndUpdate(sellerModel, { _id: sellerDoc._id }, sellerDoc);
//   }

//   // Validate client packages match total sold by sellers
//   if (sellerTotalPackages !== clientTotalPackages) {
//     return {
//       message: "Total client packages must match total seller packages",
//       status: 400,
//     };
//   }

//   // 3. Calculate client amount
//   const subtotalAmount = body.packages.reduce((total, pkg) => {
//     let multiplier = pkg.calculation === "Quantal" ? 100 : 40;
//     return total + ((Number(pkg.package) * pkg.weight) / multiplier) * pkg.rate;
//   }, 0);
//   const clientAmount = subtotalAmount + body.misleniousCharge;

//   const goodsData = {
//     ...body,
//     clientAmount,
//   };

//   const createdClientGoods = await dal.create(model, goodsData);

//   return {
//     message: "Client Buyer Goods created successfully",
//     status: 200,
//     data: createdClientGoods,
//   };
// }


exports.create = async (body) => {
  // 1️⃣ Validate total client packages
  const clientTotalPackages = body.packages.reduce(
    (sum, pkg) => sum + Number(pkg.package),
    0
  );

  let sellerTotalPackages = 0;

  // 2️⃣ Validate seller packages & calculate sellerAmount (NO DB UPDATE YET)
  for (const seller of body.sellersDetails) {
    const sellerDoc = await dal.findByID(sellerModel, seller.sellerId);
    if (!sellerDoc) throw new Error("Seller not found");

    let subtotal = 0;

    for (const pkg of seller.sellerPackages) {
      const pkgDetails = sellerDoc.packages.find(
        p => p._id.toString() === pkg.packageId
      );
      if (!pkgDetails) throw new Error("Seller package not found");

      const subAmount =
        ((Number(pkg.package) * pkgDetails.weight) / 40) * pkgDetails.rate;

      const amount = pkgDetails.commision
        ? subAmount -
          (subAmount * pkgDetails.commision) / 100 -
          Number(pkg.package) * 5
        : subAmount;

      pkg.sellerAmount = amount;
      subtotal += Number(pkg.package);
    }

    sellerTotalPackages += subtotal;
  }

  if (sellerTotalPackages !== clientTotalPackages) {
    return {
      status: 400,
      message: "Client & Seller package total mismatch",
    };
  }

  // 3️⃣ Calculate client amount
  const subtotalAmount = body.packages.reduce((sum, pkg) => {
    const multiplier = pkg.calculation === "Quantal" ? 100 : 40;
    return sum + ((pkg.package * pkg.weight) / multiplier) * pkg.rate;
  }, 0);

  const clientAmount = subtotalAmount + body.misleniousCharge;

  // 4️⃣ Create ClientBuyerGoods FIRST
  const createdClientGoods = await dal.create(model, {
    ...body,
    clientAmount,
  });

  const clientGoodsId = createdClientGoods._id;

  // 5️⃣ Update sellers with clientGoodsId
  for (const seller of body.sellersDetails) {
    const sellerDoc = await dal.findByID(sellerModel, seller.sellerId);

    for (const pkg of seller.sellerPackages) {
      const pkgDetails = sellerDoc.packages.find(
        p => p._id.toString() === pkg.packageId
      );

      pkgDetails.clientDetails.push({
        clientGoodsId,
        soldPackages: Number(pkg.package),
      });

      const totalSold = pkgDetails.clientDetails.reduce(
        (acc, c) => acc + Number(c.soldPackages || 0),
        0
      );

      pkgDetails.remaining = Number(pkgDetails.package) - totalSold;
    }

    await dal.findOneAndUpdate(
      sellerModel,
      { _id: sellerDoc._id },
      { $set: { packages: sellerDoc.packages } }
    );
  }

  return {
    status: 200,
    message: "Client Buyer Goods created successfully",
    data: createdClientGoods,
  };
};


// exports.update = async (id, body) => {
//   const existingClientGoods = await dal.findByID(model, id);
//   if (!existingClientGoods) {
//     return {
//       message: "Client Buyer Goods not found",
//       status: 400,
//     };
//   }

//   const clientTotalPackages = body.packages.reduce((totalpkg, pkg) => {
//     return totalpkg + Number(pkg.package);
//   }, 0);

//   async function calculateSellerTotalPackages(body) {
//     let sellerTotalPackages = 0;

//     for (const seller of body.sellersDetails) {
//       let subtotalpkg = 0;
//       const sellerDoc = await dal.findByID(sellermodal, seller.sellerId);

//       for (const pkg of seller.sellerPackages) {
//         subtotalpkg += Number(pkg.package);

//         const pkgdetails = sellerDoc.packages.find(
//           (p) => p._id.toString() === pkg.packageId
//         );

//         if (!pkgdetails) continue;

//         const subAmount =
//           ((Number(pkg.package) * pkgdetails.weight) / 40) * pkgdetails.rate;

//         let amount;
//         if (!pkgdetails.commision || pkgdetails.commision === 0) {
//           amount = subAmount;
//         } else {
//           const commissionDeduction = (subAmount * pkgdetails.commision) / 100;
//           const weightDecuction = Number(pkg.package) * 5;
//           amount = subAmount - commissionDeduction - weightDecuction;
//         }

//         // totalAmount += amount;
//         pkg.sellerAmount = amount || 0;
//       }
//       sellerTotalPackages += subtotalpkg;
//     }

//     return sellerTotalPackages;
//   }

//   const sellerTotalPackages = await calculateSellerTotalPackages(body);

//   if (sellerTotalPackages !== clientTotalPackages) {
//     return {
//       message: "Both Packge of client and seller should be same",
//       status: 400,
//     };
//   }

//   const subtotalamount = body.packages.reduce((total, pkg) => {
//     let multiplier = pkg.calculation === "Quantal" ? 100 : 40;

//     return total + ((Number(pkg.package) * pkg.weight) / multiplier) * pkg.rate;
//   }, 0);

//   const clientAmount = subtotalamount + body.misleniousCharge;
//   const goodsData = {
//     ...body,
//     clientAmount,
//   };

  
//   // for (const seller of body.sellersDetails) {
//   //   const sellerDoc = await dal.findByID(sellerModel, seller.sellerId);
//   //   if (!sellerDoc) continue;

//   //   for (const pkg of seller.sellerPackages) {
//   //     const pkgdetails = sellerDoc.packages.find(
//   //       (p) => p._id.toString() === pkg.packageId
//   //     );
//   //     if (!pkgdetails) continue;

//   //     // const existingClient = pkgdetails.clientDetails.find(
//   //     //   (c) => c.clientId.toString() === body.clientId
//   //     // );

//   //     // if (existingClient) {
//   //     //   // If client exists, update soldPackages
//   //     //   existingClient.soldPackages = String(Number(pkg.package));
//   //     // } else {
//   //     //   // Otherwise, push new client entry
//   //     //   pkgdetails.clientDetails.push({
//   //     //     clientId: body.clientId,
//   //     //     soldPackages: String(pkg.package),
//   //     //   });
//   //     // }

//   //     pkgdetails.clientDetails = pkgdetails.clientDetails
//   //   .filter((c) => c.clientId.toString() !== body.clientId)
//   //   .concat([
//   //     {
//   //       clientId: body.clientId,
//   //       soldPackages: String(pkg.package),
//   //     },
//   //   ]);

//   //     const totalSold = pkgdetails.clientDetails.reduce(
//   //       (acc, c) => acc + Number(c.soldPackages || 0),
//   //       0
//   //     );

//   //     pkgdetails.leftPackages = String(Number(pkgdetails.package) - totalSold);
//   //   }

//   //   await dal.findOneAndUpdate(sellerModel, { _id: sellerDoc._id }, sellerDoc);
//   // }


// // update clientPackage


// //   const sellersWithClient = await dal.find(sellerModel, {
// //   "packages.clientDetails.clientId": body.clientId,
// // });
// //   console.log("🚀 ~ sellersWithClient:", sellersWithClient)

// //   for (const seller of sellersWithClient) {
// //   for (const pkg of seller.packages) {
// //     pkg.clientDetails = pkg.clientDetails.filter(
// //       (c) => c.clientId.toString() !== body.clientId.toString()
// //     );

    

// //     // recalc leftPackages
// //     const totalSold = pkg.clientDetails.reduce(
// //       (acc, c) => acc + Number(c.soldPackages || 0),
// //       0
// //     );
// //     pkg.leftPackages = String(Number(pkg.package) - totalSold);
// //   }

// //   await seller.save();
// // }

//   const updateClientGoods = await dal.findOneAndReplace(
//     model,
//     { _id: id },
//     goodsData,
//     {
//       new: true,
//     }
//   );
//   return {
//     message: "Client Buyer Goods updated successfully",
//     status: 200,
//     data: updateClientGoods,
//   };
// };


// exports.update = async (id, body) => {
//   // 1️⃣ Fetch existing client goods
//   const existingClientGoods = await dal.findByID(model, id);
//   if (!existingClientGoods) {
//     return { message: "Client Buyer Goods not found", status: 400 };
//   }

//   // 2️⃣ Calculate total packages selected by client
//   const clientTotalPackages = body.packages.reduce(
//     (sum, pkg) => sum + Number(pkg.package),
//     0
//   );

//   let sellerTotalPackages = 0;

//   // 3️⃣ Loop through each seller
//   for (const seller of body.sellersDetails) {
//     const sellerDoc = await dal.findByID(sellerModel, seller.sellerId);
//     if (!sellerDoc) throw new Error(`Seller not found: ${seller.sellerId}`);

//     const updatedPackageIds = seller.sellerPackages.map(p => p.packageId);
//     let subtotalpkg = 0;

//     // 4️⃣ Loop through seller's packages
//     for (const pkgDetails of sellerDoc.packages) {
//       // Check if this package is selected in update
//       const updatedPkg = seller.sellerPackages.find(
//         p => p.packageId === pkgDetails._id.toString()
//       );

//       if (updatedPkg) {
//         // Remove old client details for this client
//         pkgDetails.clientDetails = (pkgDetails.clientDetails || []).filter(
//           c => c.clientId.toString() !== body.clientId
//         );

//         // Add updated client details
//         pkgDetails.clientDetails.push({
//           clientId: body.clientId,
//           soldPackages: Number(updatedPkg.package),
//         });

//         // Update remaining
//         const totalSold = pkgDetails.clientDetails.reduce(
//           (acc, c) => acc + Number(c.soldPackages || 0),
//           0
//         );
//         pkgDetails.remaining = Number(pkgDetails.package) - totalSold;

//         // Update seller amount
//         const subAmount = ((Number(updatedPkg.package) * pkgDetails.weight) / 40) * pkgDetails.rate;
//         pkgDetails.sellerAmount = pkgDetails.commision
//           ? subAmount - (subAmount * pkgDetails.commision) / 100 - updatedPkg.package * 5
//           : subAmount;

//         subtotalpkg += Number(updatedPkg.package);
//       } else {
//         // Package is no longer selected: remove this client's details
//         pkgDetails.clientDetails = (pkgDetails.clientDetails || []).filter(
//           c => c.clientId.toString() !== body.clientId
//         );

//         // Update remaining
//         const totalSold = pkgDetails.clientDetails.reduce(
//           (acc, c) => acc + Number(c.soldPackages || 0),
//           0
//         );
//         pkgDetails.remaining = Number(pkgDetails.package) - totalSold;
//       }
//     }

//     sellerTotalPackages += subtotalpkg;

//     // 5️⃣ Update seller's packages in DB
//     await dal.findOneAndUpdate(
//       sellerModel,
//       { _id: sellerDoc._id },
//       { $set: { packages: sellerDoc.packages } }
//     );
//   }

//   // 6️⃣ Validate total packages
//   if (sellerTotalPackages !== clientTotalPackages) {
//     return {
//       message: "Total client packages must match total seller packages",
//       status: 400,
//     };
//   }

//   // 7️⃣ Calculate client amount
//   const subtotalAmount = body.packages.reduce((sum, pkg) => {
//     const multiplier = pkg.calculation === "Quantal" ? 100 : 40;
//     return sum + ((Number(pkg.package) * pkg.weight) / multiplier) * pkg.rate;
//   }, 0);
//   const clientAmount = subtotalAmount + body.misleniousCharge;

//   const goodsData = { ...body, clientAmount };

//   // 8️⃣ Update client goods document
//   const updatedClientGoods = await dal.findOneAndUpdate(
//     model,
//     { _id: id },
//     { $set: goodsData },
//     { new: true }
//   );

//   return {
//     message: "Client Buyer Goods updated successfully",
//     status: 200,
//     data: updatedClientGoods,
//   };
// };


exports.update = async (id, body) => {
  const existing = await dal.findByID(model, id);
  if (!existing) {
    return { status: 400, message: "Client Buyer Goods not found" };
  }

  const clientGoodsId = id;

  // 1️⃣ Calculate client total packages
  const clientTotalPackages = body.packages.reduce(
    (sum, p) => sum + Number(p.package),
    0
  );

  let sellerTotalPackages = 0;

  // 2️⃣ Find ALL sellers containing this clientGoodsId
  const affectedSellers = await dal.find(sellerModel, {
    "packages.clientDetails.clientGoodsId": clientGoodsId,
  });

  // 3️⃣ Map sellers from request body for quick lookup
  const bodySellerMap = new Map();
  for (const seller of body.sellersDetails) {
    bodySellerMap.set(seller.sellerId.toString(), seller);
  }

  // 4️⃣ Process each affected seller
  for (const sellerDoc of affectedSellers) {
    const bodySeller = bodySellerMap.get(sellerDoc._id.toString());
    let subtotal = 0;

    for (const pkgDetails of sellerDoc.packages) {
      // 🔥 Always remove old clientGoodsId first
      pkgDetails.clientDetails = pkgDetails.clientDetails.filter(
        c => c.clientGoodsId.toString() !== clientGoodsId.toString()
      );

      // If seller exists in updated body
      if (bodySeller) {
        const updatedPkg = bodySeller.sellerPackages.find(
          p => p.packageId === pkgDetails._id.toString()
        );

        if (updatedPkg) {
          pkgDetails.clientDetails.push({
            clientGoodsId,
            soldPackages: Number(updatedPkg.package),
          });

          subtotal += Number(updatedPkg.package);
        }
      }

      // Recalculate remaining
      const totalSold = pkgDetails.clientDetails.reduce(
        (acc, c) => acc + Number(c.soldPackages || 0),
        0
      );

      pkgDetails.remaining = Number(pkgDetails.package) - totalSold;
    }

    sellerTotalPackages += subtotal;

    // 5️⃣ Persist seller update
    await dal.findOneAndUpdate(
      sellerModel,
      { _id: sellerDoc._id },
      { $set: { packages: sellerDoc.packages } }
    );
  }

  // 6️⃣ Validate package totals
  if (sellerTotalPackages !== clientTotalPackages) {
    return {
      status: 400,
      message: "Client & Seller package mismatch",
    };
  }

  // 7️⃣ Recalculate client amount
  const subtotalAmount = body.packages.reduce((sum, pkg) => {
    const multiplier = pkg.calculation === "Quantal" ? 100 : 40;
    return sum + ((pkg.package * pkg.weight) / multiplier) * pkg.rate;
  }, 0);

  const clientAmount = subtotalAmount + body.misleniousCharge;

  // 8️⃣ Update ClientBuyerGoods
  const updated = await dal.findOneAndUpdate(
    model,
    { _id: id },
    { $set: { ...body, clientAmount } },
    { new: true }
  );

  return {
    status: 200,
    message: "Client Buyer Goods updated successfully",
    data: updated,
  };
};


// exports.delete = async (id) => {
//   const deleteClientGoods = await dal.findOneAndDelete(model, { _id: id });
//   if (!deleteClientGoods) {
//     return {
//       message: "Client Buyer Goods not found",
//       status: 400,
//     };
//   }
//   return {
//     message: "Client Buyer Goods deleted successfully",
//     status: 200,
//   };
// };

exports.delete = async (id) => {
  // 1️⃣ Check if ClientBuyerGoods exists
  const existing = await dal.findByID(model, id);
  if (!existing) {
    return {
      status: 400,
      message: "Client Buyer Goods not found",
    };
  }

  const clientGoodsId = id;

  // 2️⃣ Find all sellers containing this clientGoodsId
  const affectedSellers = await dal.find(sellerModel, {
    "packages.clientDetails.clientGoodsId": clientGoodsId,
  });

  // 3️⃣ Rollback seller packages
  for (const sellerDoc of affectedSellers) {
    let sellerUpdated = false;

    for (const pkgDetails of sellerDoc.packages) {
      const beforeLength = pkgDetails.clientDetails.length;

      // Remove this clientGoodsId
      pkgDetails.clientDetails = pkgDetails.clientDetails.filter(
        c => c.clientGoodsId.toString() !== clientGoodsId.toString()
      );

      if (beforeLength !== pkgDetails.clientDetails.length) {
        sellerUpdated = true;
      }

      // Recalculate remaining
      const totalSold = pkgDetails.clientDetails.reduce(
        (acc, c) => acc + Number(c.soldPackages || 0),
        0
      );

      pkgDetails.remaining = Number(pkgDetails.package) - totalSold;
    }

    // Save only if changes happened
    if (sellerUpdated) {
      await dal.findOneAndUpdate(
        sellerModel,
        { _id: sellerDoc._id },
        { $set: { packages: sellerDoc.packages } }
      );
    }
  }

  // 4️⃣ Delete ClientBuyerGoods AFTER rollback
  await dal.findOneAndDelete(model, { _id: id });

  return {
    status: 200,
    message: "Client Buyer Goods deleted successfully",
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
