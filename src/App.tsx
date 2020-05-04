import React from 'react';
import PhoneWrapper from "./components/phone-wrapper";
import MatchThreadComp from "./components/match-thread";
import MatchThread from "./game/match-thread";

const AlexThread:MatchThread = {
  match: {
    name: "Alex",
    traits: ["COCKY", "HARDWORKING", "CARING"]
  },
  messages: [
    {text: "Hi!", fromPlayer:false},
    {text: "Howdy friend!", fromPlayer:true}
  ]
}

function App() {
  return (
    <div className="App">
      <PhoneWrapper>
        <MatchThreadComp matchThread={AlexThread}/>
      </PhoneWrapper>
    </div>
  );
}

export default App;
