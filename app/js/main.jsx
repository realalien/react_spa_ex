
import React from "react";
import ReactDOM from "react-dom";
import { Router,
      Route,
      IndexRoute,
      IndexLink,
      hashHistory,
      Link as ReactLink } from 'react-router';

import { createHistory, useBasename } from 'history';



import Link from './components/link';

import LogoAndName from './components/logo_and_name';

import EntrancePage from './components/entrance_page';

import PostcardPage from './components/postcard_page';
import LeaderboardPage from './components/leaderboard_page';
import PrizesPage from './components/prizes_page';
import NewsPage from './components/news_page';

import ShakePage from './components/shake_page';
import RaceChoosePage from './components/race_choose_page';
import HorseSelectPage from './components/horse_select_page';




// NOTE: it looks like multiple components in one file causes some problems can hardly be solved
//  so keep all class in one file.
// import ResultsRow from './ResultsPage.jsx';


// TODO:
// * TODO: the asset of tile icon should be the same size,
//         otherwise the positions of itself and siblings are too complex
// * TODO: define API protocol for server data
// * TODO: defensive:  collect all user screen size in case of any UI misconfortableness


////////////////////////////////////////////////////////
//
// App
//
////////////////////////////////////////////////////////
var dummyData = [
  {id: "1", name: "1", status: "closed"},
  {id: "2", name: "2", status: "open"},
  {id: "3", name: "3", status: "selected"},
  {id: "4", name: "4", status: "closed"},
  {id: "5", name: "5", status: "open"},
  {id: "6", name: "6", status: "selected"}
];
var jsonStr = JSON.stringify(dummyData);


var App = React.createClass({

  componentDidMount: function(){
    console.log(jsonStr);
    console.log(this.props);
    console.log(this.props.children);
    console.log(this.props.data);
    console.log("--------------------");
  },

  render: function() {
    return (
        <div className="content">
          <LogoAndName />
          {this.props.children}
        </div>
    );
  }
});



// TODO: all data are supposed to be managed in the App components

ReactDOM.render(
   <Router history={hashHistory}>
    <Route path="/" component={App} data={dummyData}>
      <IndexRoute component={EntrancePage}/>
      <Route path="/leaderboard" component={LeaderboardPage} />

      <Route path="/prizes" component={PrizesPage} />
      <Route path="/news" component={NewsPage} />
      <Route path="/postcard" component={PostcardPage} />
      <Route path="/races" component={RaceChoosePage} races={dummyData}/>
      <Route path="/race/:raceId" component={HorseSelectPage} />
    </Route>
  </Router>,
  document.querySelector("#container")
);
