import { Model, DataTypes, Sequelize } from 'sequelize';

class Customer extends Model {}

// Customer.init(
//   {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },

//     phone: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },

//     address: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//   },
//   {
//     modelName: 'Customer',
//     sequelize: database,
//   }
// );

export const initCustomer = (database: Sequelize) => {
  Customer.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      modelName: 'Customer',
      sequelize: database,
    }
  );
  Customer.sync({ alter: true })
    .then(() => console.log('Customer table has been sucessfully synced.'))
    .catch(() =>
      console.log('Customer table has NOT been sucessfully synced.')
    );
};

export default Customer;
