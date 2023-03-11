export { type ITextBlock };

interface Block {
    content: any;
}


interface ITextBlock extends Block {
    content: string;
    type: string;

    // setText(text: string): void;
}

interface ChordBlock extends Block {
    content: string[];

    setChord(content: string, idx: number): void;
}

class Text implements ITextBlock {
    content: string;
    type: string;

    constructor() {
        this.content = "";
        this.type = "";
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