export class Artiste {
    _id: string;
    nom: string;
    photo: string;

    constructor(
        id?: string, 
        nom?: string, 
        photo?: string
    ){
        this._id = id;
        this.nom = nom;
        this.photo = photo;
    }

    public setId(id: string){
        this._id = id;
    }

    public getId(){
        return this._id;
    }

    public setNom(nom: string){
        this.nom = nom;
    }

    public getNom(){
        return this.nom;
    }

    public setPhoto(photo: string){
        this.photo = photo;
    }

    public getPhoto(){
        return this.photo;
    }

}