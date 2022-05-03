import setUpCustomerListeners from './customer';
import setUpDrSecretSGProductListeners from './dr-secret/sg-product';
import setupStoreListeners from './store';

const setupListeners = () => {
  setupStoreListeners();
  setUpCustomerListeners();
  setUpDrSecretSGProductListeners();
};

export default setupListeners;
