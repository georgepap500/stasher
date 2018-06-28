import React, { Component } from 'react';

import StashPoints from '../stashPoints/StashPoints';

class Home extends Component {
  render() {
    return (
      <div className="home-wrapper d-flex justify-content-center align-items-top">
        <StashPoints />
      </div>
    );
  }
}

export default Home;
