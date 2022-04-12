import {
  Routes as RouteList,
  MemoryRouter as Router,
  Route,
} from 'react-router-dom';
import MainLayout from 'renderer/layout';

const Routes = () => {
  return (
    <Router>
      <RouteList>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<h1>TETS 1</h1>} />
          <Route path="/fag" element={<h1>Fag 1</h1>} />
        </Route>
      </RouteList>
    </Router>
  );
};

export default Routes;
