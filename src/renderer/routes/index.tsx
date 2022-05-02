import {
  Routes as RouteList,
  MemoryRouter as Router,
  Route,
} from 'react-router-dom';
import MainLayout from 'renderer/layout';
import Settings from 'renderer/views/Settings';
import CustomersView from 'renderer/views/Customers';

const Routes = () => {
  return (
    <Router>
      <RouteList>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<h1>TETS 1</h1>} />
          <Route path="/customers" element={<CustomersView />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/dr-secret/products" element={<Settings />} />
        </Route>
      </RouteList>
    </Router>
  );
};

export default Routes;
