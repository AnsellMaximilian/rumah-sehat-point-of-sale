import {
  Model,
  DataTypes,
  Sequelize,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

class DrSecretIDProduct extends Model<
  InferAttributes<DrSecretIDProduct>,
  InferCreationAttributes<DrSecretIDProduct>
> {
  declare id: CreationOptional<number>;

  declare name: string;

  declare priceRP: number;

  declare points: number;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
}

export const initDrSecretIDProduct = (database: Sequelize) => {
  DrSecretIDProduct.init(
    {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      priceRP: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      points: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      modelName: 'DrSecretIDProduct',
      sequelize: database,
    }
  );
  DrSecretIDProduct.sync({ alter: true })
    .then(() =>
      console.log('Dr. Secret ID Product table has been sucessfully synced.')
    )
    .catch(() =>
      console.log(
        'Dr. Secret ID Product table has NOT been sucessfully synced.'
      )
    );
};

export default DrSecretIDProduct;
