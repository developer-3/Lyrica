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
  }, [])

  const changeSong = (song: Song) => {
    setCurrentSong(song);
  }

  return (
    <section className="home">
      <Sidebar key={songs.length} songs={songs} changeSong={changeSong} />
       {/* TODO: Make this an adjustable divider */}
      { currentSong ? <Workspace song={currentSong} /> : <Landing songs={songs} /> } 
    </section>
  );
}

export default App;
