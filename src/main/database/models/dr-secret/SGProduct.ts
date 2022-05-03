import {
  Model,
  DataTypes,
  Sequelize,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from 'sequelize';

class DrSecretSGProduct extends Model<
  InferAttributes<DrSecretSGProduct>,
  InferCreationAttributes<DrSecretSGProduct>
> {
  declare id: CreationOptional<number>;

  declare name: string;

  declare priceSGD: number;

  declare points: number;

  declare createdAt: CreationOptional<Date>;

  declare updatedAt: CreationOptional<Date>;
}

export const initDrSecretSGProduct = (database: Sequelize) => {
  DrSecretSGProduct.init(
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

      priceSGD: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },

      points: {
        type: DataTypes.NUMBER,
        allowNull: false,
      },
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      modelName: 'DrSecretSGProduct',
      sequelize: database,
    }
  );
  DrSecretSGProduct.sync({ alter: true })
    .then(() =>
      console.log('Dr. Secret Product table has been sucessfully synced.')
    )
    .catch(() =>
      console.log('Dr. Secret Product table has NOT been sucessfully synced.')
    );
};

export default DrSecretSGProduct;
