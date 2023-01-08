import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { Artiste } from 'src/app/shared/models/artiste';
import { ArtistePage } from 'src/app/shared/models/artistePage';
import { Service } from 'src/app/shared/models/services';
import { Youtube } from 'src/app/shared/models/youtube';
import { ArtistePageService } from 'src/app/shared/services/artiste-page.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { NosArtistesService } from 'src/app/shared/services/nos-artistes.service';
import { NosServicesService } from 'src/app/shared/services/nos-services.service';
import { YoutubeService } from 'src/app/shared/services/youtube.service';

@Component({
  selector: 'app-admin-forms',
  templateUrl: './admin-forms.component.html',
  styleUrls: ['./admin-forms.component.scss']
})
export class AdminFormsComponent implements OnInit, OnDestroy {

  titre: string = "";
  paragraphe: string = "";
  services: Array<Service>;
  artistes: Array<Artiste>;
  serverImg: String = "/upload?img=";
  getServices: Subscription;
  getArtistes: Subscription;
  getYTArtistes: Subscription;
  time: Subscription;
  getPages: Subscription;
  newArtiste: Artiste = new Artiste();
  photoArtiste: FormData = new FormData();
  logoArtiste: FormData = new FormData();
  photoArtistePage: FormData = new FormData();
  imageServiceModified: FormData = new FormData();
  pochette: FormData = new FormData();
  imageService: FormData = new FormData();
  youtubeArtiste: string = "";
  youtubeArtistes: Array<Youtube> = new Array();
  videoId: string = "";
  videoDescription: string = "";
  artistePage: string = "";
  artisteDescription: string;
  pages: Array<ArtistePage> = new Array();
  page: ArtistePage = new ArtistePage();
  videoPage: string = "";
  videoPageAlreadyAdd: string = "";
  pageSuccess: string;

  constructor(
    private nosServicesService: NosServicesService,
    private nosArtistesService: NosArtistesService,
    private youtubeService: YoutubeService,
    private authService: AuthService,
    private artistePageService: ArtistePageService
  ) {
    this.services = new Array();
    this.artistes = new Array();
  }

  ngOnInit(): void {
    this.getServices = this.nosServicesService.services.subscribe( (services: Array<Service>) => {
      this.services = services;
    });
    this.getArtistes = this.nosArtistesService.artistes.subscribe( (artistes: Array<Artiste>) => {
      this.artistes = artistes;
    });
    this.getYTArtistes = this.youtubeService.getAllVideos().subscribe( (youtubeArtistes: Array<Youtube>) => {
      this.youtubeArtistes = youtubeArtistes;
    });
    this.getPages = this.artistePageService.artistesPages.subscribe( (pages: Array<ArtistePage>) => {
      this.pages = pages;
    });
  }

  switchArtistePage(): void {
    if(this.artistePage.length > 0){
      const index = this.pages.findIndex(page => page.nom === this.artistePage);
      this.page = this.pages[index];
    }
  }

  public createService(){
    if(this.titre.length > 0 && this.paragraphe.length > 0){
      const service = new Service(this.titre, this.paragraphe);
      this.nosServicesService.createService(service, this.imageService);
    }
  }

  public deleteService(id: string){
    this.nosServicesService.deleteService(id);
  }

  public modifyService(service: Service){
    this.nosServicesService.modifyService(service, this.imageServiceModified)
  }

  public deleteArtiste(id: string){
    this.nosArtistesService.deleteArtiste(id).subscribe(
      (artiste: Artiste) => {
        this.artistePageService.deleteArtistePage(artiste.nom).subscribe(
          () => {
            let pages = this.artistePageService.artistesPages.value;
            const index = pages.findIndex(p => p.nom === artiste.nom)
            pages.splice(index, 1);
            this.artistePageService.artistesPages.next(pages);
        })
    });
  }

  public onPhotoArtiste(event){
    if (event.target.files[0]) {
      this.photoArtiste.append('photo', event.target.files[0], event.target.files[0].name);
    }
  }

  public onImageService(event){
    if (event.target.files[0]) {
      this.imageService.append('image', event.target.files[0], event.target.files[0].name);
    }
  }

  public modifyImageService(event){
    if (event.target.files[0]) {
      this.imageServiceModified.append('imageServiceModified', event.target.files[0], event.target.files[0].name);
    }
  }
  
  public createArtiste(){
    if(this.newArtiste.nom && this.photoArtiste){
      this.nosArtistesService.createArtiste(this.newArtiste, this.photoArtiste).subscribe(
        (rep : {artiste: Artiste, artistePage: ArtistePage}) => {
          const artistePage = new ArtistePage(rep.artistePage._id, rep.artistePage.nom);
          let pages = this.artistePageService.artistesPages.value;
          pages.push(artistePage)
          this.artistePageService.artistesPages.next(pages);
        });
    }
  }

