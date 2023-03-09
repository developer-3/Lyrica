import { useEffect, useRef, useState } from "react";
import DropdownMenu from "./menus/dropdown/Dropdown";

interface SongPreview {
    title: String,
    contents: String,
    date: String
}

export default function SidebarButton(props: {song: SongPreview, handleClick: Function}) {

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
        <div onClick={handleClick} onContextMenu={handleClick}>
            <div className="sidebar-btn">
                <div className="title-line">
                    <h3>{props.song.title}</h3>
                    <p>{props.song.date}</p>
                </div>
                <p>{props.song.contents}</p>
            </div>

            { clicked ? <DropdownMenu x={points.x} y={points.y} /> : null }
        </div>
    );
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
        <p>Delete</p>
      </div>
    );
};