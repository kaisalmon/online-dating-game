import React from 'react';
import CSS from "csstype";
const HEADER_STYLE : CSS.Properties = {
    width: "100%",
    padding: "1em 3em 1em ",
    margin: 0,
    background: "white",
    fontWeight: "bold",
    boxShadow: "0 2px 2px rgba(0,0,0,0.3)",
    fontSize: "115%",
    zIndex: 1,
}
export default function ({children}:{children:React.ReactNodeArray|React.ReactNode}){
    return <div style={HEADER_STYLE}>
        {children}
    </div>
}