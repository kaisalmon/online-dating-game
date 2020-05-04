import React from 'react';
import MatchThread from "../game/match-thread";
import CSS from "csstype";
import ChatMessage from "../game/chat-message";
import Header from "./header";

const matchColor = "#2095FE";
const fromPlayerColor = "lightgray";

const MESSAGE_THREAD_STYLES:CSS.Properties ={
    boxSizing: "border-box",
    background: "white",
    height: "100%",
}
const FROM_PLAYER_CHAT_BUBBLE_STYLE:CSS.Properties = {
    backgroundColor: matchColor,
    color: "#fff",
    marginLeft: "15%",
    borderRadius: "20px 20px 20px 20px",
    margin: "0 4vh 1em 0",
    padding: "10px 20px",
    position: "relative",
}
const FROM_MATCH_CHAT_BUBBLE_STYLE:CSS.Properties = {
    ...FROM_PLAYER_CHAT_BUBBLE_STYLE,
    backgroundColor: fromPlayerColor,
    margin: "0 0 1em 4vh",
    color: "#222",
}
const FROM_MATCH_TAIL : CSS.Properties = {
    borderColor: matchColor,
    borderRadius: "50% 50% 50% 50%",
    borderStyle: "solid",
    borderWidth: "0 0.7em",
    clip: "rect(1em, 1em, 2em, 0)",
    height: "2em",
    position: "absolute",
    right: "calc(0.3vh - 2em)",
    bottom: 0,
    width: "40px",
}
const FROM_PLAYER_TAIL : CSS.Properties = {
    ...FROM_MATCH_TAIL,
    borderColor: fromPlayerColor,
    left: "calc(0.3vh - 2em)",
    transform:" rotateY(180deg)"
}
function ChatMessageComp({chatMessage}:{chatMessage:ChatMessage}){
    const {text, fromPlayer} = chatMessage;
    const style = fromPlayer ?
        FROM_PLAYER_CHAT_BUBBLE_STYLE : FROM_MATCH_CHAT_BUBBLE_STYLE;
    return <div>
        <div style={style}>
            <div style={!fromPlayer ? FROM_PLAYER_TAIL : FROM_MATCH_TAIL}/>
            {text}
        </div>
    </div>
}

export default function ({matchThread}:{matchThread:MatchThread}) {
    const {match, messages} = matchThread;
    return <div style={MESSAGE_THREAD_STYLES}>
        <Header>{match.name}</Header>
            <div style={{padding:"2em"}}>
            {messages.map(message => <ChatMessageComp chatMessage={message}/>)}
        </div>
    </div>
}