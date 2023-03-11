import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ITab } from "../../../types/common/menu/dropdown/tab";
import { useEffect, useState } from "react";
import { Tooltip } from 'react-tooltip'

interface TabHandler {
    select(tab: ITab): void
}

type ParentProp = ITab & TabHandler;

export default function Tab(props: ParentProp) {

    const [selected, setSelected] = useState(props.controller.selected);

    const handleSelect = () => {
        if (props.controller.selected) {
            return
        }
        props.controller.select()
        props.select(props.controller.props())
    }

    useEffect(() => {
        setSelected(props.controller.selected);
    }, [props.controller.selected])

    return (
        <div className="tab-btn-wrapper">
            <button 
                className="tab-btn"
                data-selected={String(selected)}
                data-tooltip-id="tabtt" 
                data-tooltip-content={props.name} 
                onClick={handleSelect}
            >
                <FontAwesomeIcon icon={props.icon} />
            </button>
            <Tooltip 
                id="tabtt" 
                place="right" 
                style={{ backgroundColor: "#111111", color: "#fff"}}
            />
        </div>
    );
}