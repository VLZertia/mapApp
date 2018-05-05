import { Component } from '@angular/core';
import { 
  IonicPage, 
  NavController, 
  NavParams, 
  ModalController, 
  MenuController 
} from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import { Platform } from 'ionic-angular';

declare var google: any;

@IonicPage()
@Component({
  selector: 'page-italy',
  templateUrl: 'italy.html',
})
export class ItalyPage {

  menu: any;

  mapItaly: any;
  coords: any = { lat: 0, lng: 0 };
  
  stadiums = [
    {
      "Name": "Atleti Azzurri d'Italia",
      "Lat": 45.709200, 
      "Long": 9.680845,
      "Img": "https://ips.plug.it/cips/sport.virgilio.it/cms/2018/04/stadio-atleti-azzurri-ditalia_1115862supereva.jpg",
      "Team": "Atalanta Bergamasca Calcio"
    },
    {
      "Name": "Ciro Vigorito",
      "Lat": 41.116562, 
      "Long": 14.781080,
      "Img": "http://www.sannionews24.it/benevento/wp-content/uploads/2017/08/WP_20170812_19_57_16_Pro.jpg",
      "Team": "Benevento Calcio"
    },
    {
      "Name": "Marc'Antonio Bentegodi",
      "Lat": 45.435323, 
      "Long": 10.968628,
      "Img": "http://stadiumdb.com/pictures/stadiums/ita/marc_antonio_bentegodi/marc_antonio_bentegodi02.jpg",
      "Team": "Associazione Calcio ChievoVerona"
    },
    {
      "Name": "Ezio Scida",
      "Lat": 39.079291, 
      "Long": 17.116660,
      "Img": "http://www.fotopipita.it/wp-content/uploads/2014/11/stadio.jpg",
      "Team": "Football Club Crotone"
    },
    {
      "Name": "Sardegna Arena",
      "Lat": 39.199549, 
      "Long": 9.135000,
      "Img": "https://images.performgroup.com/di/library/GOAL/7d/b4/sardegna-arena-cagliari-070218_ldokv9agxnwf1qc5l1wbndlct.jpg?t=1907738353",
      "Team": "Cagliari Calcio"
    },
    {
      "Name": "Artemio Franchi",
      "Lat": 43.780835, 
      "Long": 11.282572,
      "Img": "http://www.football-wallpapers.com/w/clubs/fiorentina/artemio-franchi-wallpaper.jpg",
      "Team": "Associazione Calcio Fiorentina"
    },
    {
      "Name": "Luigi Ferraris",
      "Lat": 44.416513, 
      "Long": 8.952512,
      "Img": "https://i.pinimg.com/originals/70/02/04/7002047fa289f6d776db312dea0ab7b8.jpg",
      "Team": "Genoa Cricket and Football Club / Unione Calcio Sampdoria"
    },
    {
      "Name": "Giuseppe Meazza",
      "Lat": 45.478124, 
      "Long": 9.123962,
      "Img": "https://i0.wp.com/www.micontenidovirtual.info/wp-content/uploads/2016/11/sansiro.jpg?fit=1920%2C1080",
      "Team": "Football Club Internazionale Milano"
    },
    {
      "Name": "Juventus Stadium",
      "Lat": 45.109569, 
      "Long": 7.641264,
      "Img": "https://archinect.imgix.net/uploads/aq/aqtlm6a5z9jjppeo.jpg?auto=compress%2Cformat",
      "Team": "Juventus Football Club"
    },
    {
      "Name": "Olímpico",
      "Lat": 41.934077, 
      "Long": 12.454725,
      "Img": "https://i.pinimg.com/originals/66/fb/10/66fb1083e4d56701cc1a2da5516ba8dc.jpg",
      "Team": "Società Sportiva Lazio / Associazione Sportiva Roma"
    },
    {
      "Name": "San Siro",
      "Lat": 45.477675, 
      "Long": 9.123544,
      "Img": "https://upload.wikimedia.org/wikipedia/commons/5/50/San_Siro_2011.jpg",
      "Team": "Associazione Calcio Milan"
    },
    {
      "Name": "San Paolo",
      "Lat": 40.827936, 
      "Long": 14.193061,
      "Img": "https://futbolmania12jugador.files.wordpress.com/2012/05/f-269.jpg",
      "Team": "Società Sportiva Calcio Napoli"
    },
    {
      "Name": "MAPEI - Città del Tricolore",
      "Lat": 44.714541, 
      "Long": 10.649722,
      "Img": "http://estaticos02.marca.com/imagenes/2015/02/16/futbol/futbol_femenino/1424107316_extras_noticia_foton_7_2.jpg",
      "Team": "Unione Sportiva Sassuolo Calcio"
    },
    {
      "Name": "Paolo Mazza",
      "Lat": 44.840172, 
      "Long": 11.607957,
      "Img": "http://www.atuttocalcio.tv/uploads/news/1472923571-96-stadiogransasso.jpg",
      "Team": "Sociedad Polideportiva Ars et Labor 2013"
    },
    {
      "Name": "Olímpico Grande Torino",
      "Lat": 45.041823, 
      "Long": 7.650052,
      "Img": "https://img.vavel.com/stadio-olimpico-di-torino-1155306170.jpg",
      "Team": "Torino Football Club"
    },
    {
      "Name": "Friuli-Dacia Arena",
      "Lat": 46.081488, 
      "Long": 13.199805,
      "Img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/DaciArena.jpg/1200px-DaciArena.jpg",
      "Team": "Udinese Calcio"
    },
  ];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform: Platform,
    private geolocation: Geolocation,
    public modalCtrl: ModalController,
    public menuController: MenuController
  ) {

    platform.ready().then(() =>{
      this.obtenerPosicion();

    this.menu = menuController;
    this.menu.enable(true, "MyMenu")
    })
  }
 
  loadMap() {

    var latlng = new google.maps.LatLng(41.792639, 13.281491);
    let mapContainer = document.getElementById('mapItaly');
    this.mapItaly = new google.maps.Map(mapContainer, {
      center: latlng,
      zoom: 5
    });

    let miMarker = new google.maps.Marker({
      icon: 'assets/imgs/marker.png',
      map: this.mapItaly,
      position: this.coords,
      title: 'Mi posición'
    })
    this.addMarker(this.mapItaly);
    
  };

  obtenerPosicion():any {
    this.geolocation.getCurrentPosition().then(res => {
      this.coords.lat = res.coords.latitude;
      this.coords.lng = res.coords.longitude;

      this.loadMap();
    })
    .catch(
      (error)=>{
        console.log(error);
      }
    )
  }

  addMarker(map) {
    for (var i = 0; i < this.stadiums.length; i++) {
      var stadium = this.stadiums[i];
      var marker = new google.maps.Marker({
        position: {lat: stadium.Lat, lng: stadium.Long},
        map,
        icon: 'assets/imgs/estadio.png' 
      });
           
      var infoWindow = new google.maps.InfoWindow();
      (function (marker, stadium) {
        google.maps.event.addListener(marker, 'click', function(e) {
          var content = '<h1>' + stadium.Name + '</h1><hr/>' + '<p><strong>Equipo: </strong>' + stadium.Team + '</p>' + '<img src="'+ stadium.Img + '" width="250px" height="120px"/><br/><button ion-button full outline padding>Más información</button>';
          infoWindow.setContent(content);
          infoWindow.open(map, marker);
        });
      })(marker, stadium)
    };

  }
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad Italia');
  }

  distanciaEstadios() {
    let mimodal = this.modalCtrl.create('ModalDistanciaEstadiosPage', {coords: this.coords, stadiums: this.stadiums})    
    mimodal.present();
  }

}
