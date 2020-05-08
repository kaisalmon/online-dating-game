import React, {ReactNode} from 'react';
import MatchThread  from "../game/match-thread";
import {Choice} from 'inkjs/engine/Choice';
import CSS from "csstype";
import ChatMessage from "../game/chat-message";
import Header from "./header";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import "../styles/style.css"

const matchColor = "#2095FE";
const fromPlayerColor = "lightgray";

const MESSAGE_THREAD_STYLES:CSS.Properties ={
    boxSizing: "border-box",
    background: "red",
    height: "100%",
    display: "flex",
    flexDirection: "column",
}

const MESSAGE_AREA_STYLE:CSS.Properties = {
    padding:"2em",
    background:"white",
    flexGrow: 1,
    overflow: "auto",
}
const FROM_PLAYER_CHAT_BUBBLE_STYLE:CSS.Properties = {
    backgroundColor: matchColor,
    color: "#fff",
    display: "inline-block",
    borderRadius: "20px 20px 20px 20px",
    padding: "10px 20px",
    margin: "0.6em",
    position: "relative",
    textAlign: "left",
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

function TypingDots(){
    return <div className="loadingContainer">
        <div className="ball1"></div>
        <div className="ball2"></div>
        <div className="ball3"></div>
    </div>
}

function StageDirection({children}:{children:ReactNode}){
    return <div style={{
        background: "linear-gradient(to right, rgba(0,0,0,0) 0%,rgba(0,0,0,0.2) 15%,rgba(0,0,0,0.2) 85%,rgba(0,0,0,0) 100%)",
        textAlign: "center",
        color: "#333",
        padding: "0.5em",
        fontStyle: "italic",
     }}>{children}</div>
}

function ChatMessageComp({chatMessage}:{chatMessage:ChatMessage}){
    const {fromPlayer} = chatMessage;
    if(chatMessage.isStageDirection){
        return <StageDirection>{chatMessage.text}</StageDirection>
    }
    const style = fromPlayer ?
        FROM_PLAYER_CHAT_BUBBLE_STYLE : FROM_MATCH_CHAT_BUBBLE_STYLE;
    return <div style={{position: "relative", textAlign:fromPlayer ? "right" : "left"}}  key={chatMessage.id}>
        <div style={style} className={fromPlayer ? "fromPlayer" : "fromMatch"}>
            <div style={!fromPlayer ? FROM_PLAYER_TAIL : FROM_MATCH_TAIL}/>
            {chatMessage.isBeingTyped ? <TypingDots/> : chatMessage.text}
        </div>
    </div>
}

function ChoiceComp({choice, onChoiceSelected}:{choice:Choice, onChoiceSelected:(choice:Choice)=>void}){
    return <pre onClick={()=>onChoiceSelected(choice)} key={choice.text} className="playerChoice">
        {choice.text}
    </pre>
}

type MessageThreadProps = { matchThread: MatchThread, onChange: () => void }

export default class MessageThread extends React.Component<MessageThreadProps> {
    el: HTMLDivElement| null = null;
    lastHeight: number =  0;
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }
   scrollToBottom() {
        if(!this.el) return;
        const height = this.el.scrollHeight;
        if(this.lastHeight === height) return;
        this.lastHeight = height;
       console.log({el:this.el})
       this.el.scrollTo({
           behavior:"smooth",
           top: height,
       })
    }

    render() {
        const {matchThread, onChange} = this.props;
        const {match} = matchThread;
        const choices = matchThread.getCurrentChoices();
        const messages = matchThread.getMessages();
        console.log(choices.length)
        return <div style={MESSAGE_THREAD_STYLES}>
            <Header>{match.name}</Header>
            <div style={MESSAGE_AREA_STYLE} ref={el => { this.el = el; }}>
                <ReactCSSTransitionGroup
                    transitionName="item"
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={300}>
                    {messages.map(message =>
                        <ChatMessageComp key={message.id} chatMessage={message}/>
                    )}
                </ReactCSSTransitionGroup>
                <ReactCSSTransitionGroup
                    transitionName="item"
                    transitionEnterTimeout={600}
                    transitionLeaveTimeout={300}>
                    {choices.map(choice =>
                        <ChoiceComp
                            choice={choice}
                            onChoiceSelected={(reply) => {
                                matchThread.applyChoice(reply);
                                onChange();
                            }}
                        />
                    )}
                </ReactCSSTransitionGroup>
            </div>
        </div>
    }
}