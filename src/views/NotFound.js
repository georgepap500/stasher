import React, { Component } from 'react';

class NotFound extends Component {
  handleRedirectBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <div className="home-wrapper d-flex align-items-center justify-content-center">not found</div>
    );
  }
}

export default NotFound;
