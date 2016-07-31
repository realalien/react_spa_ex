import React from 'react';

var TextBelt = React.createClass({
  render : function() {
    var divStyle = {
      textAlign : "center",
      color: "white",
      backgroundColor: "rgba(0,0,0,0.2)",
      fontSize : 28,
      fontFamily : "Times New Roman, Times, serif",
      height: 40,
      marginBottom: 30,
      display: "table",
      width : "100%"
    };

    var spanStyle = {
      width : "100%",
      textAlign: "center",
      display: "table-cell",
      verticalAlign: "middle"
    }
    return (
      <div style={divStyle}>
        <span style={spanStyle}>{this.props.text}</span>
      </div>
    );
  }
});

export default TextBelt;
