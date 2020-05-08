import React, {ReactNodeArray, ReactNode} from 'react';
import overlay from '../assets/phone-wrapper.png';
import CSS from 'csstype';

const PHONE_WRAPPER_STYLE:CSS.Properties ={
    transform: "translateX(calc(50vw - 50%))",
    height: "100vh",
    width: `${100 * 700/1200}vh`,
    backgroundImage: `url(${overlay})`,
    backgroundSize: "contain",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    justifyContent:  "space-between",
    position: 'relative',
}
const PHONE_SCREEN:CSS.Properties = {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    overflow: "auto",
    margin: "10vh 7vh",
    borderRadius: "2vh"
}

export default function PhoneWrapper({children}:{children:ReactNode}) {
  return (
    <div style={PHONE_WRAPPER_STYLE}>
        <div style={PHONE_SCREEN}>
            {children}
        </div>
    </div>
  );
}