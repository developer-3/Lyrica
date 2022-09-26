import { invoke } from '@tauri-apps/api/tauri'
import { useState, useRef } from "react";

function Workspace() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    function cursorToContent(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key == "Enter") {
            contentRef.current?.focus();
        }
    }

    function cursorToTitle(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key == "Backspace" && content == '') {
            titleRef.current?.focus();
        }
    }

    function saveFile() {
        const obj = {
            fileId: "aa9f958d-dfb5-4b1b-b939-18e4d60e12f2",
            title: title,
            content: content
        }
        invoke('save_file', obj)
    }

    return (
        <div className='workspace'>
            <input className="workspace-title"  
                    ref={titleRef} 
                    value={title} 
                    placeholder="" 
                    onChange={(e) => setTitle(e.target.value)} onKeyUp={(e) => cursorToContent(e)}>
            </input>
            <button className="create-new" onClick={saveFile}>Save</button>
            <textarea className="workspace-content" ref={contentRef}  value={content} placeholder="" onChange={(e) => setContent(e.target.value)} onKeyUp={(e) => cursorToTitle(e)}/>
        </div>
    );

}

export default Workspace;