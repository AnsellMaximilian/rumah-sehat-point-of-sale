import { ipcMain } from 'electron';
import IDProduct from '../../database/models/dr-secret/IDProduct';
import DrSecretIDProduct, {
  DrSecretIDProductCreateData,
} from '../../../shared/types/dr-secret/DrSecretIDProduct';

const setUpDrSecretIDProductListeners = () => {
  ipcMain.handle('dr-secret-id-products:read', async () => {
    const drSecretSgProducts: DrSecretIDProduct[] = (
      await IDProduct.findAll()
    ).map((prod) => ({
      name: prod.name,
      priceRP: prod.priceRP,
      id: prod.id,
      points: prod.points,
      createdAt: prod.createdAt,
      updatedAt: prod.updatedAt,
    }));
    return drSecretSgProducts;
  });

  ipcMain.handle('dr-secret-id-products:delete', async (event, id: number) => {
    try {
      IDProduct.destroy({
        where: {
          id,
        },
      });
      event.sender.send('notify', `IDProduct of ID ${id} deleted.`, 'success');
      return true;
    } catch (error) {
      return false;
    }
  });

  ipcMain.handle(
    'dr-secret-id-products:create',
    async (event, sgProductData: DrSecretIDProductCreateData) => {
      try {
        const newIDProduct = IDProduct.build(sgProductData);
        event.sender.send(
          'notify',
          `IDProduct "${sgProductData.name}" successfully created`,
          'success'
        );
        newIDProduct.save();
        return true;
      } catch (error) {
        return false;
      }
    }
  );

  ipcMain.handle(
    'dr-secret-id-products:edit',
    async (event, id: number, sgProductData: DrSecretIDProductCreateData) => {
      try {
        IDProduct.update(sgProductData, {
          where: {
            id,
          },
        });
        event.sender.send(
          'notify',
          `IDProduct of ID "${id}" updated`,
          'success'
        );
        return true;
      } catch (error) {
        return false;
      }
    }
  );
};

export default setUpDrSecretIDProductListeners;
