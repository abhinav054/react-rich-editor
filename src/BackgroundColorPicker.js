import React, { useCallback, useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";

import useClickOutside from "./useClickOutside";
import TextColor from "./images/text_format.png";
import BackgroundColorChange from "./images/highlighter_size.png";
export const BackgroundColorPicker = ({color, onChange})=>{
    const popover = useRef();
    const [isOpen, toggle] = useState(false);

    const close = useCallback(() => toggle(false), []);
    useClickOutside(popover, close);

    return (
        <div className="picker">
          <div style={{width: 25, height: 25}}>
            <div style={{display: "flex"}} onClick={() => toggle(true)}>
                <img style={{width: 24, height: 24}} src={BackgroundColorChange}></img>
            </div>
            <div style={{width: 24, height: 5, background: color}}>
            </div>
          </div>
    
          {isOpen && (
            <div className="popover" ref={popover}>
              <HexColorPicker color={color} onChange={onChange} />
            </div>
          )}
        </div>
      );

}