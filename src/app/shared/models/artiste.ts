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

}