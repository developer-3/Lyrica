import { invoke } from '@tauri-apps/api/tauri'
import { useState, useRef, useEffect } from "react";

import { Song } from "../util/util";
import TextBlock from './content/TextBlock';
import Toolbar from './menus/Toolbar';

function Workspace(props: {song: Song}) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setTitle(props.song.title);
        setContent(props.song.contents)
    }, [props.song])

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
        props.song.title = title;
        props.song.contents = content;
        const obj = {
            fileId: props.song.file_id,
            title: title,
            content: content
        }
        invoke('save_file', obj)
    }

    function deleteFile() {
        // TODO: implement deletion
    }

    return (
        <div className='workspace'>
            <input className="workspace-title"  
                    ref={titleRef} 
                    value={title} 
                    placeholder="What're you calling this one?" 
                    onChange={(e) => setTitle(e.target.value)} onKeyUp={(e) => cursorToContent(e)}>
            </input>
            <Toolbar save={saveFile} delete={deleteFile}/>
            {/* <button className="create-new" onClick={saveFile}>Save</button> */}
            {/* <textarea className="workspace-content" ref={contentRef}  value={content} placeholder="" onChange={(e) => setContent(e.target.value)} onKeyUp={(e) => cursorToTitle(e)}/> */}
            <TextBlock />
        </div>
    );

}

export default Workspace;