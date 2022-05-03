import setUpCustomerListeners from './customer';
import setUpDrSecretIDProductListeners from './dr-secret/id-products';
import setUpDrSecretSGProductListeners from './dr-secret/sg-product';
import setupStoreListeners from './store';

const setupListeners = () => {
  setupStoreListeners();
  setUpCustomerListeners();
  setUpDrSecretSGProductListeners();
  setUpDrSecretIDProductListeners();
};

export default setupListeners;
