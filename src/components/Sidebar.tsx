import { invoke } from '@tauri-apps/api/tauri'
import { SetStateAction, useEffect, useState } from "react";
import SidebarButton from "./SidebarButton";

interface Song {
  file_id: String,
  title: String,
  contents: String,
  date: String,
};

function Sidebar(props: {songs: Song[], changeSong: Function}) {

    const [songs, setSongs] = useState<Song[]>(props.songs);
    const [currentSong, setCurrentSong] = useState<Song>();

    function createFile() {
      invoke("create_file").then((id: any) => {
        const n_song: Song = {
          file_id: id,
          title: "",
          contents: "",
          date: ""
        }
        setSongs(songs.concat(n_song));
        openFile(n_song);
        console.log(songs.length)
      }).catch(console.error);
    }

    const openFile = (song: Song) => {
      setCurrentSong(song);
      props.changeSong(song);
    }

    return (
      <div className="sidebar">
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <h1>Songs</h1>
          <button className="create-new" onClick={createFile}>create</button>
        </div>
        <br />
        { songs.map((song, idx) => <SidebarButton song={song} handleClick={openFile}/>) }
      </div>
    );
}
  
export default Sidebar;