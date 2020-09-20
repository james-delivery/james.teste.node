module.exports = (sequelize, DataTypes) => {
  const Compensation = sequelize.define('Compensation', {
    id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    status: DataTypes.STRING,
    expected_payment_date: DataTypes.DATE,
    pagarme_recipient_id: DataTypes.INTEGER
  });

  return Compensation;
}