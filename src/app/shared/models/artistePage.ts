export class ArtistePage {
    _id: string;
    nom: string;
    logo: string;
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    tiktok: string;
    description: string;
    videos: Array<string>;
    pochettes: Array<string>;
    photo: string;

    constructor(
        id?: string,
        nom?: string, 
        facebook?: string,
        twitter?: string,
        instagram?: string,
        youtube?: string,
        tiktok?: string,
        description?: string,
    ){
        this._id = id;
        this.nom = nom;
        this.facebook = facebook;
        this.twitter = twitter;
        this.instagram = instagram;
        this.youtube = youtube;
        this.tiktok = tiktok;
        this.description = description;
        this.pochettes = new Array();
        this.videos = new Array();
    }

    public pushPochette(pochette: string) {
        this.pochettes.push(pochette);
    }

    public pushVideo(video: string) {
        this.videos.push(video);
    }
}