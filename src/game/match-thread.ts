import Match from "./match";
import ChatMessage from "./chat-message";

export default class MatchThread{
    match: Match;
    messages: ChatMessage[];
    constructor(match:Match) {
        this.match = match;
        this.messages = [];
    }
    tick(){
        if(this.messages.length == 0){
            this.messages.push({
                text: "Hi!",
                id:1,
                fromPlayer: false
            });
        }else if(this.messages.length == 1){
            this.messages.push({
                text: "Hey!",
                id:1,
                fromPlayer: true
            });
        }else if(this.messages.length == 2){
            this.messages.push({
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
                id:3,
                fromPlayer: false
            });
        }
    }
}