import { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface ITab {
    name: string,
    icon: IconDefinition,
    shortcut: string,
    controller: TabControl
}

class TabControl {
    selected: boolean
    name: string
    icon: IconDefinition
    shortcut: string

    constructor(selected: boolean, name: string, icon: IconDefinition, shortcut: string) {
        this.selected = selected
        this.name = name
        this.icon = icon
        this.shortcut = shortcut
    }

    select() {
        this.selected = true
    }

    deselect() {
        this.selected = false
    }

    props() {
        return {"name": this.name, "icon": this.icon, "shortcut": this.shortcut, controller: this}
    }
}

export { type ITab, TabControl }