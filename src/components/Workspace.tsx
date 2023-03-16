import { invoke } from '@tauri-apps/api/tauri'
import { useState, useRef, useEffect } from "react";

import { Song } from "../util/util";
import { TextBlock, SongSection } from './content/content.all';
import Toolbar from './menus/Toolbar';
import { ISection } from './content/section/section';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const ss: ISection[] = [{'header': "verse", 'content': "this is a verse"},{'header': "chorus", 'content': "this is a chorus"}]

function Workspace(props: {song: Song, open: Song[], closeSong: CallableFunction}) {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [sections, setSections] = useState<ISection[]>(ss)

    const [openSongs, setOpenSongs] = useState<Song[]>(props.open);
    const [currentSong, setCurrentSong] = useState<Song>(props.song);

    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        setTitle(props.song.title);
        setContent(props.song.contents)
    }, [props.song])

    useEffect(() => {
        setTitle(currentSong.title);
        setContent(currentSong.contents)
    }, [currentSong])

    useEffect(() => {
        setOpenSongs(props.open)
    }, [props.open])

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

    function closeFile(file_id: String) {
        const closed = openSongs.filter((song) => song.file_id != file_id)
        setOpenSongs(closed);
        setCurrentSong(closed[closed.length-1]);
        props.closeSong(closed);
    }

    return (
        <div className='workspace'>
            <WorkspaceTab openSongs={openSongs} closeFile={closeFile} />
            <input className="workspace-title"  
                    ref={titleRef} 
                    value={title} 
                    placeholder="What're you calling this one?" 
                    onChange={(e) => setTitle(e.target.value)} onKeyUp={(e) => cursorToContent(e)}>
            </input>
            <Toolbar save={saveFile} delete={deleteFile}/>
            {/* <button className="create-new" onClick={saveFile}>Save</button> */}
            {/* <textarea className="workspace-content" ref={contentRef}  value={content} placeholder="" onChange={(e) => setContent(e.target.value)} onKeyUp={(e) => cursorToTitle(e)}/> */}
            <TextBlock content='' />
            { sections.map((section, idx) => {
                console.log(idx)
                return <SongSection content={section.content} header={section.header} />
            })}
        </div>
    );

}

function WorkspaceTab(props: {openSongs: Song[], closeFile: CallableFunction}) {

    return (
        <div className="tab-wrapper">
            { props.openSongs.map((song, idx) => {
                return <Tab active='true' song={song} close={() => props.closeFile(song.file_id)} />
            })}
        </div>
    )
}

interface ITab {
    active: string
    song: Song
    close(file_id: String): void
}

function Tab(props: ITab) {

    return (
        <div className="tab" data-active={props.active}>
            <p>{props.song.title}</p>
            <FontAwesomeIcon icon={faXmark} onClick={() => props.close(props.song.file_id)} />
        </div>
    )
}

export default Workspace;