

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
