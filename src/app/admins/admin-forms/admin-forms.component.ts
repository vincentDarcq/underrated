import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Artiste } from 'src/app/shared/models/artiste';
import { ArtistePage } from 'src/app/shared/models/artistePage';
import { Projet } from 'src/app/shared/models/projet';
import { Service } from 'src/app/shared/models/services';
import { Youtube } from 'src/app/shared/models/youtube';
import { ArtistePageService } from 'src/app/shared/services/artiste-page.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { InfosService } from 'src/app/shared/services/infos.service';
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
  subscription: Subscription = new Subscription();
  newArtiste: Artiste = new Artiste();
  image: FormData = new FormData();
  youtubeArtiste: string = "";
  youtubeArtistes: Array<Youtube> = new Array();
  videoId: string = "";
  videoDescription: string = "";
  artistePage: string = "";
  artisteDescription: string;
  pages: Array<ArtistePage> = new Array();
  page: ArtistePage = new ArtistePage();
  videoPage: string = "";
  newProjet: Projet = new Projet();

  constructor(
    private nosServicesService: NosServicesService,
    private nosArtistesService: NosArtistesService,
    private authService: AuthService,
    private artistePageService: ArtistePageService,
    private infoService: InfosService
  ) {
    this.services = new Array();
    this.artistes = new Array();
  }

  ngOnInit(): void {
    this.nosArtistesService.getArtistes().then(
      (artistes: Array<Artiste>) => {
        this.artistes = artistes;
      }
    );
    this.subscription.add(
      this.nosServicesService.services.subscribe( (services: Array<Service>) => {
        this.services = services;
      })
    )
    this.subscription.add(
      this.artistePageService.artistesPages.subscribe( (pages: Array<ArtistePage>) => {
        this.pages = pages;
      })
    )
  }

  switchArtistePage(): void {
    if(this.artistePage.length > 0){
      const index = this.pages.findIndex(page => page.artiste.nom === this.artistePage);
      this.page = this.pages[index];
    }
  }

  public createService(){
    if(this.titre.length > 0 && this.paragraphe.length > 0){
      const service = new Service(this.titre, this.paragraphe);
      this.nosServicesService.createService(service, this.image);
    }
  }

  public deleteService(id: string){
    this.nosServicesService.deleteService(id);
  }

  public modifyService(service: Service){
    this.nosServicesService.modifyService(service).then((service: Service) => {
      if(this.image.get("imageServiceModified") !== null){
        this.nosServicesService.modifyImageService(service._id, this.image).then((service: Service) => {
          this.image.delete("imageServiceModified");
          this.infoService.popupInfo(`Le service ${service.titre} a bien été modifié`);
        })
      }
    })
  }

  public deleteArtiste(id: string){
    this.nosArtistesService.deleteArtiste(id).then(
      (artiste: Artiste) => {
        this.artistePageService.deleteArtistePage(artiste.nom).subscribe(
          () => {
            let pages = this.artistePageService.artistesPages.value;
            const index = pages.findIndex(p => p.artiste.nom === artiste.nom)
            pages.splice(index, 1);
            this.artistePageService.artistesPages.next(pages);
        })
    });
  }

  public onImageService(event){
    if (event.target.files[0]) {
      this.image.append('image', event.target.files[0], event.target.files[0].name);
    }
  }
  
  public modifyImageService(event){
    if (event.target.files[0]) {
      this.image.append('imageServiceModified', event.target.files[0], event.target.files[0].name);
    }
  }
  
  public createArtiste(){
    if(this.newArtiste.nom && this.image){
      this.nosArtistesService.createArtiste(this.newArtiste, this.image).then(
        (rep : {artiste: Artiste, artistePage: ArtistePage}) => {
          const artistePage = new ArtistePage(rep.artistePage._id, rep.artistePage.artiste);
          let pages = this.artistePageService.artistesPages.value;
          pages.push(artistePage)
          this.artistePageService.artistesPages.next(pages);
        });
      }
    }
    
    public onPhotoArtiste(event){
      if (event.target.files[0]) {
        this.image.append('photoArtiste', event.target.files[0], event.target.files[0].name);
      }
    }

    public onPhotoArtistePage(event){
      if (event.target.files[0]) {
        this.image.append('photoArtistePage', event.target.files[0], event.target.files[0].name);
      }
    }
    
    public imageProjet(event){
      if (event.target.files[0]) {
        this.image.append('imageProjet', event.target.files[0], event.target.files[0].name);
      }
    }

    public deleteProjet(index: number){
      this.page.projets.splice(index, 1);
      this.modifierArtistePage();
    }

    public modifierProjet(index: number){
      this.newProjet._id = this.page.projets[index]._id;
      this.newProjet.image = this.page.projets[index].image;
      this.newProjet.projetLink = this.page.projets[index].projetLink;
      this.newProjet.projetName = this.page.projets[index].projetName;
      this.newProjet.projetType = this.page.projets[index].projetType;
    }
    
    public modifierArtistePage() {
      if(!this.page.projets){
        this.page.projets = new Array<Projet>();
      }
      if(this.image.get('imageProjet') !== null && !this.newProjet.projetName){
        this.infoService.popupInfo("Attention, une image de projet a été séléctionnée mais le nom du projet n'est pas fourni");
        return;
      }
      if(this.newProjet.projetName){
        if(!this.newProjet._id){
          this.page.projets.push(this.newProjet);
        }else {
          let index;
          for(let i = 0; i < this.page.projets.length; i++){
            if(this.page.projets[i]._id === this.newProjet._id){
              index = i;
            }
          }
          this.page.projets[index] = this.newProjet;
        }
      }
      this.artistePageService.modifierPage(this.page).then(
        (artistePage: ArtistePage) => {
          if(this.image.get('photoArtistePage') === null && this.image.get('imageProjet') === null){
            this.addAPtoCurrentVar(artistePage);
          }
          if(this.image.get('photoArtistePage') !== null){
            this.artistePageService.uploadPhoto(artistePage.artiste.nom, this.image).subscribe( (ap: ArtistePage) => {
              this.addAPtoCurrentVar(ap);
            })
          }
          if(this.image.get('imageProjet') !== null){
            this.artistePageService.uploadImageProjet(
              this.page.artiste.nom,
              this.newProjet.projetName, 
              this.image
            ).then( 
              (ap: ArtistePage) => {
                this.addAPtoCurrentVar(ap);
              }
            )
          }
        },
        err => {
          this.infoService.popupInfo(`Une erreur s'est produite: ${err.error}`)
        }
      )
    }

  private addAPtoCurrentVar(ap: ArtistePage){
    const index = this.pages.findIndex(page => page.artiste.nom === ap.artiste.nom);
    this.pages[index] = ap;
    this.page = ap;
    this.newProjet = new Projet();
    this.image.delete('imageProjet');
    this.image.delete('photoArtistePage');
    this.infoService.popupInfo(`La page de ${ap.artiste.nom} a été modifiée avec succès !`);
  }


  public logout(){
    this.authService.signout();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
