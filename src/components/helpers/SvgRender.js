import React from 'react';
import { css } from 'react-emotion';

import ReactSVG from 'react-svg';

class SvgRender extends React.Component {
  render() {
    const { path, wrapperClassName, ...rest } = this.props;

    return (
      <ReactSVG
        path={path}
        className={`svg-wrap d-flex align-items-center ${wrapStyle}`}
        wrapperClassName={wrapperClassName ? wrapperClassName : ''}
        {...rest}
      />
    );
  }
}

export default SvgRender;

const wrapStyle = css`
  svg {
    height: inherit;

    * {
      transition: all 0.15s ease-in-out;
    }
  }
`;
