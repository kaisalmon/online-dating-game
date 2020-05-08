import Match from "./match";
import ChatMessage, {SentChatMessage} from "./chat-message";
import {Story} from 'inkjs/engine/Story';
import {Choice} from 'inkjs/engine/Choice';


export default class MatchThread{
    match: Match;
    sentMessages: SentChatMessage[];
    conversationStory: Story;
    matchIsTyping: boolean = false;
    timeBetweenMatchMessages: number = 1750;
    timeToTypeMessage:number = 1500;
    timeToReply: number = 7000;

    timeSinceLastMatchMessage:number = 0;
    timeSinceMessageStartedBeingTyped:number = 0;
    timeSinceLastPlayerMessage: number = 0;

    constructor(match:Match) {
        this.match = match;
        this.sentMessages = [];
        const json = require("../conversations/ink.json");
        const story = new Story(json);
        this.conversationStory = story;
    }
    tick(deltaTime:number){
        this.timeSinceLastMatchMessage += deltaTime;
        this.timeSinceMessageStartedBeingTyped += deltaTime;
        this.timeSinceLastPlayerMessage += deltaTime;
        if(!this.conversationStory.canContinue || this.conversationStory.currentChoices.length > 0) return;
        if(this.matchIsTyping){
            if(this.timeSinceMessageStartedBeingTyped < this.timeToTypeMessage) return;
            const text = this.conversationStory.Continue();
            if(text === null) throw new Error("Null message")
            this.sendMatchMessage({text: text});
        }else{
            const timeToStartTyping = (this.didMatchSendLastMessage() ?
                this.timeBetweenMatchMessages
                : this.timeToReply
            ) - this.timeToTypeMessage;
            const timeSinceLastMessage =  this.timeSinceLastMessage();
            console.log({timeSinceLastMessage})
            if(timeSinceLastMessage < timeToStartTyping ) return;
            this.timeSinceMessageStartedBeingTyped = 0;
            this.matchIsTyping = true;
        }
    }

    timeSinceLastMessage(){
        return this.didMatchSendLastMessage() ? this.timeSinceLastMatchMessage : this.timeSinceLastPlayerMessage;
    }

    sendMatchMessage({text}:{text:string}){
        this.timeSinceLastMatchMessage = 0;
        this.matchIsTyping = false;
        this.sentMessages.push({
            id:this.sentMessages.length,
            fromPlayer: false,
            text,
        })
    }
    getCurrentChoices():Choice[]{
        if(!this.canSpeak()) return []
        return this.conversationStory.currentChoices;
    }
    canSpeak():boolean{
        return !this.conversationStory.canContinue && !this.matchIsTyping;
    }
    getMessages():ChatMessage[]{
        if(this.matchIsTyping) return [...this.sentMessages, {isBeingTyped: true, id: -3 * this.sentMessages.length - 100}]
        return this.sentMessages;
    }
    didMatchSendLastMessage():boolean{
        const index = this.sentMessages.length -1;
        if(index === -1) return false;
        return !this.sentMessages[index].fromPlayer;
    }
    applyChoice(choice: Choice|number){
        this.timeSinceLastPlayerMessage = 0;
        const index = typeof choice === "number"
            ? choice
            : this.getCurrentChoices().indexOf(choice)
        if(index === -1) {
        console.error(choice, index, this.conversationStory)
            throw new Error("Invalid Index")
        }
        this.conversationStory.ChooseChoiceIndex(index);
        const text = this.conversationStory.Continue();
        if(text) {
            this.sentMessages.push({
                id:this.sentMessages.length,
                fromPlayer: true,
                text
            })
        }
    }

}