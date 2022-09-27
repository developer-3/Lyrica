import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Workspace from "./components/Workspace";

interface Song {
  id: String,
  title: String,
  contents: String
  date: String,
};

function App() {

  const [songs, setSongs] = useState<Song[]>([]);

  useEffect(() => {
    invoke('load_all_songs').then((value: any) => {
      setSongs(value);
      console.log(value);
      return;
    })
    .catch(console.error);
  }, [])

  return (
    <section className="home">
      <Sidebar songs={songs}/>
      <Workspace />
    </section>
  );
}

export default App;
