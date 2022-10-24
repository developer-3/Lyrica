import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Song } from "../util/util";

import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Landing(props: {songs: Song[]}) {

    const [songs, setSongs] = useState<Song[]>(props.songs);

    useEffect(() => {
        setSongs(props.songs)
    }, [props.songs])

    function openRecent(song: Song) {
        // TODO: implement this
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
                    <ul>
                        <li>
                        <FontAwesomeIcon icon={faPlus} />New file
                        </li>
                        <li>
                            Open
                        </li>
                        <li>
                            About
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}