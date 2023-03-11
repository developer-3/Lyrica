import TextBlock from "../TextBlock"
import { ISection } from "./section"

export default function SongSection(props: ISection) {

    return (
        <div className="songsection">
            <TextBlock content={props.header} type={"header"} />
            <TextBlock content='' type={""} />
        </div>
    )
}