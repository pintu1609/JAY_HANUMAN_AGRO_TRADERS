module.exports = {
  table: "broker",
  primaryKey: "id",
  foreignKeys: {
    user_id: {
      references: "users(id)",
    },
  },
  columns: [
    "id",
    "userId",
    "name",
    "email",
    "phone",
    "paymentCalculation",
    "paymentValue",
    "createdAt",
    "updatedAt",
  ],
};
