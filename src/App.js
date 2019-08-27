import React, { Component } from "react";
import FriendCard from "./components/FriendCard/FriendCard";
import Wrapper from "./components/Wrapper";
import Score from "./components/Score/Score";
import friends from "./friends.json";

class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    friends,
    clickedFriendIds: [],
    score: 0,
    goal: 12,
    status: ""
  };

  shuffleScoreCard = id => {
    let clickedFriendIds = this.state.clickedFriendIds;

    if(clickedFriendIds.includes(id)){
      this.setState({ clickedFriendIds: [], score: 0, status: "Gave Over!"});
      return;
    }else{
      clickedFriendIds.push(id)

      if(clickedFriendIds.length === 12){
        this.setState({score: 12, status: "You Won!", clickedFriendIds: []});
        console.log('You Win');
        return;
      }
       this.setState({ friends, clickedFriendIds, score: clickedFriendIds.length, status: " " });

       for (let i = friends.length - 1; i > 0; i--) {
         let j = Math.floor(Math.random() * (i + 1));
         [friends[i], friends[j]] = [friends[j], friends[i]];
       }
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Clicky</h1>
          <p className="App-intro">Try not to Click the same image twice!</p>
        </header>
        <Score total={this.state.score}
                goal={12}
                status={this.state.status}
                />
        <Wrapper>
          {this.state.friends.map(friend => (
            <FriendCard
            shuffleScoreCard={this.shuffleScoreCard}
            id={friend.id}
            key={friend.id}
            image={friend.image}
            />

          ))}
        </Wrapper>
      </div>
    );
  }
}

export default App;
