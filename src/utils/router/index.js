import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Router, Switch, Route } from 'react-router-dom';

import ContentWrapper from '../../components/layouts/ContentWrapper';
import RenderRoute from './routes';
import Home from '../../views';
import NotFound from '../../views/NotFound';

const mergedRoutes = [];

class AppRouter extends Component {
  render() {
    return (
      <Router history={this.props.history}>
        <ContentWrapper>
          <Switch>
            {mergedRoutes.map((route, i) => <RenderRoute key={i} {...route} />)}

            <RenderRoute exact path="/" component={Home} />
            <Route component={NotFound} />
          </Switch>
        </ContentWrapper>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

export default connect(mapStateToProps, {})(AppRouter);
