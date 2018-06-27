import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class App extends Component {
  componentDidMount() {
    this.props.history.listen((location, action) => {
      window.scrollTo(0, 0);
    });
  }

  render() {
    return (
      <div className="content">
        <main id="main">{this.props.children}</main>
      </div>
    );
  }
}

export default withRouter(App);
