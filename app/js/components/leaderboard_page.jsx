import React from 'react';
import Link from './link';
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


var LeaderboardPage = React.createClass({
  render: function() {
    return (
      <div>
        <LeadboardTable leaders={theLeaders} />
      </div>
    );
  }
});


export default LeaderboardPage;
