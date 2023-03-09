import { useEffect, useRef } from "react";
import { IDropdownSpawn } from "../../../types/common/menu/dropdown/dropdown";

export default function DropdownMenu(props: IDropdownSpawn) {
    const menuDiv = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (menuDiv.current != null) {
            menuDiv.current.style.left = (props.x).toString() + 'px';
            menuDiv.current.style.top = (props.y).toString() + 'px';
        }
    }, [props]);

    if (props.children) {
        return (
            <div className="tb-context-menu" ref={menuDiv}>
                {props.children}
            </div>
          );
    }

    return (
      <div className="tb-context-menu" ref={menuDiv}>
        <p>Move</p>
        <p>Rename</p>
        <p>Add chords</p>
      </div>
    );
}