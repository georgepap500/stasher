import React from 'react';
import { Route } from 'react-router-dom';
import App from '../../../components/layouts/App';

const RenderRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      return (
        <App>
          <Component {...props} />
        </App>
      );
    }}
  />
);

export default RenderRoute;
