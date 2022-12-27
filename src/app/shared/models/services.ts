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

    public setId(id: string){
        this._id = id;
    }

    public setTitre(titre: string){
        this.titre = titre;
    }

    public getTitre(){
        return this.titre;
    }

    public setParagraphe(paragraphe: string){
        this.paragraphe = paragraphe;
    }

    public getParagraphe(){
        return this.paragraphe;
    }

    public setImage(image: string){
        this.image = image;
    }
}