
import React from "react";
import ReactDOM from "react-dom";
import { Router,
      Route,
      IndexRoute,
      IndexLink,
      browserHistory,
      Link as ReactLink } from 'react-router';

import { createHistory, useBasename } from 'history';
// TODO: how to make it a non commonjs version?
var Shake = require('shake.js');

// import {LogoAndName} from './logo_and_name.jsx';

// NOTE: it looks like multiple components in one file causes some problems can hardly be solved
//  so keep all class in one file.
// import ResultsRow from './ResultsPage.jsx';


// TODO:
// * TODO: the asset of tile icon should be the same size,
//         otherwise the positions of itself and siblings are too complex
// * TODO: refactor the LogoAndName components to base layout component rather
//         than on every page component.
// * TODO: define API protocol for server data

var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;


////////////////////////////////////////////////////////
//
//  Link Util : handling both react router links and external links
//  source : https://gist.github.com/shprink/bf9599e1d66b9dc4d151e89c1199ccb8
//  link: https://github.com/reactjs/react-router/issues/1147
////////////////////////////////////////////////////////
export default class Link extends React.Component {
  parseTo(to) {
    let parser = document.createElement('a');
    parser.href = to;
    return parser;
  }
  isInternal(toLocation) {
    return window.location.host === toLocation.host;
  }

  render() {
    const {to, children, ...rest} = this.props;
    const toLocation = this.parseTo(to);
    const isInternal = this.isInternal(toLocation);
    if (isInternal) {
      return (<ReactLink to={toLocation.pathname} {...rest}>{children}</ReactLink>);
    } else {
      return (<a href={to} target="_blank" {...rest}>{children}</a>);
    }
  }
}

////////////////////////////////////////////////////////
//
//  Logo and Game Name
//  to keep same position for other components below the logo for each page
//  TODO: refactor out to the base layout
////////////////////////////////////////////////////////
var LogoAndName = React.createClass({
  render : function(){
    var imgStyle = {
      textAlign : "center"
    };

    var divStyle = {
      display: "inline-block",
      width : "100%",
      margin : "auto",
      marginTop: 10,
      textAlign : "center",
      marginBottom : 30
    };
    return(
      <div style={divStyle}>
        <Link to="/">
            <img style={imgStyle} src="../image/logo.png" />
        </Link>
      </div>
    );
  }
});


////////////////////////////////////////////////////////
//
//  Game Entrance  ( from Are's proposed design)
//
////////////////////////////////////////////////////////
var GameEntrance = React.createClass({
  render: function() {
    var divStyle = {
      display: "inline",
      width : "100%",
      margin : "auto",
      marginTop: 10
    };

    var spacingStyle = {
      display: "inline-block",
      width : x,
      margin : "auto",
      height: 20, // TODO: how to best fit for different size of screen?
      clear : "both"
    };

    return (
      <div>
        <LogoAndName />
        <div style={spacingStyle} />
        <Tile relPath="/leaderboard" isRound={false} imgUrl="../image/leaderboard.png" text="Leaderboard"/>
        <Tile relPath="/prizes" isRound={false} imgUrl="../image/prizes.png" text="Prizes"/>
        <div style={spacingStyle} />
        <Tile relPath="/races" isRound={true} imgUrl="../image/playbtn.png" text="" />
      </div>
    );
  }
});


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
        <LogoAndName />
        <div style={textStyle}>
           This page is placeholder page for  Prizes .
        </div>
      </div>
    );
  }
});


////////////////////////////////////////////////////////
//
//  Tile
//  Common util, tiles of menu item for the front pages, accept imgUrl
//
////////////////////////////////////////////////////////

