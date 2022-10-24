import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.scss";
import Sidebar from "./components/Sidebar";
import Workspace from "./components/Workspace";
import Landing from "./components/Landing";

import { Song } from "./util/util";

function App() {

  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>();

  useEffect(() => {
    invoke('load_all_songs').then((value: any) => {
        console.log("loaded songs")
        setSongs(value);
        setCurrentSong(null);
    })
    .catch(console.error);

    document.addEventListener('keydown', onKeyDown, true);
  }, [])

  const changeSong = (song: Song | null) => {
    setCurrentSong(song);
  }

  const onKeyDown = (e: KeyboardEvent) => {
    console.log(e.key)
    if (e.metaKey && e.key === 'k') {
        changeSong(null);
    }
  }

  return (
    <section className="home" id="home">
      <Sidebar key={songs.length} songs={songs} changeSong={changeSong} />
       {/* TODO: Make this an adjustable divider */}
      { currentSong ? <Workspace song={currentSong} /> : <Landing songs={songs} openSongCallback={changeSong}/> } 
    </section>
  );
}

export default App;
