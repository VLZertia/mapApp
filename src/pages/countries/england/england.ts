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
  selector: 'page-england',
  templateUrl: 'england.html',
})
export class EnglandPage {

  menu: any;

  mapEngland: any;
  coords: any = { lat: 0, lng: 0 };
  
  stadiums = [
    {
      "Name": "Emirates Stadium",
      "Lat": 51.554888, 
      "Long": -0.108438,
      "Img": "https://www.jigsawconferences.co.uk/storage/venue-gallery/emirates-stadium_503982ce550c7bc0fc18a83e152e9c7b93a.jpg",
      "Team": "Arsenal Football Club"
    },
    {
      "Name": "Vitality Stadium",
      "Lat": 50.735231, 
      "Long": -1.838279,
      "Img": "https://i.pinimg.com/originals/b9/e6/47/b9e647aaaa80330adc64a967334d1c07.jpg",
      "Team": "Athletic Football Club Bournemouth"
    },
    {
      "Name": "Amex Stadium",
      "Lat": 50.861565, 
      "Long": -0.083716,
      "Img": "http://www.marcadorint.com/wp-content/uploads/FIL-BRIGHTON-BOLTON-02.jpg",
      "Team": "Brighton and Hove Albion Football Club"
    },
    {
      "Name": "Turf Moor",
      "Lat": 53.789024, 
      "Long": -2.230174,
      "Img": "https://www.burnleyfootballclub.com/siteassets/image/turf-moor/turf-moor-empty-carousel.jpg/Large",
      "Team": "Burnley Football Club"
    },
    {
      "Name": "Stamford Bridge",
      "Lat": 51.481663, 
      "Long": -0.190956,
      "Img": "https://i0.wp.com/mochileroviajando.com/wp-content/uploads/2017/05/stamfordbridge03.jpg?fit=1200%2C675&ssl=1",
      "Team": "Chelsea Football Club"
    },
    {
      "Name": "Selhurst Park",
      "Lat": 51.398244, 
      "Long": -0.085596,
      "Img": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Selhurst_Park_Holmesdale_Stand.jpg/1200px-Selhurst_Park_Holmesdale_Stand.jpg",
      "Team": "Crystal Palace Football Club"
    },
    {
      "Name": "Goodison Park",
      "Lat": 53.438787, 
      "Long": -2.966319,
      "Img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVH9px1BTqBu43fNG09a4z7I6BkiPEfrQVmqQtGzqmA7zfPDuf",
      "Team": "Everton Football Club"
    },
    {
      "Name": "John Smith's Stadium",
      "Lat": 53.654282, 
      "Long": -1.768252,
      "Img": "http://www.kudosknowhow.co.uk/wp-content/uploads/2017/06/Huddersfield.jpg",
      "Team": "Huddersfield Town Association Football Club"
    },
    {
      "Name": "King Power Stadium",
      "Lat": 52.620366, 
      "Long": -1.142189,
      "Img": "https://www.foottheball.com/wp-content/uploads/2016/09/king-power-stadium-leicester-city.jpg",
      "Team": "Leicester City Football Club"
    },
    {
      "Name": "Anfield",
      "Lat": 53.430829, 
      "Long": -2.960830,
      "Img": "https://d.ibtimes.co.uk/en/full/1553872/anfield.jpg?w=736&e=26825e02d9b908216abece33a316c9a3",
      "Team": "Liverpool Football Club"
    },
    {
      "Name": "Etihad Stadium",
      "Lat": 53.483138, 
      "Long": -2.291340,
      "Img": "https://www.stokecityfc.com/sites/default/files/styles/focal_header_image_standard/public/1-Jan-2017%20-%2028-Feb-2017//cms_images//etihadstadium16x9226-516402_1600x900.jpg?itok=gyMIwT1C",
      "Team": "Manchester City Football Club"
    },
    {
      "Name": "Old Trafford",
      "Lat": 53.463059, 
      "Long": -2.200395,
      "Img": "https://www.thesun.co.uk/wp-content/uploads/2017/12/nintchdbpict000372256362-e1514059274402.jpg?strip=all&quality=100&w=1200&h=800&crop=1",
      "Team": "Manchester United Football Club"
    },
    {
      "Name": "St James' Park",
      "Lat": 54.975556, 
      "Long": -1.621667,
      "Img": "https://ninetyminutesonline.com/wp-content/uploads/2017/09/St.-James-Park.jpg",
      "Team": "Newcastle United Football Club"
    },
    {
      "Name": "St Mary's Stadium",
      "Lat": 50.905822, 
      "Long": -1.390954,
      "Img": "https://i.pinimg.com/originals/b1/ce/d9/b1ced9c84c137f6c080c01aad5a55dc4.jpg",
      "Team": "Southampton Football Club"
    },
    {
      "Name": "Bet365 Stadium",
      "Lat": 52.988391, 
      "Long": -2.175625,
      "Img": "https://www.stokecityfc.com/sites/default/files/styles/focal_header_image_standard/public/image/2018-03/bet365%20Stadium%20-%20169%20-%202400x1350%20-%20bet365%20Stadium_0.jpg?h=44b879e5&itok=XW8GPuqB",
      "Team": "Stoke City Football Club"
    },
    {
      "Name": "Liberty Stadium",
      "Lat": 51.642750, 
      "Long": -3.934586,
      "Img": "https://www.swanseacity.com/sites/default/files/styles/focal_header_image_wide/public/image/2017-08/Liberty%20Stadium%2021x9.jpg?h=e08dad33&itok=HXioqPvU",
      "Team": "Swansea City Association Football Club"
    },
    {
      "Name": "White Hart Lane",
      "Lat": 51.603212, 
      "Long": -0.065739,
      "Img": "http://stadiumdb.com/pictures/stadiums/eng/white_hart_lane/white_hart_lane39.jpg",
      "Team": "Tottenham Hotspur Football Club"
    },
    {
      "Name": "Vicarage Road",
      "Lat": 51.649906, 
      "Long": -0.401525,
      "Img": "https://d2vytzi9340kna.cloudfront.net/-/media/images/opposition-grounds/vicarage-road-day.jpg",
      "Team": "Watford Football Club"
    },
    {
      "Name": "The Hawthorns",
      "Lat": 52.509038, 
      "Long": -1.963938,
      "Img": "https://www.footballticketnet.com/files/images/venues_cover/Buy-The_Hawthorns-Football-Tickets-FootballTicketNet-Cover.png",
      "Team": "West Bromwich Albion Football Club"
    },
    {
      "Name": "Olímpico de Londres",
      "Lat": 51.538710, 
      "Long": -0.016604,
      "Img": "http://foto-cache.abc.es/jpg/0/6/1317667541960.jpg",
      "Team": "West Ham United Football Club"
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

    var latlng = new google.maps.LatLng(53.4807593, -2.2426305000000184);
    let mapContainer = document.getElementById('mapEngland');
    this.mapEngland = new google.maps.Map(mapContainer, {
      center: latlng,
      zoom: 6
    });

    let miMarker = new google.maps.Marker({
      icon: 'assets/imgs/marker.png',
      map: this.mapEngland,
      position: this.coords,
      title: 'Mi posición'
    })
    this.addMarker(this.mapEngland);
    
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
    console.log('ionViewDidLoad Inglaterra');
  }

  distanciaEstadios() {
    let mimodal = this.modalCtrl.create('ModalDistanciaEstadiosPage', {coords: this.coords, stadiums: this.stadiums})    
    mimodal.present();
  }

}