var Tile = React.createClass({

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


////////////////////////////////////////////////////////
//
// Race choose page, (drafted by Jameson)
//
////////////////////////////////////////////////////////
var Entrance = React.createClass({
    render: function() {
    return (
      <div>
        <Tile text="Event Info" relPath="/event" />
        <Tile text="Races" relPath="/welcome" />
        <Tile text="Postcard" relPath="/share" />
        <Tile text="Coming Event" relPath="https://www.baidu.com"/>
      </div>
    );
  }
});


////////////////////////////////////////////////////////
//
// Race choose page, (designed by Are)
//
////////////////////////////////////////////////////////
var RaceChoosePage = React.createClass({
  getInitialState: function() {
    return { showHowto: true };
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
          <img style={closebtnStyle} src="../image/closebtn.png" onClick={this.closeBtnClicked}></img>
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
          <LogoAndName />
          <TextBelt text="Select your race"/>
          <div></div>
          <RaceSelectTable numOfCells={6}/>
        </div>

        {howItWorksNode}
      </div>
    );
  }
});

////////////////////////////////////////////////////////
//
// 4 HorseSelectPage , shake to get random horse (designed by Are)
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

  },

  render : function() {

    var divStyle = {
      textAlign : "center",
      display : "inline-block",
      // border : "2px blue solid",
    };

    var cells = [];
    var w = (x*0.5-10*2-10*6) / 3.0;
    console.log(w);
    for (var i=1; i <= this.props.numOfCells; i++) {
      cells.push(
        <div style={divStyle} onClick={this.handleRaceTile.bind(this, i, this.props)} key={i} >
          <Link to={"/race/" + i }>
            <RaceSelectTile width={w} text={i}/>
          </Link>
        </div>
      )
    }

    return (
      <div style={divStyle}>
        {cells}
      </div>
    );
  }
});


////////////////////////////////////////////////////////
//
// EventPage, static content
//
////////////////////////////////////////////////////////
var EventInfoPage = React.createClass({
  render: function(){
    var textStyle = {
        color: "yellow",
        fontSize : 21
    };

    return (
      <div style={textStyle}>
         Are you the prophet of your fortune? <br/>
         Collect the most points to win at the horse racing events!
      </div>
    );
  }
});


////////////////////////////////////////////////////////
//
// EventPage, static content
//
////////////////////////////////////////////////////////
var EventInfoPage = React.createClass({
  render: function(){
    var textStyle = {
        color: "yellow",
        fontSize : 21
    };

    return (
      <div style={textStyle}>
         Are you the prophet of your fortune? <br/>
         Collect the most points to win at the horse racing events!
      </div>
    );
  }
});


////////////////////////////////////////////////////////
//
// EventPage, static content
//
////////////////////////////////////////////////////////


var GameIntro = React.createClass({
  render: function(){
    var textStyle = {
        color: "yellow",
        fontSize : 21
    };

    return (
      <div style={textStyle}>
         Are you the prophet of your fortune? <br/>
         Collect the most points to win at the horse racing events!
      </div>
    );
  }
});








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
      <div style={textStyle}>
         This page is reserved for demo of Sharing via Weixin.
      </div>
    );
  }
});


////////////////////////////////////////////////////////
//
// Welcome, Menu items of Races, Leadboard,
//
////////////////////////////////////////////////////////
var Welcome = React.createClass({
  render: function() {
    return (
       <div>
        <Tile text="Races" relPath="/races" />
        <Tile text="Leaderboard" relPath="/leaderboard" />
        <Tile text="Results" relPath="/results" />
      </div>
    );
  }
});


////////////////////////////////////////////////////////
//
// Horse Races Listing Page, entrance for each match
// TODO: need to save horse already selected
//
////////////////////////////////////////////////////////

var RacesListingPage = React.createClass({

  // test a local races listing loading
  getInitialState: function() {
    return {
      races: []
    };
  },

  render: function() {

    var rows = [];

    this.state.races.map( function(race) {
      rows.push(<RaceTile race={race} />);
    }.bind(this));

    return (
      <div>
        {rows}
        <button onClick={this.demoAddRaces}>Clicked to add race</button>
      </div>
    );
  },

  demoAddRaces : function(){
    let racesDummy = [
       {seq: 1, name: "Race 1", status:"open", selected: true },
       {seq: 2, name: "Race 2", status:"closed", selected: true },
       {seq: 3, name: "Race 3", status:"ongoing", selected: true },
       {seq: 4, name: "Race 4", status:"open", selected: true },
       {seq: 5, name: "Race 5", status:"closed", selected: true },
       {seq: 6, name: "Race 6", status:"ongoing", selected: true },
    ];

    var existings = this.state.races;
    existings = existings.concat(racesDummy);
    this.setState({
     races: existings
   });
  }

});


