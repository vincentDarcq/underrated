import { 
  ChangeDetectionStrategy, 
  Component,
  ElementRef,
  HostListener,
  OnInit, 
  ViewChild
} from '@angular/core';
import { HeaderService } from '../shared/services/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  newsHeight: number;
  artistesHeight: number;
  servicesHeight: number;
  quiHeight: number;
  contactHeight: number;

  @ViewChild('component')
  home: ElementRef;

  @HostListener('window:scroll', ['$event']) 
  onScroll(event: Event): void {
    const totalHeight = this.home.nativeElement.offsetHeight +
                        this.newsHeight +
                        this.artistesHeight + 
                        this.servicesHeight +
                        this.quiHeight +
                        this.contactHeight;
    const componentsHeight = [
      {header: 'home', height: this.home.nativeElement.offsetHeight}, 
      {header: 'news', height: this.newsHeight}, 
      {header: 'artistes', height: this.artistesHeight}, 
      {header: 'services', height: 900}, 
      {header: 'qui', height: 900}, 
      {header: 'contact', height: this.contactHeight}
    ];
    const el = (event.target as Document).documentElement;
    let height = 0;
    console.log("position : "+el.scrollTop);
    console.log(componentsHeight)
    for(let i = 0; i < componentsHeight.length; i++){
      height += componentsHeight[i].height;
      if(el.scrollTop > height - componentsHeight[i]?.height && el.scrollTop < height){
        this.headerService.setActiveHeader(componentsHeight[i].header);
      }
    }
  }

  constructor(
    private headerService: HeaderService
  ) {
  }

  ngOnInit(): void {
  }

  setNewsHeight(event: number){
    this.newsHeight = event;
  }
  setArtistesHeight(event: number){
    this.artistesHeight = event;
  }
  setServicesHeight(event: number){
    this.servicesHeight = event;
  }
  setQuiHeight(event: number){
    this.quiHeight = event;
  }
  setContactHeight(event: number){
    this.contactHeight = event;
  }

}
