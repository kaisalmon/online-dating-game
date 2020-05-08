export interface SentChatMessage{
    text:string,
    fromPlayer: boolean,
    id: number,
    isBeingTyped?:false,
}
export interface BeingTypedMessage{
    isBeingTyped:true,
    fromPlayer?: false,
    id: number,
}
type ChatMessage = SentChatMessage | BeingTypedMessage;
export default ChatMessage;