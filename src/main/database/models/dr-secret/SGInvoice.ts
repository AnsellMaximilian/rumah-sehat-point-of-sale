import {
  Model,
  DataTypes,
  Sequelize,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

class DrSecretSGInvoice extends Model<
  InferAttributes<DrSecretSGInvoice>,
  InferCreationAttributes<DrSecretSGInvoice>
> {
  declare id: CreationOptional<number>;

  declare date: Date;

  declare isWithCashback: boolean;

  declare isDeliveryFeeIndividual: boolean;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
}

export const initDrSecretSGInvoice = (database: Sequelize) => {
  DrSecretSGInvoice.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      isWithCashback: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      isDeliveryFeeIndividual: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },

      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      modelName: 'DrSecretSGInvoice',
      sequelize: database,
    }
  );
  DrSecretSGInvoice.sync({ alter: true })
    .then(() =>
      console.log('Dr. Secret Product table has been sucessfully synced.')
    )
    .catch(() =>
      console.log('Dr. Secret Product table has NOT been sucessfully synced.')
    );
};

export default DrSecretSGInvoice;
