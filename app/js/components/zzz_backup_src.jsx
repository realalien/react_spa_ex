

////////////////////////////////////////////////////////
//
// Source code created for older design, not in use
//
////////////////////////////////////////////////////////


////////////////////////////////////////////////////////
//
// Welcome, Menu items of Races, Leadboard,
//
////////////////////////////////////////////////////////
var Welcome = React.createClass({
  render: function() {
    return (
       <div>
        <EntranceTile text="Races" relPath="/races" />
        <EntranceTile text="Leaderboard" relPath="/leaderboard" />
        <EntranceTile text="Results" relPath="/results" />
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
// Race choose page, (drafted by Jameson)
//
////////////////////////////////////////////////////////
// var Entrance = React.createClass({
//     render: function() {
//     return (
//       <div>
//         <EntranceTile text="Event Info" relPath="/event" />
//         <EntranceTile text="Races" relPath="/welcome" />
//         <EntranceTile text="Postcard" relPath="/share" />
//         <EntranceTile text="Coming Event" relPath="https://www.baidu.com"/>
//       </div>
//     );
//   }
// });

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
// Horse Races Listing Page, entrance for each match
// TODO: need to save horse already selected
//
////////////////////////////////////////////////////////

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
