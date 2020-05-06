import React from 'react';
import MatchThread  from "../game/match-thread";
import {Choice} from 'inkjs/engine/Choice';
import CSS from "csstype";
import ChatMessage from "../game/chat-message";
import Header from "./header";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import "../styles/transitions.css"

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
    display: "inline-block",
    borderRadius: "20px 20px 20px 20px",
    padding: "10px 20px",
    margin: "0.6em",
    position: "relative",
}
const FROM_MATCH_CHAT_BUBBLE_STYLE:CSS.Properties = {
    ...FROM_PLAYER_CHAT_BUBBLE_STYLE,
    backgroundColor: fromPlayerColor,
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
    return <div style={{position: "relative", textAlign:fromPlayer ? "right" : "left"}}>
        <div style={style} className={fromPlayer ? "fromPlayer" : "fromMatch"}>
            <div style={!fromPlayer ? FROM_PLAYER_TAIL : FROM_MATCH_TAIL}/>
            {text}
        </div>
    </div>
}

function ChoiceComp({choice}:{choice:Choice}){
    return <pre>
        {choice.text}?
    </pre>
}

export default function ({matchThread}:{matchThread:MatchThread}) {
    const {match, messages} = matchThread;
    return <div style={MESSAGE_THREAD_STYLES}>
        <Header>{match.name}</Header>
        <div style={{padding:"2em"}}>
            <ReactCSSTransitionGroup
              transitionName="item"
              transitionEnterTimeout={2000}>
                 {messages.map(message =>
                       <ChatMessageComp chatMessage={message}/>
                 )}
            </ReactCSSTransitionGroup>
            <ReactCSSTransitionGroup
              transitionName="item"
              transitionEnterTimeout={2000}>
                 {matchThread.getCurrentChoices().map(choice =>
                       <ChoiceComp choice={choice}/>
                 )}
            </ReactCSSTransitionGroup>
        </div>
    </div>
}