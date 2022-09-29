import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Workspace from "./components/Workspace";

interface Song {
  file_id: String,
  title: string,
  contents: string
  date: String,
};

function App() {

  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song>();

  useEffect(() => {
    invoke('load_all_songs').then((value: any) => {
      setSongs(value);
      return;
    })
    .catch(console.error);
  }, [])

  const changeSong = (song: Song) => {
    setCurrentSong(song);
  }

  return (
    <section className="home">
      <Sidebar songs={songs} changeSong={changeSong} />
      { currentSong ? <Workspace song={currentSong} /> : <h2>Choose a project</h2>} 
    </section>
  );
}

export default App;
