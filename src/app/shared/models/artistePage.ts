export class ArtistePage {
    _id: string;
    nom: string;
    facebook: string;
    twitter: string;
    instagram: string;
    youtube: string;
    description: string;
    videos: Array<string>;
    pochettes: Array<string>;
    photo: string;

    constructor(
        nom?: string, 
        facebook?: string,
        twitter?: string,
        instagram?: string,
        youtube?: string,
        description?: string,
    ){
        this.nom = nom;
        this.facebook = facebook;
        this.twitter = twitter;
        this.instagram = instagram;
        this.youtube = youtube;
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