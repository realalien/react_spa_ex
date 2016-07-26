
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

// NOTE: it looks like multiple components in one file causes some problems can hardly be solved
//  so keep all class in one file.
// import ResultsRow from './ResultsPage.jsx';


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
//  Logo and Game Name, to keep same position for other components below the  logo for each page
//
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
      textAlign : "center"
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
      height: 30,
      clear : "both"
    };

    return (
      <div>
        <LogoAndName />
        <div style={spacingStyle} />
        <Tile relPath="/leaderboard" isRound={false} imgUrl="../image/leaderboard.png" />
        <Tile relPath="/prizes" isRound={false} imgUrl="../image/prizes.png" />
        <div style={spacingStyle} />
        <Tile relPath="/share" isRound={true} imgUrl="../image/playbtn.png" />

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
//  Entrance  (from Jameson's drafts ),
//  Four tiles of menu item of Status/Event, Races, Share button and External link
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
      height:  x * 0.45 ,
      width:  x * 0.45 ,
      padding: 0,
      margin: 10,
      textAlign: "center",
      color: "white",
      backgroundColor: "rgba(218, 33, 39, 0.74)", // "#DA2127",
      fontFamily:"GurmukhiMN",
      fontSize: 32,
      display : 'inline-block',
      borderRadius : borderRadius,
      //background: 'url(' + this.props.imgUrl + ') no-repeat center center fixed',
    };

    var imgStyle = {
      display: "block",
      marginLeft: "auto",
      marginRight: "auto"
    };

    // var buttonStyle = {
    //     fontSize: "1em",
    //     width: x * 0.4,
    //     height: y * 0.4,
    //     margin: 0,
    //     opacity: 0,
    //     position: "relative",
    //     fontFamily: "sans-serif",
    //     color: "#ffffff",
    //     fontWeight: "bold",
    //     lineHeight: "3px",
    //     border: "1px solid black"
    //   };
    //
    //   var spanStyle = {
    //     position: "relative",
    //     top: y * .2,
    //     display: "inline-block",
    //     verticalAlign: "middle",
    //     lineHeight: "normal"
    //   };

    {/* TODO: style with percentage size,  https://github.com/facebook/react-native/issues/364
        TODO: display:inline-block;  can't be used here! Find a solution
    */}
    var centerStyle = {
      display: "table-cell",
      verticalAlign: "middle",
      minWidth : x * 0.45
    };


    // NOTE: there is an extra space above the first tile! Why?
    return (
      <div style={tileStyle}>
          <Link to={this.props.relPath}>
            <div style={centerStyle}>
              <img style={imgStyle} src={this.props.imgUrl} />
            </div>
          </Link>
      </div>
    );
  }
});

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
    </Route>
  </Router>,
  document.querySelector("#container")
);
