
interface SongPreview {
    title: String,
    contents: String,
    date: String
}

function SidebarButton(props: {song: SongPreview, handleClick: Function}) {

    return (
        <div onClick={e => props.handleClick(props.song)}>
            <div className="sidebar-btn">
                <div className="title-line">
                    <h3>{props.song.title}</h3>
                    <p>{props.song.date}</p>
                </div>
                <p>{props.song.contents}</p>
            </div>
        </div>
    );
}
  
export default SidebarButton;