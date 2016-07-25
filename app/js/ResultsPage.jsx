// import React from 'react';
//
//
// //
// // export default class ResultsPage extends React.Component{
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       races : this.props.races
// //     };
// //   }
// //
// //   render() {
// // 		return (
// // 				<ResultsTable races={this.state.races} />
// // 		);
// //   }
// // }
// //
// export default class ResultsTable extends React.Component{
//   constructor(props) {
//     super(props);
//     this.state = {
//       races : this.props.races
//     };
//   }
//
//   render() {
//     var tableStyle = {
//       width: "90%",
//       height : "90%",
//       margin: 20,
//       backgroundColor: "#222c40",
//       fontFamily:"GurmukhiMN",
//       fontSize: 21
//     };
//
//     var tableHeaderStyle = {
//       textAlign: "center",
//       fontSize:21,
//       color: "#8D744B",
//       height: 15
//     };
//
//     var rows = [];
//
//
//     // this.props.races.map( function(race) {
//     //   rows.push(<ResultsRow race={race} />);
//     // }.bind(this));
//
//     return (
//       <div>
//         <p>hello world!</p>
//
//       </div>
//       // {/*<table style={tableStyle} >
//       //   <thead>
//       //
//       //   </thead>
//       //   {/*<tbody>{rows}</tbody>*/}
//       // </table>*/}
//
//     );
//   }
// }
//
//
//
//
// export default  class ResultsRow extends React.Component {
//
//   constructor(props) {
//     super(props);
//     this.state = {
//       // currentGreeting: props.greet,
//       // value: 'ReactSpeed'
//       // race : props.race
//     };
//   }
//
//   render () {
// 		var bgColor = "";
//
//     var theRace = this.props.race;
//     console.log(theRace);
// 		  switch( theRace.status ) {
// 		    case 'closed':
// 		      bgColor = "grey";
// 		      break;
// 		    case 'ongoing':
// 		      bgColor = "green";
// 		      break;
// 		    case 'open':
// 		    	bgColor = "yellow";
// 		    	break;
// 		    default:
// 		      return "black";
// 		  };
//
//
// 		var rowStyle = {
// 			backgroundColor : bgColor,
// 			width : "90%",
// 			// {/*height : 28,  */}
// 			fontSize: 21,
//       textAlign : "center",
// 		};
//
// 		var buttonStyle = {
//         width: "100%",
//         height: "100%",
//         margin: 0,
//         fontFamily:"GurmukhiMN",
//         lineHeight: "100%",
//         fontSize: 21,
//         color:"#8D744B",
//         backgroundColor: "transparent",
//         borderWidth:2
//       };
//
// 		return (
// 			<tr style={rowStyle}>
//         <td>
//         	<button style={buttonStyle} onClick={this.rowClicked}>{this.props.race.name}</button>
//         </td>
//       </tr>
// 		);
// 	}
//
//   rowClicked(e){
//     	console.log(this.props.race);
//   }
// }
