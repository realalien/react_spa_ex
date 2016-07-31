import React from 'react';
import LogoAndName from './logo_and_name';
////////////////////////////////////////////////////////
//
// PostcardPage, modify content to share via weixin
//
////////////////////////////////////////////////////////
var PostcardPage = React.createClass({
  render: function(){
    var textStyle = {
        color: "yellow",
        fontSize : 21
    };

    return (
      <div>
        <LogoAndName />
        <div style={textStyle}>
           This page is placeholder page for  Prizes .
        </div>
      </div>
    );
  }
});


export default PostcardPage;