  public createYoutubeArtiste(){
    if(this.youtubeArtiste.length > 0){
      this.youtubeService.createYoutubeArtiste(this.youtubeArtiste).subscribe( result => {
        if(result !== "cet artiste exite déjà"){
          this.youtubeArtistes.push(result)
        }
      })
    }
  }

  public pushVideo(){
    if(this.youtubeArtiste.length > 0 && this.videoId.length > 0 && this.videoDescription.length > 0){
      this.youtubeService.pushVideo(this.youtubeArtiste, this.videoId, this.videoDescription).subscribe( (youtubeArt: Array<Youtube>) => {
        this.youtubeArtistes.forEach(yt => {
          if(yt.artiste === this.youtubeArtiste){
            yt.videos = youtubeArt[0].videos;
          }
        })
      })
    }
  }

  public pullVideo(artiste: string, id: string){
    this.youtubeService.pullVideo(artiste, id).subscribe( (youtubeArt: Array<Youtube>) => {
      this.youtubeArtistes.forEach(yt => {
        if(yt.artiste === artiste){
          yt.videos = youtubeArt[0].videos;
        }
      })
    })
  }

  public deleteYtArtiste(id: string){
    this.youtubeService.deleteYtArtiste(id).subscribe( (youtubeArt: Youtube) => {
      const index = this.youtubeArtistes.findIndex(yt => yt.artiste === youtubeArt.artiste);
      this.youtubeArtistes.splice(index, 1);
    })
  }

  public logoArtistePage(event){
    if (event.target.files[0]) {
      this.logoArtiste.append('logo', event.target.files[0], event.target.files[0].name);
    }
  }

  public modifierArtistePage() {
    this.artistePageService.modifierPage(this.page).subscribe( (artistePage: ArtistePage) => {
      if(this.pochette.get('photoPochette') === null && this.photoArtistePage.get('photo') === null && this.logoArtiste.get('logo') === null){
        this.addAPtoCurrentVar(artistePage, true);
      }
      if(this.logoArtiste.get('logo') !== null){
        this.artistePageService.uploadLogo(artistePage.nom, this.logoArtiste).subscribe( (ap: ArtistePage) => {
          if(this.pochette.get('photoPochette') !== null || this.photoArtistePage.get('photo') !== null){
            this.addAPtoCurrentVar(ap, false);
          }else {
            this.addAPtoCurrentVar(ap, true);
          }
        })
      }
      if(this.photoArtistePage.get('photo') !== null){
        this.artistePageService.uploadPhoto(artistePage.nom, this.photoArtistePage).subscribe( (ap: ArtistePage) => {
          if(this.pochette.get('photoPochette') !== null){
            this.addAPtoCurrentVar(ap, false);
          }else {
            this.addAPtoCurrentVar(ap, true);
          }
        })
      }
      if(this.pochette.get('photoPochette') !== null){
        this.artistePageService.uploadPochette(artistePage.nom, this.pochette).subscribe( (ap: ArtistePage) => {
          this.addAPtoCurrentVar(ap, true);
        })
      }
    })
  }

  private addAPtoCurrentVar(ap: ArtistePage, display: boolean){
    const index = this.pages.findIndex(page => page.nom === ap.nom);
    this.pages[index] = ap;
    this.page = ap;
    if(display){
      this.pageSuccess = "page modifiée avec succès";
      this.time = this.timerPage();
    }
  }

  public onPhotoArtistePage(event){
    if (event.target.files[0]) {
      this.photoArtistePage.append('photo', event.target.files[0], event.target.files[0].name);
    }
  }

  public addVideo(){
    if(this.videoPage.length === 0){
      this.videoPageAlreadyAdd = "L'id est vide";
      return;
    }
    if(!this.page.videos){
      this.page.videos = new Array();
    }
    const index = this.page.videos.findIndex(video => video === this.videoPage);
    if(index === -1){
      this.page.videos.push(this.videoPage);
      this.videoPageAlreadyAdd = "";
    }else {
      this.videoPageAlreadyAdd = "Cet id est déjà dans la liste";
    }
    this.videoPage = "";
  }

  public removeFromVideoPageList(index: number){
    this.page.videos.splice(index, 1);
  }

  public onVideoPageChanged(){
    this.videoPageAlreadyAdd = "";
  }

  public removeFromPochetteList(index: number){
    this.page.pochettes.splice(index, 1);
  }

  public onPochettePage(event){
    if (event.target.files[0]) {
      this.pochette.append('photoPochette', event.target.files[0], event.target.files[0].name);
    }
  }

  public logout(){
    this.authService.signout();
  }

  public timerPage(){
    return timer(3000).subscribe(() => {
      this.pageSuccess = "";
      this.time.unsubscribe();
    })
  }

  ngOnDestroy(): void {
    if(this.getServices){ this.getServices.unsubscribe(); }
    if(this.getArtistes){ this.getArtistes.unsubscribe(); }
    if(this.getYTArtistes){ this.getYTArtistes.unsubscribe(); }
    if(this.getPages){ this.getPages.unsubscribe(); }
  }

}
