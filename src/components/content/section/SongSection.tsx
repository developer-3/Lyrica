import TextBlock from "../TextBlock"
import { ISection } from "./section"

export default function SongSection(props: ISection) {

    return (
        <div>
            <TextBlock content={props.header} />
            <TextBlock content='' />
        </div>
    )
}