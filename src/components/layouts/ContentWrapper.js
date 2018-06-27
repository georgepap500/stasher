import React, { Component } from 'react';
import 'assets/scss/main.scss';

import { withRouter } from 'react-router-dom';

class ContentWrapper extends Component {
  render() {
    return <div className="content-wrapper">{this.props.children}</div>;
  }
}

export default withRouter(ContentWrapper);
