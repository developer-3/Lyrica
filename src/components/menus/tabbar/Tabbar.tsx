import { useEffect, useState } from "react";
import { ITab, TabControl } from "../../../types/common/menu/dropdown/tab";
import Tab from "./Tab";
import { faFloppyDisk, faPlus, faTrash, faBook } from "@fortawesome/free-solid-svg-icons";


const tabs: TabControl[] = [new TabControl(true, "Songs", faPlus, "⌘M"), new TabControl(false, "Books", faBook, "⌘B"), new TabControl(false, "Books", faFloppyDisk, "⌘B")]

export default function Tabbar() {

    const [currentTab, setCurrentTab] = useState<ITab>();

    const handleChangeTab = (to: ITab) => {
        if (currentTab == undefined) {
            return
        }
        currentTab.controller.deselect();
        setCurrentTab(to);
    }

    useEffect(() => {
        setCurrentTab(tabs[0].props())
    }, [])

    return (
        <div className="tabbar-wrapper">
            { tabs.map((tab, idx) => {
                return <Tab {...tabs[idx].props()} select={handleChangeTab} />
            }) }
        </div>
    );
}