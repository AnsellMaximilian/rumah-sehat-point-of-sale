import {
  Routes as RouteList,
  Route,
  MemoryRouter as Router,
} from 'react-router-dom';

const Routes = () => {
  return (
    <Router>
      <RouteList>
        <Route path="/" element={<h1>test</h1>} />
      </RouteList>
    </Router>
  );
};

export default Routes;
