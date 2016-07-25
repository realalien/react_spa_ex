
import React from "react";
import ReactDOM from "react-dom";
import { Router,
      Route,
      IndexRoute,
      IndexLink,
      browserHistory,
      Link } from 'react-router';

import { createHistory, useBasename } from 'history';
// TODO: how to make it a non commonjs version?
var Shake = require('shake.js');

// NOTE: it looks like multiple components in one file causes some problems can hardly be solved
//  so keep all class in one file.
// import ResultsRow from './ResultsPage.jsx';


var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;

////////////////////////////////////////////////////////
//
//  Entrance
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
    var tileStyle = {
        height:  y * 0.4 ,
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

    var buttonStyle = {
        fontSize: "1em",
        width: x * 0.4,
        height: y * 0.4,
        margin: 0,
        opacity: 0,
        position: "relative",
        fontFamily: "sans-serif",
        color: "#ffffff",
        fontWeight: "bold",
        lineHeight: "3px",
        border: "1px solid black"
      };

      var spanStyle = {
        position: "relative",
        top: y * .2,
        display: "inline-block",
        verticalAlign: "middle",
        lineHeight: "normal"
      };

    {/* TODO: style with percentage size,  https://github.com/facebook/react-native/issues/364
        TODO: display:inline-block;  can't be used here! Find a solution
    */}
    return (
      <div style={tileStyle}>
        <p style={spanStyle}>{this.props.text}</p>
         <button onClick={this._clickHandler} style={buttonStyle}>+</button> {/* TODO: why can't set this.props.clickHandler here? Why using intermediate?*/}
      </div>
    );
  }
});

var Entrance = React.createClass({
  handleEventInfo : function(e){
    console.log("Event Info .... clicked");
  },

  handleRaces : function(e){
    browserHistory.push('/welcome');
  },

  handlePostcard : function(e){
    {/* TODO : share to weixin */}
  },

  handleComingEvent : function(e){
    window.open("http://www.baidu.com");
  },

  render: function() {
    return (
      <div>
        <Tile text="Event Info" clickHandler={this.handleEventInfo}/>
        <Tile text="Races" clickHandler={this.handleRaces}/>
        <Tile text="Postcard" clickHandler={this.handlePostcard}/>
        <Tile text="Coming Event" clickHandler={this.handleComingEvent}/>
      </div>
    );
  }
});

////////////////////////////////////////////////////////
//
// Welcome
//
////////////////////////////////////////////////////////
var Welcome = React.createClass({
  handleHorseSelection : function(){
    {/* Lead a shake page*/}
  },

  handleLeadboard : function() {

  },

  handleResult : function() {

  },

  render: function() {
    return (
       <div>
        <Tile text="Races" clickHandler={this.handleHorseSelection} />
        <Tile text="Leadboard" clickHandler={this.handleLeadboard} />
        <Tile text="Results" clickHandler={this.handleResult} />
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
  render: function() {
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


var Leadboard = React.createClass({
  render: function() {
    return (
      <LeadboardTable leaders={theLeaders} />
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
// Races Results
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
      data: []
    };
  },

  shakeEventDidOccur: function() {
    //put your own code here etc.
    alert('shake!');

    console.log("Shake detected");
  },

  componentDidMount: function() {
    window.addEventListener('shake', this.shakeEventDidOccur, false);
    console.log("Shake mounted ");
  },

  componentWillUnmount: function() {
    myShakeEvent.stop();
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
          <li><Link to="/">Entrances</Link></li>    {/* Four tiles of menu item of Status/Event, Races, Share button and External link */}
          <li><Link to="/welcome">Welcome</Link></li>      {/* Menu items of Races, Leadboard,  */}

          <li><Link to="/leadboard">Leadboard</Link></li>
          <li><Link to="/results">Results</Link></li>
          <li><Link to="/racedetail">Race Detail</Link></li>
          <li><Link to="/shake">Shake Demo</Link></li>
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
      <IndexRoute component={Entrance}/>
      <Route path="/welcome" component={Welcome} />
      <Route path="/leadboard" component={Leadboard} />
      <Route path="/results" component={Results} />
      <Route path="/racedetail" component={RaceDetail} />
      <Route path="/shake" component={ShakePage} />
    </Route>
  </Router>,
  document.querySelector("#container")
);
