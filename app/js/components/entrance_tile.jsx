import React from 'react';
import Link from './link';

////////////////////////////////////////////////////////
//
//  Entrance Tile
//   tiles of menu item for the front pages, accept imgUrl
//
////////////////////////////////////////////////////////

var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;

var EntranceTile = React.createClass({

  _clickHandler : function() {
        /*
        Here you could add some validation that you truly have a callback in your props.
        if(_(this.props.clickHandler).isFunction() ) {
        }
        */
        this.props.clickHandler();
    },

  render: function() {
    var borderRadius = ( this.props.isRound === true ? "50%" : 5 ) ;
    var tileStyle = {
      height:  x * 0.40 ,
      width:  x * 0.40 ,
      padding: "auto",
      margin: 10,
      textAlign: "center",
      color: "white",
      backgroundColor: "rgba(218, 33, 39, 0.74)", // "#DA2127",
      display : 'inline-block',
      borderRadius : borderRadius,
      //background: 'url(' + this.props.imgUrl + ') no-repeat center center fixed',
    };

    var linkStyle = {
      display: "table",
      width : "100%",
      height : "100%",
      // border : "2px dashed green",
      float: "right",
      textAlign : "center"
    };

    var tableWrappingStyle = {
      width : "100%",
      height : "100%",
      display: "table",
      overflow: "hidden",
      // border : "2px green dashed"
    };

    var cellWrappingStyle = {
      display: "table-cell",
      verticalAlign: "middle",
      textAlign: "center",
      // border : "2px brown solid",
    };

    var imgStyle = {
      display: "inline-block",
      // border : "2px red solid",
    };

    var rowWrappingStyle = {
      display: "table-row",
      textAlign : "center",
      // border : "2px black dashed",
      width : x * 0.40,
      margin : "auto",
      position: "relative",
      bottom: 10
    };

    var spanStyle = {
      fontSize : 20,
      textAlign : "center",
      // border : "2px yellow dashed",
      width : x * 0.40,
      position: "relative",
      bottom: 0
    };

    var spanText = ""
    if (this.props.text !== "") {
      spanText = <p style={spanStyle} >{this.props.text}</p>
    }

    return (
      <div style={tileStyle}>
        <Link style={linkStyle} to={this.props.relPath}>
          <div style={tableWrappingStyle}>
            <div style={cellWrappingStyle}>
              <img style={imgStyle} src={this.props.imgUrl}/>
              <div style={rowWrappingStyle}>
                {spanText}
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
});


export default EntranceTile;
