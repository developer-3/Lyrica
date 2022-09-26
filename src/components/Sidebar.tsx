import { invoke } from '@tauri-apps/api/tauri'
import SidebarButton from "./SidebarButton";

function Sidebar() {

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
        <SidebarButton />
        <SidebarButton />
        <SidebarButton />
        <SidebarButton />
      </div>
    );
}
  
export default Sidebar;