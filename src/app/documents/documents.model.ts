export class Document {

    constructor(public id: number, public name: string, public description: string, public url: string, children: Document[]) { }

}