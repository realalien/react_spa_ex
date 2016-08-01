import React from 'react';
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
        <div style={textStyle}>
           This page is placeholder page for  Prizes .
        </div>
      </div>
    );
  }
});


export default PostcardPage;
