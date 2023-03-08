import React, { TextareaHTMLAttributes, useEffect } from "react";
import { useRef, useState } from "react";
import { ITextBlock } from "../../types/block"
import useAutosizeTextArea from "../../hooks/useAutosizeTextArea";

export default function TextBlock(props: ITextBlock) {

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const taWrapperRef = useRef<HTMLDivElement>(null);

    const [content, setContent] = useState(props.content);

    useAutosizeTextArea(textareaRef.current, content);

    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        if (props.content.length > 0 && textareaRef.current != null) {
            textareaRef.current.innerText = props.content;
        }
    }, [])

    const checkHeight = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        // const scrollHeight = event.target.scrollHeight;
        // if (textareaRef.current != null && taWrapperRef.current != null) {
        //     const numLines = Math.floor(scrollHeight/25);
        //     console.log(event.target.scrollHeight);
        //     taWrapperRef.current.style.height = (numLines * 25).toString() + "px";
        // }
        const val = event.target?.value;

        setContent(val);
    };

    const handleClick = (e: any) => {
        e.preventDefault();
        if (e.type === 'click') {
            setClicked(false);
        } else if (e.type === 'contextmenu') {
            setPoints({x: e.pageX, y: e.pageY})
            setClicked(true);
        }
    };

    return (
        <div ref={taWrapperRef} className="text-block-wrapper">
            <textarea 
                rows={1} 
                ref={textareaRef} 
                className="text-block" 
                onChange={checkHeight} 
                onClick={handleClick} 
                onContextMenu={handleClick} 
                placeholder="Let your creativity flow here..."
                value={content}
            />
            { clicked ? <Menu x={points.x} y={points.y} /> : null }
        </div>
    )
}

const Menu = (props: {x: number, y: number}) => {

    const menuDiv = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (menuDiv.current != null) {
            menuDiv.current.style.left = (props.x).toString() + 'px';
            menuDiv.current.style.top = (props.y).toString() + 'px';
        }
    }, [props.x]);

    return (
      <div className="tb-context-menu" ref={menuDiv}>
        <p>Move</p>
        <p>Rename</p>
        <p>Add chords</p>
      </div>
    );
};