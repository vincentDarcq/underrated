import { Artiste } from "./artiste";
import { Projet } from "./projet";

export class ArtistePage {
    _id: string;
    artiste: Artiste;
    projets: Array<Projet>;
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    tiktok: string;
    description: string;
    videos: Array<string>;
    photo: string;

    constructor(
        id?: string,
        artiste?: Artiste,
        facebook?: string,
        twitter?: string,
        instagram?: string,
        youtube?: string,
        tiktok?: string,
        description?: string,
    ){
        this._id = id;
        this.artiste = artiste;
        this.facebook = facebook;
        this.twitter = twitter;
        this.instagram = instagram;
        this.youtube = youtube;
        this.tiktok = tiktok;
        this.description = description;
        this.videos = new Array();
    }
}