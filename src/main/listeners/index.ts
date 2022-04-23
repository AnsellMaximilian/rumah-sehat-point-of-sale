import setUpCustomerListeners from './customer';
import setupStoreListeners from './store';

const setupListeners = () => {
  setupStoreListeners();
  setUpCustomerListeners();
};

export default setupListeners;
