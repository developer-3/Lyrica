import React, { TextareaHTMLAttributes, useEffect } from "react";
import { useRef, useState } from "react";
import { TextBlockInterface } from "../../types/block"

export default function TextBlock() {

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const taWrapperRef = useRef<HTMLDivElement>(null);

    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });

    const checkHeight = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        const scrollHeight = event.target.scrollHeight;
        if (textareaRef.current != null && taWrapperRef.current != null) {
            const numLines = Math.floor(scrollHeight/25);
            console.log(event.target.scrollHeight);
            taWrapperRef.current.style.height = (numLines * 25).toString() + "px";
        }
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
            <textarea rows={1} ref={textareaRef} className="text-block" onChange={checkHeight} onClick={handleClick} onContextMenu={handleClick} placeholder="Let your creativity flow here..."></textarea>
            { clicked ? <Menu x={points.x} /> : null }
        </div>
    )
}

const Menu = (props: {x: number}) => {

    useEffect(() => {

    })

    return (
      <div className="tb-context-menu">
        <p>{props.x}</p>
      </div>
    );
};