import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Song } from "../util/util";

import { faPlus, faInfoCircle, faGear } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-regular-svg-icons"

export default function Landing(props: {songs: Song[], openSongCallback: CallableFunction}) {

    const [songs, setSongs] = useState<Song[]>(props.songs);

    useEffect(() => {
        setSongs(props.songs)
    }, [props.songs])

    function openRecent(song: Song) {
        props.openSongCallback(song);
    }

    function openOption(option: string) {
        // TODO: implement this too please thanks
    }

    return (
        <div className="landing-wrapper">
            <h1>Welcome back!</h1>
            <div className="actions-panel">
                <div className="actions-panel-left">
                    <h3>Recents</h3>
                    { songs.map((song, idx) => <button onClick={() => openRecent(song)}>{song.title}</button> ) }
                </div>
                <div className="actions-panel-right">
                    <h3>Options</h3>
                    <button onClick={() => openOption("new_file")}><FontAwesomeIcon icon={faPlus} /> New file</button>
                    <button onClick={() => openOption("open")}><FontAwesomeIcon icon={faFile} /> Open</button>
                    <button onClick={() => openOption("settings")}><FontAwesomeIcon icon={faGear} /> Settings</button>
                    <button onClick={() => openOption("about")}><FontAwesomeIcon icon={faInfoCircle} /> About</button>
                </div>
            </div>
        </div>
    )
}