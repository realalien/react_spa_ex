import React from 'react';
import Link from './link';
import EntranceTile from './entrance_tile';
import SignUpForm from './signup_form';
////////////////////////////////////////////////////////
//
//  Entrance  ( from Are's proposed design)
//
////////////////////////////////////////////////////////

var w=window,d=document,e=d.documentElement,g=d.getElementsByTagName('body')[0],x=w.innerWidth||e.clientWidth||g.clientWidth,y=w.innerHeight||e.clientHeight||g.clientHeight;

var EntrancePage = React.createClass({


  componentDidMount: function () {
    console.log("------------   componentDidMount ------------ ");
    console.log(this.props);
  },


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
        <div style={spacingStyle} />
        <EntranceTile relPath="/leaderboard" isRound={false} imgUrl="../image/leaderboard.png" text="Information"/>
        <EntranceTile relPath="http://cecf.co/index.php/en/news" isRound={false} imgUrl="../image/news.png" text="News"/>
        <EntranceTile relPath="/races" isRound={false} imgUrl="../image/racegame.png" text="Race Game" />
        <EntranceTile relPath="http://happycard.hd-rj.com/" isRound={false} imgUrl="../image/racegame.png" text="Postcard" />
        {/*<SignUpForm />*/}
      </div>
    );
  }
});


export default EntrancePage;
