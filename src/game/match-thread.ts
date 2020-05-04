import Match from "./match";
import ChatMessage from "./chat-message";

export default interface MatchThread{
    match: Match,
    messages: ChatMessage[],
}