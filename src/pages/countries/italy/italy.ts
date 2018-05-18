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
  directionsRenderer:any;
  mapItaly: any;
  coords: any = { lat: 0, lng: 0 };
  
  stadiums = [
    {
      "Name": "Atleti Azzurri d'Italia",
      "Lat": 45.709200, 
      "Long": 9.680845,
      "Img": "https://ips.plug.it/cips/sport.virgilio.it/cms/2018/04/stadio-atleti-azzurri-ditalia_1115862supereva.jpg",
      "Team": "Atalanta Bergamasca Calcio",
      "Shield": "https://4.bp.blogspot.com/-fhawSf1H8vA/Wdgo_KUIJgI/AAAAAAAAGtA/4nP4KZKSBOQzVVoWV_o76WJYZWBi6ZpywCEwYBhgL/s1600/escudo1.png"
    },
    {
      "Name": "Ciro Vigorito",
      "Lat": 41.116562, 
      "Long": 14.781080,
      "Img": "http://www.sannionews24.it/benevento/wp-content/uploads/2017/08/WP_20170812_19_57_16_Pro.jpg",
      "Team": "Benevento Calcio",
      "Shield": "https://2.bp.blogspot.com/-ICB-68qnHGg/WVd2xirrhYI/AAAAAAABK4A/1q637y1VTScSBgPIoANMsCK2lVyUYRaWgCLcBGAs/s1600/Benevento%2BCalcio.png"
    },
    {
      "Name": "Marc'Antonio Bentegodi",
      "Lat": 45.435323, 
      "Long": 10.968628,
      "Img": "http://stadiumdb.com/pictures/stadiums/ita/marc_antonio_bentegodi/marc_antonio_bentegodi02.jpg",
      "Team": "Associazione Calcio ChievoVerona",
      "Shield": "http://as00.epimg.net/img/comunes/fotos/fichas/equipos/large/1351.png"
    },
    {
      "Name": "Ezio Scida",
      "Lat": 39.079291, 
      "Long": 17.116660,
      "Img": "http://www.fotopipita.it/wp-content/uploads/2014/11/stadio.jpg",
      "Team": "Football Club Crotone",
      "Shield": "https://4.bp.blogspot.com/--ixDYNPRYxE/WEijQsUF1AI/AAAAAAAAEik/iDdoxZGX02c-DFruhnRw1qhRlI08PMxfgCEw/s1600/escudo4.png"
    },
    {
      "Name": "Sardegna Arena",
      "Lat": 39.199549, 
      "Long": 9.135000,
      "Img": "https://images.performgroup.com/di/library/GOAL/7d/b4/sardegna-arena-cagliari-070218_ldokv9agxnwf1qc5l1wbndlct.jpg?t=1907738353",
      "Team": "Cagliari Calcio",
      "Shield": "http://2.bp.blogspot.com/-vuplXkkIc5g/U9ACpzUQ3YI/AAAAAAAAo64/Re-h_Bdv1bE/s1600/Cagliari+Calcio-ITA.gif"
    },
    {
      "Name": "Artemio Franchi",
      "Lat": 43.780835, 
      "Long": 11.282572,
      "Img": "https://i.pinimg.com/originals/67/fa/0e/67fa0e532cd63fd6d17c331d9d9bd97d.jpg",
      "Team": "Associazione Calcio Fiorentina",
      "Shield": "https://3.bp.blogspot.com/-X6iRKnF8Cuw/WEIXJCmLgTI/AAAAAAAAEfs/eb3W1nw0faM0sXCi1g5ymSNAU_Xj0RpsQCEw/s1600/escudo1.png"
    },
    {
      "Name": "Luigi Ferraris",
      "Lat": 44.416513, 
      "Long": 8.952512,
      "Img": "https://i.pinimg.com/originals/70/02/04/7002047fa289f6d776db312dea0ab7b8.jpg",
      "Team": "Genoa Cricket and Football Club",
      "Shield": "https://1.bp.blogspot.com/-wpMgdWAGwDM/WDxEoaiUCsI/AAAAAAAAEa4/l51fHHERMKMiCXe6AOtaZs_3y1mFI26agCEw/s1600/escudo4.png"
    },
    {
      "Name": "Luigi Ferraris",
      "Lat": 44.416225, 
      "Long": 8.953081,
      "Img": "https://i.pinimg.com/originals/70/02/04/7002047fa289f6d776db312dea0ab7b8.jpg",
      "Team": "Unione Calcio Sampdoria",
      "Shield": "http://as00.epimg.net/img/comunes/fotos/fichas/equipos/large/130.png"
    },
    {
      "Name": "Giuseppe Meazza",
      "Lat": 45.478124, 
      "Long": 9.123962,
      "Img": "https://i0.wp.com/www.micontenidovirtual.info/wp-content/uploads/2016/11/sansiro.jpg?fit=1920%2C1080",
      "Team": "Football Club Internazionale Milano",
      "Shield": "https://vignette.wikia.nocookie.net/inter/images/7/77/Escudo_del_Inter_de_Mil%C3%A1n.png/revision/latest?cb=20131028153244&path-prefix=es"
    },
    {
      "Name": "Juventus Stadium",
      "Lat": 45.109569, 
      "Long": 7.641264,
      "Img": "https://archinect.imgix.net/uploads/aq/aqtlm6a5z9jjppeo.jpg?auto=compress%2Cformat",
      "Team": "Juventus Football Club",
      "Shield": "https://2.bp.blogspot.com/-3NNyUD_tCcc/WU_FWvr_xvI/AAAAAAABJuI/P1kFMzQeDNIZU1rDP-_8Iw_19dFSMiWDwCLcBGAs/s1600/Juventus%2BFC.png"
    },
    {
      "Name": "Olímpico",
      "Lat": 41.934077, 
      "Long": 12.454725,
      "Img": "https://i.pinimg.com/originals/66/fb/10/66fb1083e4d56701cc1a2da5516ba8dc.jpg",
      "Team": "Società Sportiva Lazio",
      "Shield": "http://1.bp.blogspot.com/_5aoxzAmxfp4/SaQRuD6KpuI/AAAAAAAABDU/ealZ7IlXNjA/s400/zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz3.png"
    },
    {
      "Name": "Olímpico",
      "Lat": 41.933393, 
      "Long": 12.455015,
      "Img": "https://i.pinimg.com/originals/66/fb/10/66fb1083e4d56701cc1a2da5516ba8dc.jpg",
      "Team": "Associazione Sportiva Roma",
      "Shield": "http://1.bp.blogspot.com/-qtIcFC60Zbw/UHyN6ZRMoQI/AAAAAAAABOw/OnY7p6q7c-E/s1600/AS-Roma.png"
    },
    {
      "Name": "San Siro",
      "Lat": 45.477675, 
      "Long": 9.123544,
      "Img": "https://upload.wikimedia.org/wikipedia/commons/5/50/San_Siro_2011.jpg",
      "Team": "Associazione Calcio Milan",
      "Shield": "https://4.bp.blogspot.com/-XUJIi4v8gQg/WbWDL8CTUXI/AAAAAAAAGgs/0spBWDAYD9oHVEDDYwAUXLjGMO594Gx7ACLcBGAs/s1600/ESCUDO2.png"
    },
    {
      "Name": "San Paolo",
      "Lat": 40.827936, 
      "Long": 14.193061,
      "Img": "https://futbolmania12jugador.files.wordpress.com/2012/05/f-269.jpg",
      "Team": "Società Sportiva Calcio Napoli",
      "Shield": "https://2.bp.blogspot.com/-iTNcVwwOkJ8/WDOpbqDr92I/AAAAAAAAEW0/R8V7qZ7O95oN7-kUfhTbNDdRsaz7Y5f7ACEw/s1600/escudo2.png"
    },
    {
      "Name": "MAPEI - Città del Tricolore",
      "Lat": 44.714541, 
      "Long": 10.649722,
      "Img": "http://estaticos02.marca.com/imagenes/2015/02/16/futbol/futbol_femenino/1424107316_extras_noticia_foton_7_2.jpg",
      "Team": "Unione Sportiva Sassuolo Calcio",
      "Shield": "https://i.pinimg.com/originals/8b/db/03/8bdb03bebfabaa54abaf27a9abfc314c.png"
    },
    {
      "Name": "Paolo Mazza",
      "Lat": 44.840172, 
      "Long": 11.607957,
      "Img": "http://www.atuttocalcio.tv/uploads/news/1472923571-96-stadiogransasso.jpg",
      "Team": "Sociedad Polideportiva Ars et Labor 2013",
      "Shield": "https://2.bp.blogspot.com/-IkPR4C3LLP4/WVd8473mUYI/AAAAAAABK6U/aJMmidTf-OI8mUXmgp-yuhraDpwQh43rQCLcBGAs/s1600/SPAL%2B2013.png"
    },
    {
      "Name": "Olímpico Grande Torino",
      "Lat": 45.041823, 
      "Long": 7.650052,
      "Img": "https://img.vavel.com/stadio-olimpico-di-torino-1155306170.jpg",
      "Team": "Torino Football Club",
      "Shield": "https://1.bp.blogspot.com/-JB1aM8Z6bwE/WVd-CyuSrlI/AAAAAAABK6w/P7Jp3eXr_7wet-0mxYW17GzUIBw0dxL5QCLcBGAs/s1600/Torino%2BFC.png"
    },
    {
      "Name": "Friuli-Dacia Arena",
      "Lat": 46.081488, 
      "Long": 13.199805,
      "Img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/DaciArena.jpg/1200px-DaciArena.jpg",
      "Team": "Udinese Calcio",
      "Shield": "http://www.escudosdefutbolyequipaciones.com/descargar.php?tipo=esc&idEscudo=2063&nombreEscudo=UDINESE&dominio=escudosdefutbolyequipaciones.com"
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
    this.addMarker(this.mapItaly, this.coords, this.directionsRenderer);
    
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

  addMarker(map, currentCoords, directionsRenderer) {
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
          var content = '<h1>' + stadium.Name + '</h1><hr/>' + '<p><strong>Equipo: </strong>&nbsp' + stadium.Team + '&nbsp<img src="' 
                        + stadium.Shield + '" width="25px" height="25px"/></p>' + '<img src="'+ stadium.Img 
                        + '" width="250px" height="120px"/><br/><br/>';
          infoWindow.setContent(content);
          infoWindow.open(map, marker);

          var objConfigDR = {
            map: map,
            suppressMarkers: true,
          }
  
          var objConfigDS = {
            "origin": currentCoords,
            "destination": {
              "lat": stadium.Lat,
              "lng": stadium.Long
              },
            "travelMode": google.maps.TravelMode.DRIVING          }  
  
          var ds = new google.maps.DirectionsService ( ); 
  
          if(directionsRenderer != null )
          {
            directionsRenderer.setMap(null);  
          }
  
          directionsRenderer = new google.maps.DirectionsRenderer (
            objConfigDR
          );
  
  
            ds.route ( objConfigDS, function(resultados, status){
              if( status == 'OK' ) {
                directionsRenderer.setDirections( resultados );
              }else{
                alert( 'Error' + status );
              }            
            });
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
