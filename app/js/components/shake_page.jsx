import React from 'react';
////////////////////////////////////////////////////////
//
// Shake Page
//
////////////////////////////////////////////////////////
var ShakePage = React.createClass({

  getInitialState: function() {
    var myShakeEvent = new Shake({
        threshold: 15, // optional shake strength threshold
        timeout: 1000 // optional, determines the frequency of event generation
    });

    myShakeEvent.start();
    console.log("Shake started");

    return {
        event: myShakeEvent,
        hasShaked: false
    };
  },

  shakeEventDidOccur: function() {
    //put your own code here etc.
    console.log("Shake detected");
    alert("shaked!");
    if (hasShaked) {
      console.log("already shaked");
    } else {
      console.log("first shake, won't happen!");
      this.setState({hasShaked: true});
    }
  },

  componentDidMount: function() {
    window.addEventListener('shake', this.shakeEventDidOccur, false);
    console.log("Shake mounted ");
  },

  componentWillUnmount: function() {
    window.removeEventListener('shake', this.shakeEventDidOccur, false);
    console.log("Shake UN mounted ");
  },

  render: function(){
    var textStyle = {
      color : "yellow",
      fontSize : 21
    };

    var imgStyle = {
      display: "block",
      margin: "auto",
      marginTop: 75,
      width: "60%"
    };

    return (
      <div>
        <img style={imgStyle} src="../../image/shake.png"></img>
        <p style={textStyle}>Shake, Shake, Shake it</p>
      </div>
    );
  }
});


export default ShakePage;
