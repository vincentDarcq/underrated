export class Service {
    _id: string;
    titre: string;
    paragraphe: string;
    image: string;

    constructor(
        titre?: string, 
        paragraphe?: string, 
        image?: string
    ){
        this.titre = titre;
        this.paragraphe = paragraphe;
        this.image = image;
    }
}