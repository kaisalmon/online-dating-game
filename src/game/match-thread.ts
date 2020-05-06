import Match from "./match";
import ChatMessage from "./chat-message";
import {Story} from 'inkjs/engine/Story';
import {Choice} from 'inkjs/engine/Choice';


export default class MatchThread{
    match: Match;
    messages: ChatMessage[];
    conversationStory: Story;


    constructor(match:Match) {
        this.match = match;
        this.messages = [];
        const json = require("../conversations/ink.json");
        const story = new Story(json);
        this.conversationStory = story;
    }
    tick(){
        if(this.conversationStory.canContinue){
            if(Math.random()>0.4) return;
            const text = this.conversationStory.Continue();
            if(!text) return;
            this.messages.push({
                id:this.messages.length,
                fromPlayer: false,
                text
            })
        }
    }
    getCurrentChoices():Choice[]{
        if(!this.canSpeak()) return []
        return this.conversationStory.currentChoices;
    }
    canSpeak():boolean{
        return !this.conversationStory.canContinue
    }
    applyChoice(choice: Choice|number){
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
            this.messages.push({
                id:this.messages.length,
                fromPlayer: true,
                text
            })
        }
    }

}