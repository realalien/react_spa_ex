import React from 'react';

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
        <div style={textStyle}>
           This page is placeholder page for News .
        </div>
    );
  }
});


export default NewsPage;
