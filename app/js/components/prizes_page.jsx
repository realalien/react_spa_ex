import React from 'react';
import Link from './link';
////////////////////////////////////////////////////////
//
//  Prizes  (from Are's drafts, placeholder page )
//
////////////////////////////////////////////////////////
var PrizesPage = React.createClass({
  render: function(){
    var textStyle = {
        color: "yellow",
        fontSize : 21
    };

    return (
      <div>
        <div style={textStyle}>
           This page is placeholder page for  Prizes .
        </div>
      </div>
    );
  }
});

export default PrizesPage;
