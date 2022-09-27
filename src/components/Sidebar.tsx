import { invoke } from '@tauri-apps/api/tauri'
import { useEffect, useState } from "react";
import SidebarButton from "./SidebarButton";

interface Song {
  id: String,
  title: String,
  contents: String,
  date: String,
};

function Sidebar(props: {songs: Song[]}) {

    const [songs, setSongs] = useState<Song[]>([]);

    useEffect(() => {
      setSongs(props.songs);
    })

    function createFile() {
      invoke("create_file").then((id) => {
        console.log(id);
      })
    }

    return (
      <div className="sidebar">
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <h1>Songs</h1>
          <button className="create-new" onClick={createFile}>create</button>
        </div>
        <br />
        { songs.map((song, idx) => <SidebarButton song={song} />) }
      </div>
    );
}
  
export default Sidebar;