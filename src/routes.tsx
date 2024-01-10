import Info from 'examples/users/info';
import { Routes as Switch, Route } from 'react-router-dom';

interface RoutesProps {}

const Routes = (props: RoutesProps) => {
  <div>
    <Switch>
      <Route path="/:gameId" element={<Info />} />
    </Switch>
  </div>;
};

export default Routes;
