import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./styles/App.scss";
import Sidebar from "./components/sidebar/Sidebar";
import Workspace from "./components/Workspace";
import Landing from "./components/Landing";

import { Song } from "./util/util";
import Tabbar from "./components/menus/tabbar/Tabbar";

function App() {

  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>();
  const [openSongs, setOpenSongs] = useState<Song[]>([]);

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
    if (song == null) {
        return;
    }
    for (var s of openSongs) {
        if (s.file_id == song.file_id) {
            return
        }
    }
    setOpenSongs([...openSongs, song])
  }

  const closeSong = (s: Song[]) => {
    setOpenSongs(s);
  }

  const onKeyDown = (e: KeyboardEvent) => {
    // console.log(e.key)
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        changeSong(null);
    }
  }

  return (
    <section className="home" id="home">
      {/* <Tabbar /> */}
      <Sidebar key={songs.length} songs={songs} changeSong={changeSong} />
       {/* TODO: Make this an adjustable divider */}
      { currentSong ? <Workspace song={currentSong} open={openSongs} closeSong={closeSong} /> : <Landing songs={songs} openSongCallback={changeSong}/> } 
    </section>
  );
}

export default App;
