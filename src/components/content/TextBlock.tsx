import { ChangeEvent, useEffect } from "react";
import { useRef, useState } from "react";
import { ITextBlock } from "../../types/common/block"
import useAutosizeTextArea from "../../hooks/useAutosizeTextArea";
import DropdownMenu from "../menus/dropdown/Dropdown";

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

    const checkHeight = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
            { clicked ? <DropdownMenu x={points.x} y={points.y} /> : null }
        </div>
    )
}