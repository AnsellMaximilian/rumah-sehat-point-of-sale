import {
  Routes as RouteList,
  MemoryRouter as Router,
  Route,
} from 'react-router-dom';
import MainLayout from 'renderer/layout';
import Settings from 'renderer/views/Settings';
import CustomersView from 'renderer/views/Customers';
import SGProducts from 'renderer/views/DrSecret/SGProduct';
import IDProducts from 'renderer/views/DrSecret/IDProduct';
import { SGInvoiceForm } from 'renderer/views/DrSecret/SGInvoice';

const Routes = () => {
  return (
    <Router>
      <RouteList>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<h1>TETS 1</h1>} />
          <Route path="/customers" element={<CustomersView />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/dr-secret/sg-products" element={<SGProducts />} />
          <Route path="/dr-secret/id-products" element={<IDProducts />} />
          <Route path="/dr-secret/sg-invoice" element={<SGInvoiceForm />} />
        </Route>
      </RouteList>
    </Router>
  );
};

export default Routes;
