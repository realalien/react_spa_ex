import React from 'react';
import {Link as ReactLink} from 'react-router';

////////////////////////////////////////////////////////
//
//  Link Util : handling both react router links and external links
//  source : https://gist.github.com/shprink/bf9599e1d66b9dc4d151e89c1199ccb8
//  link: https://github.com/reactjs/react-router/issues/1147
////////////////////////////////////////////////////////
export default class Link extends React.Component {
  parseTo(to) {
    let parser = document.createElement('a');
    parser.href = to;
    return parser;
  }

  isInternal(toLocation) {
    return window.location.host === toLocation.host;
  }

  render() {
    const {to, children, ...rest} = this.props;
    const toLocation = this.parseTo(to);
    const isInternal = this.isInternal(toLocation);
    if (isInternal) {
      return (
        <ReactLink to={toLocation.pathname}>{children}</ReactLink>
      );
    } else {
      return (<a href={to} target="_blank" >{children}</a>);
    }
  }
}
