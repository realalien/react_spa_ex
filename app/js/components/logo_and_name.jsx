import React from 'react';
import Link from './link';

////////////////////////////////////////////////////////
//
//  Logo and Game Name
//  to keep same position for other components below the logo for each page
//  TODO: refactor out to the base layout
////////////////////////////////////////////////////////

class LogoAndName extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var imgStyle = {
      textAlign : "center"
    };

    var divStyle = {
      display: "inline-block",
      width : "100%",
      margin : "auto",
      marginTop: 10,
      textAlign : "center",
      marginBottom : 30
    };
    return (
      <div style={divStyle}>
        <Link to="/">
          <img style={imgStyle} src="../../image/logo.png"/>
        </Link>
      </div>
      ) ;
  }
}

module.exports = LogoAndName;