var RaceTile = React.createClass({
  render : function() {
    var tileStyle = {
        height:  y * 0.2 ,
        width:  x * 0.4 ,
        padding: 0,
        margin: 20,
        textAlign: "center",
        color: "#8D744B",
        backgroundColor: "#222c40",
        fontFamily:"GurmukhiMN",
        fontSize: 32,
        display : 'inline-block',
        WebkitFilter: "drop-shadow(0px 0px 5px #666)",
        filter: "drop-shadow(0px 0px 5px #666)"
      };

    return (
      <div style={tileStyle}>

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

var RaceDetailPage = React.createClass({
  handleHorseBtn : function(i, props) {
      alert("parent hanlder received btn :  " + i + " , this.state.raceId: " + this.state.raceId  );

      // reload selections, as { <raceid> : <horseid> }
      var racesAlreadyDoneSelection = this.state.racesDidSelected;
      racesAlreadyDoneSelection[this.state.raceId] = i;

      // read localstorage example
      console.log("JSON output: "+ JSON.stringify(racesAlreadyDoneSelection));
      // save to localstorage
      localStorage.setItem('racesDidSelected', JSON.stringify(racesAlreadyDoneSelection));
      // TODO: temp code, check
      var check = JSON.parse(localStorage.getItem('racesDidSelected')) || {}
      console.log("in handleHorseBtn, check selection in storage: " + check);
      // Q: when to clean this?

      // update state
      this.setState({ racesDidSelected: racesAlreadyDoneSelection });
      // TODO: check state
      var check2 = this.state.racesDidSelected || {}
      console.log("in handleHorseBtn, check selection in state : " + check2);
  },

  // TODO: define const key for localstorage's key
  getInitialState: function() {

    // load from storage
    var racesDidSelected = JSON.parse(localStorage.getItem('racesDidSelected')) || {}

    console.log("in getInitialState, racesDidSelected : " + JSON.stringify(racesDidSelected));


    return {
      raceId : "123",  // TODO: temp code, supposed to read from params (if empty, prompts no race on selection)
      racesDidSelected : racesDidSelected

    };
  },

  componentWillUnmount: function() {
  },

  render : function(){
    // create array of button for selection, and save the btn index
    var horses = [];

    var divStyle = {
      display: "inline"
    }

    for (var i=1; i<= 20; i++){
      var str = "Horse #"+i;
      horses.push(
        <div style={divStyle} onClick={this.handleHorseBtn.bind(this, i, this.props)} key={i} >
          <HorseBtn text={str} value={i}/>
        </div>
      );
    }



    return (
      <div>
        {horses}
      </div>

    );

  }
});





////////////////////////////////////////////////////////
//
// Leadboard
//
////////////////////////////////////////////////////////

var LeadboardRow = React.createClass({
  render : function() {
    {/* TODO: compare with user info, for now always the first row. */}
    var rowStyle = this.props.leader.seq == 1 ?
      {
          backgroundColor : "yellow",
          color : "green",
          width : "90%",
          textAlign : "center",
          height: 28,
	      fontSize: 16
      } :
      {
          backgroundColor : "white",
          color : "black",
          width : "90%",
          textAlign : "center",
          height: 28,
          fontSize: 16
      };
    var columnStyle_20 = {
    	width : "20%"
    };
    var columnStyle_30 = {
    	width : "30%"
    };
    var columnStyle_60 = {
    	width : "60%"
    };
    return (
      <tr style={rowStyle}>
        <td style={columnStyle_20}>{this.props.leader.seq}</td>
        <td style={columnStyle_60} >{this.props.leader.name}</td>
        <td style={columnStyle_30}>{this.props.leader.points}</td>
      </tr>
    );
  }
});

var LeadboardTable = React.createClass({
  render: function() {
    var tableStyle = {
      width: "90%",
      height : "90%",
      margin: 20,
      backgroundColor: "#222c40",
      fontFamily:"GurmukhiMN",
      fontSize: 21
    };

    var tableHeaderStyle = {
      textAlign: "center",
      fontSize:21,
      color: "#8D744B",
      height: 15
    };

    var rows = [];

  	{/* TODO: */}
    this.props.leaders.map( function(leader) {
      rows.push(<LeadboardRow leader={leader} />);
    }.bind(this));

    return (
      <table style={tableStyle} >
        <thead>

        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});



var theLeaders = [
  { seq : 1, name : "Daemon", points : 120},
  { seq : 2, name : "Jasmine", points : 100},
  { seq : 3, name : "Jasmine1", points : 100},
  { seq : 4, name : "Jasmine2", points : 100},
  { seq : 5, name : "Daemon3", points : 120},
  { seq : 6, name : "Jasmine4", points : 100},
  { seq : 7, name : "Jasmine5", points : 100},
  { seq : 8, name : "Jasmine6", points : 100},
  { seq : 9, name : "Daemon7", points : 120},
  { seq : 10, name : "Jasmine8", points : 100},
  { seq : 11, name : "Jasmine9", points : 100},
  { seq : 12, name : "Jasmine10", points : 100}
];


var Leaderboard = React.createClass({
  render: function() {
    return (
      <div>
        <LogoAndName />
        <LeadboardTable leaders={theLeaders} />
      </div>
    );
  }
});


////////////////////////////////////////////////////////
//
// Results
//
////////////////////////////////////////////////////////
var races= [
	{ seq : 1, name : "Race #1", status : "closed"},
  { seq : 2, name : "Race #2", status : "ongoing"},
  { seq : 3, name : "Race #3", status : "open"},
  { seq : 4, name : "Race #4", status : "closed"},
  { seq : 5, name : "Race #5", status : "ongoing"},
  { seq : 6, name : "Race #6", status : "open"},
];


var ResultsRow = React.createClass({
	rowClicked : function (e){
    	console.log(this.props.race);
      if ( this.props.race.status === "open") {
        alert("The race has not started.");
      } else if ( this.props.race.status === "ongoing") {
        alert("Keep watching! ");
      } else {
        alert("Ready to see the result?!");
      }
  },

	render: function() {
		var bgColor = "";

		  switch( this.props.race.status ) {
		    case 'closed':
		      bgColor = "grey";
		      break;
		    case 'ongoing':
		      bgColor = "green";
		      break;
		    case 'open':
		    	bgColor = "yellow";
		    	break;
		    default:
		      return "black";
		  };


		var rowStyle = {
			backgroundColor : bgColor,
			width : "90%",
			// {/*height : 28,  */}
			fontSize: 21,
      textAlign : "center",
      height : 21
		};

		var buttonStyle = {
        width: "100%",
        margin: 0,
        fontFamily:"GurmukhiMN",
        lineHeight: "100%",
        fontSize: 21,
        color:"#8D744B",
        backgroundColor: "transparent"
      };

		return (
			<tr style={rowStyle}>
        <td>
        	<button style={buttonStyle} onClick={this.rowClicked}>{this.props.race.name}</button>
        </td>
      </tr>
		);
	}
});

var ResultsTable = React.createClass({
  render: function() {
    var tableStyle = {
      width: "90%",
      height : "90%",
      margin: 20,
      backgroundColor: "#222c40",
      fontFamily:"GurmukhiMN",
      fontSize: 21
    };

    var tableHeaderStyle = {
      textAlign: "center",
      fontSize:21,
      color: "#8D744B",
      height: 15
    };

    var rows = [];


  	{/* TODO: */}
    this.props.races.map( function(race) {
      rows.push(<ResultsRow race={race} />);
    }.bind(this));

    return (
      <table style={tableStyle} >
        <thead>

        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
});


var Results = React.createClass({
  render: function() {
		return (
				<ResultsTable races={races}/>
		);
  }
});


////////////////////////////////////////////////////////
//
// Races Results, just listing for each race match, better if within one page, not subcomponent
//
////////////////////////////////////////////////////////

var RaceDetail = React.createClass({
  render: function() {
    var textStyle = {
      color : "yellow",
      fontSize : 21
    };
    return (
      <div><p style={textStyle}>This is starting point! This page will looks similar to the leadboard listing, impl. later</p></div>
    );
  }
});


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
        <img style={imgStyle} src="../image/shake.png"></img>
        <p style={textStyle}>Shake, Shake, Shake it</p>
      </div>
    );
  }
});




////////////////////////////////////////////////////////
//
// App
//
////////////////////////////////////////////////////////

var App = React.createClass({
  render: function() {
    return (
      <div>
        <ul className="header">
          {/*<li><Link to="/">Entrances</Link></li>*/}


          {/*<li><Link to="/welcome">Welcome</Link></li>
          <li><Link to="/leadboard">Leadboard</Link></li>
          <li><Link to="/results">Results</Link></li>
          <li><Link to="/racedetail">Race Detail</Link></li>
          <li><Link to="/shake">Shake Demo</Link></li>
          <li><Link to="/race">Race Detail Page</Link></li>*/}

        </ul>
        <div className="content">
          {this.props.children}
        </div>
      </div>
    );
  }
});


ReactDOM.render(
   <Router>
    <Route path="/" component={App}>
      <IndexRoute component={GameEntrance}/>
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/prizes" component={PrizesPage} />
      <Route path="/intro" component={GameIntro} />
      <Route path="/races" component={RaceChoosePage} />
      <Route path="/race/:raceId" component={HorseSelectPage} />
    </Route>
  </Router>,
  document.querySelector("#container")
);
