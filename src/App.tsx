import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Workspace from "./components/Workspace";

function App() {

  return (
    <section className="home">
      <Sidebar />
      <Workspace />
    </section>
  );
}

export default App;
