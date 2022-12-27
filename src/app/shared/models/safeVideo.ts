import { SafeResourceUrl } from "@angular/platform-browser";

export class SafeVideo {
    url: SafeResourceUrl;
    description: string;

    constructor(
        url?: SafeResourceUrl, 
        description?: string
    ){
        this.url = url;
        this.description = description;
    }
}