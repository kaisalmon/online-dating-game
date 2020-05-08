import React from 'react';
import PhoneWrapper from "./components/phone-wrapper";
import MatchThreadComp from "./components/match-thread";
import MatchThread from "./game/match-thread";
import GameState from "./game/game-state";

const TICK_LENGTH= 100;

const Alex = {name: "Alex", traits:[] };

class App extends React.Component<{}, GameState>{
    constructor(props:{}) {
        super(props);
        this.state = {
            matchThread: new MatchThread(Alex)
        }
    }
    componentDidMount() {
        setInterval(()=>{
            const {matchThread} = this.state;
            matchThread.tick(TICK_LENGTH);
            this.setState({matchThread})
        }, TICK_LENGTH)
    }
    onChange(){
        const {matchThread} = this.state;
        this.setState({matchThread})
    }
    render()
    {
        const {matchThread} = this.state;
        return (
            <div className="App">
                <PhoneWrapper>
                    <MatchThreadComp
                        matchThread={matchThread}
                        onChange={()=>this.onChange()}
                    />
                </PhoneWrapper>
            </div>
        );
    }
}

export default App;
