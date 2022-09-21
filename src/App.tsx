import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {

  return (
    <section className="home">
      <Sidebar />
      <div className="container">
        <h1>Hello</h1>
      </div>
    </section>
  );
}

export default App;
