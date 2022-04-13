export class Service {
    private titre: string;
    private paragraphe: string;
    private image: string;

    constructor(
        titre?: string, 
        paragraphe?: string, 
        image?: string
    ){
        this.titre = titre;
        this.paragraphe = paragraphe;
        this.image = image;
    }

    public setTitre(titre: string){
        this.titre = titre;
    }

    public setParagraphe(paragraphe: string){
        this.paragraphe = paragraphe;
    }

    public setImage(image: string){
        this.image = image;
    }
}