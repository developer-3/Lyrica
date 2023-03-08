import { faFloppyDisk, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Toolbar(props: {save: CallableFunction, delete: CallableFunction}) {

    return (
        <div className="toolbar">
            <button onClick={() => null} className="toolbar-btn"><FontAwesomeIcon icon={faPlus} /></button>
            <button onClick={() => props.save} className="toolbar-btn"><FontAwesomeIcon icon={faFloppyDisk} /></button>
            <button onClick={() => props.delete} className="toolbar-btn"><FontAwesomeIcon icon={faTrash} /></button>
        </div>
    )

}

export default Toolbar;