export interface SentChatMessage{
    text:string,
    fromPlayer: boolean,
    id: number,
    isBeingTyped?:false,
    isStageDirection?: boolean,
}
export interface BeingTypedMessage{
    isBeingTyped:true,
    fromPlayer?: false,
    id: number,
    isStageDirection?: false,
}
type ChatMessage = SentChatMessage | BeingTypedMessage;
export default ChatMessage;