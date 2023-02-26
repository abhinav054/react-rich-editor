import logo from './logo.svg';
import './App.css';
import Toolbar from './Toolbar';
import {TextColorPicker} from "./TextColorPicker";
import { useState, useRef, useEffect } from 'react';
import { Editor,EditorState, RichUtils, Modifier, convertToRaw } from "draft-js";


function App() {
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  );

  const editor = useRef(null);

  // const styles = {
  //   editor: {
  //     border: "1px solid gray",
  //     minHeight: "6em"
  //   }
  // };

  const [editorStyle, setEditorStyle] = useState({
    "border": "1px solid gray",
    "minHeight": "1em",
    "width": "500px",
    "textAlign": "left",
    "background": "#fff",
    "margin": "5px",
    "padding": "5px"
  })
  


  const [customStyleState, setCustomStyleState] = useState({
    STRIKETHROUGH: {
      textDecoration: "line-through"
    },
    FONT_FAMILY_ARIAL:{
      fontFamily: "Arial, sans-serif"
    },
    FONT_FAMILY_VERDANA:{
      fontFamily: "Verdana, sans-serif"
    },
    FONT_FAMILY_TAHOMA:{
      fontFamily: "Tahoma, sans-serif"
    },
    FONT_FAMILY_TREBUCHET_MS:{
      fontFamily: "Trebuchet MS', sans-serif"
    },
    FONT_FAMILY_TIMES_NEW_ROMAN:{
      fontFamily:"Times New Roman', serif"
    },
    FONT_FAMILY_GEORGIA:{
      fontFamily: "Georgia, serif"
    },
    FONT_FAMILY_GARAMOND:{
      fontFamily: "Garamond, serif"
    },
    FONT_FAMILY_COURIER_NEW:{
      fontFamily: "Courier New', monospace"
    },
    FONT_FAMILY_BRUSH_SCRIPT_MT:{
      fontFamily: "Brush Script MT, cursive"
    },
    FONT_SIZE_8:{
      fontSize: "8px"
    },
    FONT_SIZE_9:{
      fontSize: "9px"
    },
    FONT_SIZE_10:{
      fontSize: "10px"
    },
    FONT_SIZE_11:{
      fontSize: "11px"
    },
    FONT_SIZE_12:{
      fontSize: "12px"
    },
    FONT_SIZE_14:{
      fontSize: "14px"
    },
    FONT_SIZE_16:{
      fontSize: "16px"
    },
    FONT_SIZE_18:{
      fontSize: "18px"
    },
    FONT_SIZE_20:{
      fontSize: "20px"
    },
    FONT_SIZE_22:{
      fontSize: "22px"
    },
    FONT_SIZE_24:{
      fontSize: "24px"
    },
    FONT_SIZE_26:{
      fontSize: "26px"
    },
    FONT_SIZE_28:{
      fontSize: "28px"
    },
    FONT_SIZE_36: {
      fontSize: "36px"
    },
    FONT_SIZE_48:{
      fontSize: "48px"
    },
    FONT_SIZE_72:{
      fontSize: "72px"
    },

    COLOR_ffffff:{
      color: "#ffffff"
    },
    COLOR_red: {
      color: "rgba(255, 0, 0, 1.0)"
    }
  })


  const customStyle = {
    STRIKETHROUGH: {
      textDecoration: "line-through"
    },
    FONT_SIZE_30: {
      fontSize: "30px"
    },
    COLOR_ffffff:{
      color: "#ffffff"
    },
    COLOR_red: {
      color: "#FF0000"
    }
  };

  function focusEditor() {
    editor.current.focus();
  }

  useEffect(() => {
    focusEditor();
  }, []);

  

  const setFocusToEnd = ()=>{
    const newState = EditorState.moveFocusToEnd(editorState);
    setEditorState(newState);
  }

  // const handleEditorChange = newEditorState => {
  //   const currentContentTextLength = editorState.getCurrentContent().getPlainText().length;
  //   const newContentTextLength = newEditorState.getCurrentContent().getPlainText().length;
  //   console.log(currentContentTextLength);
  //   console.log(newContentTextLength);
  //   if (currentContentTextLength === 0 && newContentTextLength === 1) {
  //     // WORKAROUND: listens to input changes and focuses/moves cursor to back after typing in first character
  //     setEditorState(EditorState.moveFocusToEnd(newEditorState));
  //   }
  //   else {
  //     setEditorState(newEditorState);
  //   }
  // }

  const toggleInlineStyle = inlineStyle => {
    editor.current.focus();
    let selectionState = editorState.getSelection();
    if(selectionState.isCollapsed()){
      const newState = EditorState.moveFocusToEnd(editorState);
      const newStateCopy = RichUtils.toggleInlineStyle(newState, inlineStyle);
      setEditorState(newStateCopy);  
    }else{
      setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle))
    }
  };





  const toggleBlockType = blockStyle =>{
    const newState = RichUtils.toggleBlockType(editorState, blockStyle);
    setEditorState(newState);
  }

  const removeInlineStyle = inlineStyle => {

    const newState = Modifier.removeInlineStyle(editorState.getCurrentContent(),  editorState.getSelection(), inlineStyle);
    console.log(convertToRaw(newState));
    setEditorState(EditorState.createWithContent(newState));

  }

  return (
    <div className="App">
        <Toolbar 
            toggleInlineStyle={toggleInlineStyle} 
            removeInlineStyle={removeInlineStyle} 
            toggleBlockType={toggleBlockType} 
            customStyleState={customStyleState} 
            setCustomStyleState={setCustomStyleState}
            editorStyle={editorStyle}
            setEditorStyle={setEditorStyle} 
          ></Toolbar>
        <div style={editorStyle}>
          <Editor
            ref={editor}
            customStyleMap={customStyleState}
            editorState={editorState}
            onChange={editorState => setEditorState(editorState)}
          />
        </div>
        
        <button onClick={()=>{
          let rawState = convertToRaw(editorState.getCurrentContent())
          console.log(rawState);
        }}>Raw</button>
    </div>
  );
}

export default App;
