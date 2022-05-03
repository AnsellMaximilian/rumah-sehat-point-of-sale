import { ipcMain } from 'electron';
import SGProduct from '../../database/models/dr-secret/SGProduct';
import DrSecretSGProduct, {
  DrSecretSGProductCreateData,
} from '../../../shared/types/dr-secret/DrSecretSGProduct';

const setUpDrSecretSGProductListeners = () => {
  ipcMain.handle('dr-secret-sg-products:read', async () => {
    const drSecretSgProducts: DrSecretSGProduct[] = (
      await SGProduct.findAll()
    ).map((prod) => ({
      name: prod.name,
      priceSGD: prod.priceSGD,
      id: prod.id,
      deliveryFee: prod.deliveryFee,
      points: prod.points,
      createdAt: prod.createdAt,
      updatedAt: prod.updatedAt,
    }));
    return drSecretSgProducts;
  });

  ipcMain.handle('dr-secret-sg-products:delete', async (event, id: number) => {
    try {
      SGProduct.destroy({
        where: {
          id,
        },
      });
      event.sender.send('notify', `SGProduct of ID ${id} deleted.`, 'success');
      return true;
    } catch (error) {
      return false;
    }
  });

  ipcMain.handle(
    'dr-secret-sg-products:create',
    async (event, sgProductData: DrSecretSGProductCreateData) => {
      try {
        const newSGProduct = SGProduct.build(sgProductData);
        event.sender.send(
          'notify',
          `SGProduct "${sgProductData.name}" successfully created`,
          'success'
        );
        newSGProduct.save();
        return true;
      } catch (error) {
        return false;
      }
    }
  );

  ipcMain.handle(
    'dr-secret-sg-products:edit',
    async (event, id: number, sgProductData: DrSecretSGProductCreateData) => {
      try {
        SGProduct.update(sgProductData, {
          where: {
            id,
          },
        });
        event.sender.send(
          'notify',
          `SGProduct of ID "${id}" updated`,
          'success'
        );
        return true;
      } catch (error) {
        return false;
      }
    }
  );
};

export default setUpDrSecretSGProductListeners;
