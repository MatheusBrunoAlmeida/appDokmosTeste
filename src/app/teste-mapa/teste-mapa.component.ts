import { FlareUpService } from './../flareup/flareup.service';
import { Component, OnInit } from '@angular/core';
import {
  ToastController,
  Platform,
  LoadingController
} from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation,
  ILatLng,
  Polyline,
  BaseArrayClass
} from '@ionic-native/google-maps';
import { FlareUp } from '../flareup/flareUp';


@Component({
  selector: 'app-teste-mapa',
  templateUrl: './teste-mapa.component.html',
  styleUrls: ['./teste-mapa.component.scss'],
})
export class TesteMapaComponent implements OnInit {
  map: GoogleMap;
  loading: any;
  private flareUp: FlareUp

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private platform: Platform,
    public flareUpService: FlareUpService) { }

  async ngOnInit() {
    //// Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    //await this.platform.ready();
    //await this.loadMap();

    this.flareUpService.listMap().then((response) => {
      console.log(response);
      this.platform.ready();
      this.loadMap(response);
    })
  }



  loadMap(response) {

    //coloca aqui uma busca na base de dados de flaup, ta ai ja 
    let POINTS: BaseArrayClass<any> = new BaseArrayClass<any>(response)

    let bounds: ILatLng[] = POINTS.map((data: any, idx: number) => {
      console.log(data);
      return data.position;
    });


    this.map = GoogleMaps.create('map_canvas', {
      camera: {
        target: bounds
      }
    });
    POINTS.forEach((data: any) => {
      data.disableAutoPan = true;
      let marker: Marker = this.map.addMarkerSync(data);
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(this.onMarkerClick);
      marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(this.onMarkerClick);
    });

  }

  onMarkerClick(params: any) {
    let marker: Marker = <Marker>params[1];
    let iconData = document.querySelectorAll('.flareUpNone')[0];
    iconData.classList.remove('flareUpNone');
    iconData.classList.add('flareUp');
  }



  async onButtonClick() {
    this.map.clear();

    this.loading = await this.loadingCtrl.create({
      message: 'Espere um pouco...'
    });
    await this.loading.present();

    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {
      this.loading.dismiss();
      console.log(JSON.stringify(location, null, 2));

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        tilt: 30
      });

      // add a marker
      let marker: Marker = this.map.addMarkerSync({
        title: 'Você está aqui',
        snippet: 'This plugin is awesome!',
        position: location.latLng,
        animation: GoogleMapsAnimation.BOUNCE
      });

      // show the infoWindow
      marker.showInfoWindow();

      // If clicked it, display the alert
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        this.showToast('clicked!');
      });
    })
      .catch(err => {
        this.loading.dismiss();
        this.showToast(err.error_message);
      });
  }

  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });

    toast.present();
  }


}
