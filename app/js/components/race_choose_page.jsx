import React from 'react';
import TextBelt from './textbelt';
import Link from './link';

var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;

////////////////////////////////////////////////////////
//
// Race choose page, (designed by Are)
//
////////////////////////////////////////////////////////
var RaceSelectTile = React.createClass({
  render : function() {
    var w = this.props.width;
    var divStyle = {
      width : w ,
      height : w,
      display : "inline-block",
      borderRadius : 4,
      backgroundColor : "rgba(218, 33, 39, 0.74)",
      margin:20,
      fontSize: 38,
      fontFamily: 'GurmukhiMN',
      color: "white",
      padding : "20px 20px 20px 20px",
      // border : "2px green dashed"
    };
    return (
      <div style={divStyle}>{this.props.text}</div>
    );
  }
});

var RaceSelectTable = React.createClass({
  handleRaceTile : function(i, props) {
    // nothing to do
  },

  render : function() {
    var divStyle = {
      textAlign : "center",
      display : "inline-block",
      // border : "2px blue solid",
    };

    var cells = [];
    var w = (x*0.5-10*2-10*6) / 3.0;
    for (var i=1; i <= this.props.numOfCells; i++) {
      cells.push(
        <div style={divStyle} onClick={this.handleRaceTile.bind(this, i, this.props)} key={i} >
          <Link to={"/race/" + i }>
            <RaceSelectTile width={w} text={i}/>
          </Link>
        </div>
      )
    }

    if (this.props.numOfCells.length > 0) {
      return (
        <div style={divStyle}>
          {cells}
        </div>
      );
    } else {
      return  (
        <div>
          <TextBelt text="No races currently!"/>
        </div>
      );
    }
  }
});


var dummyData = [
  {id: "1", name: "1", status: "closed"},
  {id: "2", name: "2", status: "open"},
  {id: "3", name: "3", status: "selected"},
  {id: "4", name: "4", status: "closed"},
  {id: "5", name: "5", status: "open"},
  {id: "6", name: "6", status: "selected"}
];

var RaceChoosePage = React.createClass({
  getInitialState: function() {
    return {
      url: "/api/races", // TODO: temp code, should passed from this.props
      pollInterval: 5000,
      showHowto: true,
      races: []
    };
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.state.pollInterval);
  },

  loadCommentsFromServer: function() {
    console.log("loadCommentsFromServer");

    $.ajax({
      url: this.state.url, //this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({races: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.state.url, status, err.toString());
      }.bind(this)
    });
  },


  closeBtnClicked : function() {
    this.setState({ showHowto: false });
  },

  render : function() {
    /////////////////// overlay  /////////////
    var overlayStyle = {
      width : "90%",
      height : "70%",
      marginLeft : "5%",
      marginRight : "5%",
      borderRadius : 5,
      backgroundColor: "rgba(218, 33, 39, 1)",
      textAlign : "center",
      color : "white",
      position : "absolute",
      top : 70,
      marginTop: "12%",
      zIndex : 9999
    };

    var closebtnStyle = {
      float: "right",
      marginTop : 10,
      marginRight : 10
    };

    var textContainerStyle ={
      clear: "both"
    };

    var howItWorksNode = "";
    if ( this.state.showHowto === true) {
      howItWorksNode = (
        <div style={overlayStyle} onClick={this.closeBtnClicked}>
          <img style={closebtnStyle} src="../../image/closebtn.png" onClick={this.closeBtnClicked}></img>
          <div style={textContainerStyle}>
            <h1>How it works</h1>
            <p>Blah blah blah ... Blah blah blah ... Blah blah blah ... </p>
          </div>
        </div>
      );
    } else {
      howItWorksNode = "";
    }

    return (
      <div>
        <div>
          <TextBelt text="Select your race"/>
          <div></div>
          <RaceSelectTable numOfCells={this.state.races.length}/>
        </div>

        {howItWorksNode}
      </div>
    );
  }
});





export default RaceChoosePage;
