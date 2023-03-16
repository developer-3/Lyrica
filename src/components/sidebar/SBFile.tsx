import { useState } from "react";

interface ISongPreview {
    title: String,
    contents: String,
    date: String
}

export default function SidebarFile(props: {song: ISongPreview, handleClick: Function}) {

    const [clicked, setClicked] = useState(false);
    const [points, setPoints] = useState({
        x: 0,
        y: 0,
    });

    const handleClick = (e: any) => {
        console.log("right")
        e.preventDefault();
        if (e.type === 'click') {
            props.handleClick(props.song);
            setClicked(false);
        } else if (e.type === 'contextmenu') {
            setPoints({x: e.pageX, y: e.pageY})
            setClicked(true);
        }
    };

    return (
        <div className="sb-file" onClick={handleClick} >
            { props.song.title ? <p>{props.song.title}</p> : <p style={{fontStyle: "italic"}}>unnamed</p> }
            {/* { clicked ? <DropdownMenu x={points.x} y={points.y} /> : null } */}
        </div>
    )
}