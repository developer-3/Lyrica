import SidebarButton from "./SidebarButton";

function Sidebar() {

    return (
      <div className="sidebar">
        <h1>Songs</h1>
        <br />
        <SidebarButton />
        <SidebarButton />
        <SidebarButton />
        <SidebarButton />
      </div>
    );
}
  
export default Sidebar;