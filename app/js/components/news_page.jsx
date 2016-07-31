import React from 'react';
import LogoAndName from './logo_and_name';

////////////////////////////////////////////////////////
//
//  News  (from Are's drafts, placeholder page )
//
////////////////////////////////////////////////////////
var NewsPage = React.createClass({
  render: function(){
    var textStyle = {
        color: "yellow",
        fontSize : 21
    };

    return (
      <div>
        <LogoAndName />
        <div style={textStyle}>
           This page is placeholder page for News .
        </div>
      </div>
    );
  }
});


export default NewsPage;
