import React from 'react';
import TextBelt from './textbelt';
import LogoAndName from './logo_and_name';

var Shake = require('shake.js');
////////////////////////////////////////////////////////
//
// HorseSelectPage , shake to get random horse (designed by Are)
//
////////////////////////////////////////////////////////
var HorseSelectPage = React.createClass({

  getInitialState : function() {
    var myShakeEvent = new Shake({
        threshold: 15, // optional shake strength threshold
        timeout: 1000 // optional, determines the frequency of event generation
    });

    return {
        event: myShakeEvent,
        hasShaked: false,
        hasSelectedHorse: false,  // NOTE: watch out for shaked but no horse selected! selection interrupted by componentUnmounting
        raceId : ""
    };
  },

  shakeEventDidOccur: function() {
    //put your own code here etc.
    console.log("Shake detected");
    alert("shaked!");
    if (this.state.hasShaked === true) {
      console.log("already shaked");
      // TODO: prevent mingling events/activities

    } else {
      console.log("first shake, won't happen later!");
      this.setState({hasShaked: true}); // default should not shake
    }
  },

  checkShakeState : function(){
    // test if we can read the state
    if ( this.state.hasShaked === true) {
      console.log("checkShakeState, has Shaked  :  true ");
    } else {
      console.log("checkShakeState, has Shaked  :  false ");
    }
  },

  saveHorseSelection : function(horseId) {
    console.log("------------   saveHorseSelection ------------ ");
    // load from storage
    var racesDidSelected = JSON.parse(localStorage.getItem('racesDidSelected')) || {}
    console.log("checking racesDidSelected : " + JSON.stringify(racesDidSelected));

    // add new entry
    racesDidSelected[this.state.raceId] = horseId;

    // save back to storeage
    localStorage.setItem('racesDidSelected', JSON.stringify(racesDidSelected));
    // TODO: temp code, check
    var check = JSON.parse(localStorage.getItem('racesDidSelected')) || {}
    console.log("in handleHorseBtn, check selection in storage: " + check);
  },

  getSelectedHorse : function(){
    var racesDidSelected = JSON.parse(localStorage.getItem('racesDidSelected')) || {};
    return racesDidSelected[this.state.raceId];
  },

  componentWillMount: function() {
     // SUG: make sure all the states are correct before rendering
     console.log("------------   componentWillMount ------------ ");
    //  this.checkShakeState();

    // check if user already shaked(selected a target horse for the race) or not.
    // load from storage
    var racesDidSelected = JSON.parse(localStorage.getItem('racesDidSelected')) || {}
    console.log("checking racesDidSelected : " + JSON.stringify(racesDidSelected));


    // update hasShaked property and raceId (from params)
    var id = this.props.params.raceId;
    console.log( "checking raceId from params: " + this.props.params.raceId );
    this.setState({raceId: id});

    // TODO: should check if the raceId is permitted, server check!


    var idInString = id.toString();
    if ( idInString in racesDidSelected && racesDidSelected[idInString] !== "" ){
      this.setState({hasShaked : true, hasSelectedHorse : true});
      console.log("[INFO] seems has selected horse before");
    } else {
      this.setState({hasShaked : false, hasSelectedHorse : false });
      console.log("[INFO] seems has NOT select horse before");
    }

    // e.g. if user already shake for the specific race,
    //      then, no shake event should be mounted
    //      and,  shaking hands icons should not be displayed.
    if ( this.state.hasShaked === false) {
     window.addEventListener('shake', this.shakeEventDidOccur, false);
     console.log("Shake mounted ");
    }

  },

  componentDidMount: function () {
    console.log("------------   componentDidMount ------------ ");

    this.state.event.start();
    console.log("Shake gadget started");
  },

  componentWillUnmount: function() {
    this.state.event.stop();

    window.removeEventListener('shake', this.shakeEventDidOccur, false);
    console.log("Shake UN mounted ");
  },

  handleHorseBtn : function(i, props) {
    console.log(" ------------   handleHorseBtn   --------------  "+i);

    this.setState({hasSelectedHorse : true});
    this.saveHorseSelection(i);
  },

  clickForShakeDemo : function() {
    console.log(" ------------   clickForShakeDemo   -------------- called ");
    this.shakeEventDidOccur();
  },

  render : function() {
    console.log("in render ......");
    var symbolShakeNode = "";
    var horsesForSelectionNode = "";
    if ( this.state.hasShaked === false ) {  // render shake symobol
      var divStyle = {
        textAlign : "center",
        // border : "2px dashed green"
      }
      var textStyle = {
        color : "white",
        fontSize : 28,
        fontFamily : "Times New Roman, Times, serif",
      };

      var imgStyle = {
        display: "block",
        margin: "auto",
        marginTop: 20,
        marginBottom : 20,
        width: "30%"
      };

      symbolShakeNode = (
        <div style={divStyle}>
          <img style={imgStyle} onClick={this.clickForShakeDemo} src="../image/shake.png"></img>
          <p style={textStyle}>Shake to receive</p>
          <p style={textStyle}>your selection!</p>
        </div>
      );
    } else { // has shaked

      if ( this.state.hasSelectedHorse === true) { // render selection anim or process
        var textStyle = {
          color : "white",
          fontSize : 28,
          fontFamily : "Times New Roman, Times, serif"
        } ; // TODO: the code is unreadable!
        var notice = "You already selected horse! Her name is " + this.getSelectedHorse()
        horsesForSelectionNode = (
          <div style={divStyle}>
            <p style={textStyle}>{notice}</p>
          </div>
        );
      } else { // shaked but not done random selection

        // create array of button for selection, and save the btn index
        var horses = [];

        var divStyle = {
          display: "inline",
          marginTop : 30
        }

        for (var i=1; i<= 20; i++){
          var str = "Horse #"+i;
          horses.push(
            <div style={divStyle} onClick={this.handleHorseBtn.bind(this, i, this.props)} key={i} >
              <HorseBtn text={str} value={i}/>
            </div>
          );
        }

        horsesForSelectionNode = (
           <div>{horses}</div>
        );
      }
    }

    var strForTextBelt =  "Race #" + this.state.raceId;
    return (
      <div>
        <LogoAndName />
        <TextBelt text={strForTextBelt} />
        <div></div>
        {symbolShakeNode}
        {horsesForSelectionNode}
      </div>

    );
  }
});


////////////////////////////////////////////////////////
//
// Horse Races Detail Page, showing user's selection ( or shake to select )
//
////////////////////////////////////////////////////////

// demo of random selection horse , now without animation
var HorseBtn = React.createClass({
  handleClick : function(e) {
    alert(this.props.value)
    //this.props.parentHandler(this.props.value);
  },

  render : function() {
    var style = {
      width : 50,
      height: 50,
      color: "white",
      backgroundColor : "black",
      display : 'inline-block',
      margin: 10
    };

    return (
      <button style={style} onClick={this.handleClick}>
        {this.props.text}
      </button>
    );
  }
});

export default HorseSelectPage;
