export {};

interface Block {
    content: any;
}


interface TextBlock extends Block {
    content: string;

    setText(text: string): void;
}

interface ChordBlock extends Block {
    content: string[];

    setChord(content: string, idx: number): void;
}

class Text implements TextBlock {
    content: string;

    constructor() {
        this.content = "";
    }

    setText(text: string): void {
        throw new Error("Method not implemented.");
    }
}

class Chord implements ChordBlock {
    content: string[];

    constructor(content: string[]) {
        this.content = content;
    }
    
    setChord(content: string, idx: number): void {
        throw new Error("Method not implemented.");
    }
}