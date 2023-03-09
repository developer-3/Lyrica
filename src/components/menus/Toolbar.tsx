import { faFloppyDisk, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import DropdownMenu from "./dropdown/Dropdown";
import useWindowSize from "../../hooks/useWindowSize";

function Toolbar(props: {save: CallableFunction, delete: CallableFunction}) {

    const [createMenu, setCreateMenu] = useState(false);

    const createBtnRef = useRef<HTMLButtonElement>(null);
    const [points, setPoints] = useState({
        x: 0,
        y: 0
    });

    const size = useWindowSize();

    useEffect(() => {
        // update spawn location of dropdown on window resize
        if (createBtnRef.current != null) {
            var bodyRect = document.body.getBoundingClientRect()
            let rect = createBtnRef.current.getBoundingClientRect()
            let y = rect.top - bodyRect.top + 30;
            let x = rect.left - bodyRect.left;
            setPoints({x,y});
        }
    }, [createBtnRef, size]);

    
    const handleOnCreate = () => {
        setCreateMenu(!createMenu);
    }

    return (
        <div className="toolbar">
            <button onClick={handleOnCreate} ref={createBtnRef} className="toolbar-btn"><FontAwesomeIcon icon={faPlus} /></button>
            <button onClick={() => props.save} className="toolbar-btn"><FontAwesomeIcon icon={faFloppyDisk} /></button>
            <button onClick={() => props.delete} className="toolbar-btn"><FontAwesomeIcon icon={faTrash} /></button>
            { createMenu ? 
                <DropdownMenu x={points.x} y={points.y}>
                    <p>Verse</p>
                    <p>Chorus</p>
                    <p>Bridge</p>
                    <p>Empty Section</p>
                </DropdownMenu> 
            : 
                null 
            }
        </div>
    )

}

export default Toolbar;