import FormatBold from "./images/format_bold.png";
import FormatItalic from "./images/format_italic.png";
import FormatListBullet from "./images/format_list_bulleted.png";
import FormatListNumbered from "./images/format_list_numbered.png";
import TextColor from "./images/text_format.png";
import FormatUnderlined from "./images/format_underlined.png";
import HyperLink from "./images/link_FILL.png";
import HyperLinkOff from "./images/link_off_FILL.png";
import StrikeThrough from "./images/strikethrough_s_FILL0.png";
import FormatLeft from "./images/format_align_left.png";
import FormatRight from "./images/format_align_right.png";
import FormatCenter from "./images/format_align_center.png";
import { useState } from "react";
import { TextColorPicker } from "./TextColorPicker";
import { BackgroundColorPicker } from "./BackgroundColorPicker";
import * as _ from "lodash";

import "./Toolbar.css";


const Toolbar = ({
        toggleInlineStyle, 
        removeInlineStyle,
        toggleBlockType, 
        customStyleState, 
        setCustomStyleState,
        editorStyle,
        setEditorStyle,
        editorRef})=>{

    const [textcolor, setTextColor] = useState("#000000");
    const [backgroundColor, setBackgroundColor] = useState("#ffffff")

    const [bold, setBold] = useState(false);

    const [italic, setItalic] = useState(false);

    const [underlined, setUnderlined] = useState(false);

    const [strikethrough, setSrikeThrough] = useState(false);

    const [unorderedlist, setUnorderedlist] = useState(false);

    const [orderedlist, setOrderedList] = useState(false);

    const [isOpen, toggle] = useState(false);

    const [fontFamily, setFontFamily] = useState("FONT_FAMILY_ARIAL");
    
    const [fontSize, setFontSize] = useState("FONT_SIZE_14");

    const [textAlignment, setTextAlignment] = useState("left");

    const availableFontSize = [ 
        {"label":8, "value":"FONT_SIZE_8"}, 
        {"label":9, "value":"FONT_SIZE_9"},
        {"label":10, "value":"FONT_SIZE_10"},
        {"label":11, "value":"FONT_SIZE_11"},
        {"label":12, "value":"FONT_SIZE_12"},
        {"label":14, "value":"FONT_SIZE_14"},
        {"label":16, "value":"FONT_SIZE_16"},
        {"label":18, "value":"FONT_SIZE_18"},
        {"label":20, "value":"FONT_SIZE_20"},
        {"label":22, "value":"FONT_SIZE_22"},
        {"label":24, "value":"FONT_SIZE_24"},
        {"label":26, "value":"FONT_SIZE_26"},
        {"label":28, "value":"FONT_SIZE_28"},
        {"label":36, "value":"FONT_SIZE_36"},
        {"label":48, "value":"FONT_SIZE_48"},
        {"label":72, "value":"FONT_SIZE_72"}
        ]

    const availableFontFamily = [
        {"label":"Arial", "value": "FONT_FAMILY_ARIAL"},
        {"label":"Verdana", "value": "FONT_FAMILY_VERDANA"},
        {"label":"Tahoma", "value": "FONT_FAMILY_TAHOMA"},
        {"label": "Trebuchet MS", "value": "FONT_FAMILY_TREBUCHET_MS"},
        {"label": "Times New Roman", "value": "FONT_FAMILY_TIMES_NEW_ROMAN"},
        {"label": "Georgia", "value": "FONT_FAMILY_GEORGIA"},
        {"label": "Garamond", "value": "FONT_FAMILY_GARAMOND"},
        {"label": "Courier New", "value": "FONT_FAMILY_COURIER_NEW"},
        {"label": "Brush Script MT", "value": "FONT_FAMILY_BRUSH_SCRIPT_MT"}
    ]
    


    const toggleBold = (e)=>{
        // if(!bold){
        //     toggleInlineStyle("BOLD");
        // }else{
        //     toggleInlineStyle("BOLD");
        // }
        e.preventDefault();
        setBold(!bold)
        toggleInlineStyle("BOLD");
    }

    const toggleItalic = (e)=>{
        e.preventDefault();
        setItalic(!italic)
        toggleInlineStyle("ITALIC");
    }

    const toggleUnderlined = (e)=>{
        e.preventDefault();
        setUnderlined(!underlined)
        toggleInlineStyle("UNDERLINE");
    }


    const toggleStrikeThrough = (e)=>{
        e.preventDefault();
        setSrikeThrough(!strikethrough)
        toggleInlineStyle("STRIKETHROUGH");
    }



    const toggleUnorderedList=(e)=>{
        e.preventDefault();
        setUnorderedlist(!unorderedlist);
        toggleBlockType("unordered-list-item");
    }


    const toggleOrderedList = (e)=>{
        e.preventDefault();
        setOrderedList(!orderedlist);
        toggleBlockType("ordered-list-item");
    }

    const toggleFontSize = (e)=>{
        e.preventDefault();
        setFontSize(e.target.value);
        toggleInlineStyle(e.target.value);
    }

    const toggleFontFamily = (e)=>{
        e.preventDefault();
        setFontFamily(e.target.value);
        toggleInlineStyle(e.target.value);
    }

    const toggleAligment = (val)=>{
        let editorStyleCopy = {...editorStyle,
                                textAlign: val
                                }
        setEditorStyle(editorStyleCopy);
        setTextAlignment(val);
    }

    const toggleBackgroundColor = (val)=>{
        let editorStyleCopy = {...editorStyle,
                               background:val
                            }
        setEditorStyle(editorStyleCopy);
        setBackgroundColor(val);
    }

    const toggleColor = (color)=>{
        toggle(false);
        let keys = Object.keys(customStyleState);
        let colorval = color.replace("#", "");
        let colorkey = "COLOR_"+colorval;
        let colorIndex = _.findIndex(keys, (k)=>{return k==colorkey});
        if(colorIndex==-1){
            let customStyleStateCopy = {...customStyleState};
            customStyleStateCopy[colorkey] = {
                color:color};
            setCustomStyleState(
                customStyleStateCopy
            )
        }
        setTextColor(color);
        toggleInlineStyle(colorkey);
    }

    return(
        <div className="main-container">
            <div className="text-format-container">
                <div className={bold?"text-format-buttons active":"text-format-buttons"} onMouseDown={toggleBold}>
                    <img className="img-icons" src={FormatBold}></img>
                </div>
                <div className={italic?"text-format-buttons active":"text-format-buttons"} onMouseDown={toggleItalic}>
                    <img className="img-icons" src={FormatItalic}></img>
                </div>
                <div className={underlined?"text-format-buttons active":"text-format-buttons"} onMouseDown={toggleUnderlined}>
                    <img className="img-icons" src={FormatUnderlined}></img>
                </div>
                <div className={strikethrough?"text-format-buttons active":"text-format-buttons"} onMouseDown={toggleStrikeThrough}>
                    <img className="img-icons" src={StrikeThrough}></img>
                </div>
            </div>
            <div className="text-color-container">
                <div className="text-format-buttons">
                    <TextColorPicker color={textcolor} onChange={toggleColor} isOpen={isOpen} toggle={toggle}></TextColorPicker>
                </div>
                <div className="text-format-buttons">
                    <BackgroundColorPicker color={backgroundColor} onChange={toggleBackgroundColor}></BackgroundColorPicker>
                </div>
            </div>
            <div className="list-container">
                <div className={unorderedlist?"text-format-buttons active":"text-format-buttons"} onMouseDown={toggleUnorderedList}>
                    <img className="img-icons" src={FormatListBullet}></img>
                </div>
                <div className={orderedlist?"text-format-buttons active":"text-format-buttons"} onMouseDown={toggleOrderedList}>
                    <img className="img-icons" src={FormatListNumbered}></img>
                </div>
            </div>
            <div className="link-container">
                <div className="text-format-buttons">
                    <img className="img-icons" src={HyperLink} ></img>
                </div>
                <div className="text-format-buttons">
                    <img className="img-icons" src={HyperLinkOff}></img>
                </div>
            </div>
            <div className="font-format-container">
                <div>
                    <select value={fontSize} onChange={(e)=>{toggleFontSize(e)}}>
                        {availableFontSize.map((fz)=>{
                            return(
                                <option value={fz.value}>{fz.label}</option>
                            )
                        })}
                    </select>
                </div>
                <div>
                    <select value={fontFamily} onChange={(e)=>{toggleFontFamily(e)}}>
                        {availableFontFamily.map((af)=>{
                            return(
                                <option value={af.value}>{af.label}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className="alignment-container">
                <div className={(textAlignment=="left")?"text-format-buttons active":"text-format-buttons"} onClick={()=>{toggleAligment("left")}}>
                    <img className="img-icons" src={FormatLeft}></img>
                </div>
                <div className={(textAlignment=="center")?"text-format-buttons active":"text-format-buttons"} onClick={()=>{toggleAligment("center")}}>
                    <img className="img-icons" src={FormatCenter}></img>
                </div>
                <div className={(textAlignment=="right")?"text-format-buttons active":"text-format-buttons"} onClick={()=>{toggleAligment("right")}}>
                    <img className="img-icons" src={FormatRight}></img>
                </div>
            </div>
        </div>
    )
}


export default Toolbar;