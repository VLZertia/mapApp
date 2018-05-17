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
  selector: 'page-spain',
  templateUrl: 'spain.html',
})
export class SpainPage {

  menu: any;
  directionsRenderer:any;
  mapSpain: any;
  coords: any = { lat: 0, lng: 0 };
  
  stadiums = [
    {
      "Name": "Camp Nou",
      "Lat": 41.380896, 
      "Long": 2.1206311,
      "Img": "http://tourtravelandmore.com/wp-content/uploads/2016/10/barcelona-footbal-fanatics-private-tour.jpg",
      "Team": "Fútbol Club Barcelona",
      "Shield": "https://i.pinimg.com/originals/97/83/52/97835265b9dc0904c5986f192853454d.png",
    },
    {
      "Name": "Santiago Bernabeu",
      "Lat": 40.4530541, 
      "Long": -3.6883445,
      "Img": "https://images.musement.com/default/0001/28/madrid-highlights-tickets-and-guided-visit-of-santiago-bernabeu-stadium_header-27388.jpeg?w=600&h=315&crop=edges",
      "Team": "Real Madrid Club de Fútbol",
      "Shield": "http://viniloslowcost.es/2268-large_default/vinilo-escudo-real-madrid.jpg",
    },
    {
      "Name": "Wanda Metropolitano",
      "Lat": 40.4362517, 
      "Long": -3.6003323,
      "Img": "https://assets.change.org/photos/9/wm/up/KTWMupUPmlNDdVn-800x450-noPad.jpg?1513528430",
      "Team": "Club Atlético de Madrid",
      "Shield": "http://as00.epimg.net/img/comunes/fotos/fichas/equipos/large/42.png",
    },
    {
      "Name": "Mestalla",
      "Lat": 39.4746042, 
      "Long": -0.358225,
      "Img": "https://i.pinimg.com/originals/47/3a/77/473a7769ca2d8649d61fac974f8c6ae6.jpg",
      "Team": "Valencia Club de Fútbol",
      "Shield": "http://as00.epimg.net/img/comunes/fotos/fichas/equipos/large/17.png",
    },
    {
      "Name": "Ramón Sánchez Pizjuán",
      "Lat": 37.3840655, 
      "Long": -5.9706902,
      "Img": "http://sextoanillo.com/wp-content/uploads/2016/09/2015_0825_12533400.jpg",
      "Team": "Sevilla Fútbol Club",
      "Shield": "http://as00.epimg.net/img/comunes/fotos/fichas/equipos/large/53.png",
    },
    {
      "Name": "Balaidos",
      "Lat": 42.212398, 
      "Long": -8.740087,
      "Img": "https://i.avoz.es/default/2017/11/20/00121511181421553269495/Foto/SLN30V24F1_133529.jpg",
      "Team": "Real Club Celta de Vigo",
      "Shield": "https://www.tenvinilo.com/vinilos-decorativos/img/preview/vinilo-decorativo-escudo-celta-de-vigo-525.png",
    },
    
    {
      "Name": "Anoeta",
      "Lat": 43.301393, 
      "Long": -1.973682,
      "Img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Donostia-San_Sebasti%C3%A1n_Anoeta_Stadium_1.jpg/1200px-Donostia-San_Sebasti%C3%A1n_Anoeta_Stadium_1.jpg",
      "Team": "Real Sociedad de Fútbol",
      "Shield": "http://as00.epimg.net/img/comunes/fotos/fichas/equipos/large/16.png",
    },
    {
      "Name": "Ipurua",
      "Lat": 43.181776, 
      "Long": -2.475968,
      "Img": "https://images.performgroup.com/di/library/goal_es/43/35/ipurua-eibar_17x12n0u9lxzk1x2zdun9a8u9q.jpg?t=-804994879",
      "Team": "Sociedad Deportiva Eibar",
      "Shield": "http://as00.epimg.net/img/comunes/fotos/fichas/equipos/large/108.png",
    },
    {
      "Name": "Montilivi",
      "Lat": 41.961210, 
      "Long": 2.828395,
      "Img": "http://as01.epimg.net/en/imagenes/2017/10/27/football/1509102131_098469_1509102717_noticia_normal.jpg",
      "Team": "Girona Fútbol Club",
      "Shield": "http://as00.epimg.net/img/comunes/fotos/fichas/equipos/large/648.png",
    },
    {
      "Name": "RCDE Stadium",
      "Lat": 41.347981, 
      "Long": 2.074764,
      "Img": "https://upload.wikimedia.org/wikipedia/commons/4/47/EstadioRCDE_Pano.jpg",
      "Team": "Real Club Deportivo Español",
      "Shield": "http://as00.epimg.net/img/comunes/fotos/fichas/equipos/large/8.png",
    },
    {
      "Name": "Estadio de la Cerámica",
      "Lat": 39.943387, 
      "Long": -0.103939,
      "Img": "http://stadiumdb.com/pictures/stadiums/esp/el_madrigal/el_madrigal18.jpg",
      "Team": "Villarreal Club de Fútbol",
      "Shield": "http://as00.epimg.net/img/comunes/fotos/fichas/equipos/large/19.png",
    },    
    {
      "Name": "Benito Villamarín",
      "Lat": 37.356504, 
      "Long": -5.981752,
      "Img": "http://www.daplast.com/emarketing/ficheros/noticia49_30.jpg",
      "Team": "Real Betis Balompié",
      "Shield": "http://as00.epimg.net/img/comunes/fotos/fichas/equipos/large/171.png",
    }, 
    {
      "Name": "La Rosaleda",
      "Lat": 36.733580, 
      "Long": -4.426651,
      "Img": "https://www.estudiosegui.com/wp-content/uploads/2017/02/Estadio-de-La-Rosaleda-1-min.jpg",
      "Team": "Málaga Club de Fútbol",
      "Shield": "http://i44.tinypic.com/2wdwmef.png",
    }, 
    {
      "Name": "Butarque",
      "Lat": 40.340517, 
      "Long": -3.760374,
      "Img": "http://as01.epimg.net/futbol/imagenes/2018/03/22/primera/1521751874_898308_1521752012_noticia_normal.jpg",
      "Team": "Club Deportivo Leganés",
      "Shield": "http://www.escudosdefutbolyequipaciones.com/descargar.php?tipo=esc&idEscudo=970&nombreEscudo=C.D.+LEGANES&dominio=escudosdefutbolyequipaciones.com",
    },
    {
      "Name": "San Mamés",
      "Lat": 43.264135, 
      "Long": -2.949365,
      "Img": "https://visitsanmames.com/wp-content/uploads/2017/06/catedral-futbol-san-mames-stadium-bilbao.jpg",
      "Team": "Athletic Club",
      "Shield": "http://as00.epimg.net/img/comunes/fotos/fichas/equipos/large/5.png",
    }, 
    {
      "Name": "Riazor",
      "Lat": 43.368718, 
      "Long": -8.417484,
      "Img": "https://www.riazor.org/wp-content/uploads/2017/03/Riazor-M-011.jpg",
      "Team": "Real Club Deportivo de La Coruña",
      "Shield": "http://as00.epimg.net/img/comunes/fotos/fichas/equipos/large/7.png",
    }, 
    {
      "Name": "Coliseum Alfonso Pérez",
      "Lat": 40.325727, 
      "Long": -3.714940,
      "Img": "https://www.bmshqip.com/wp-content/uploads/2017/09/DJ2J2jFU8AAR2To.jpg",
      "Team": "Getafe Club de Fútbol",
      "Shield": "https://i.pinimg.com/originals/24/02/ed/2402ed9575b3f5595beaea5203bdbb98.png",
    }, 
    {
      "Name": "Estadio Gran Canaria",
      "Lat": 28.100406, 
      "Long": -15.456746,
      "Img": "https://opincan.es/wp-content/uploads/2016/09/2DDBE377-A8CB-4E92-A191-1142F8DC65CB.jpg",
      "Team": "Unión Deportiva Las Palmas",
      "Shield": "http://3.bp.blogspot.com/_5aoxzAmxfp4/R3QU2owK1QI/AAAAAAAAAY4/IMQSHISi7Mk/s400/zzzzzzzz.png",
    },
    {
      "Name": "Mendizorroza",
      "Lat": 42.837086, 
      "Long": -2.688244,
      "Img": "http://as01.epimg.net/futbol/imagenes/2016/12/23/primera/1482510434_744148_1482510499_noticia_normal.jpg",
      "Team": "Deportivo Alavés",
      "Shield": "https://statics.proyectoclubes.com/images/escudos/escudo-alaves.png",
    }, 
    {
      "Name": "Ciudad de Valencia",
      "Lat": 39.494898, 
      "Long": -0.365055,
      "Img": "http://www.weloba.es/sites/default/files/styles/full_width/public/images/general/ciutat_valencia.jpg?itok=vgid-AOF",
      "Team": "Levante Unión Deportiva",
      "Shield": "http://futadition.com/wp-content/uploads/2017/12/vinilos-decorativos-escudo-levante-ud.png",
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

    var latlng = new google.maps.LatLng(40, -4);
    let mapContainer = document.getElementById('mapSpain');
    this.mapSpain = new google.maps.Map(mapContainer, {
      center: latlng,
      zoom: 5
    });

    let miMarker = new google.maps.Marker({
      icon: 'assets/imgs/marker.png',
      map: this.mapSpain,
      position: this.coords,
      title: 'Mi posición'
    })
    this.addMarker(this.mapSpain, this.coords, this.directionsRenderer);

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
                        + '" width="250px" height="120px"/><br/><br/><button ion-button full outline padding>Más información</button>';
          infoWindow.setContent(content);
          infoWindow.open(map, marker);

          var objConfigDR = {
            map: map
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
       
      })(marker, stadium);
    };
  }

  /*
  rutaEstadios () {
    
    var objConfigDR = {
      map: this.mapSpain
    }
    var objConfigDS = {
      origin: this.coords,
      destination: 'Madrid, España',
      travelMode: google.maps.TravelMode.DRIVING
    }  

    var ds = new google.maps.DirectionsService ( ); 
    var dr = new google.maps.DirectionsRenderer (
      objConfigDR
    );

    ds.route ( objConfigDS, fnRutear );

    function fnRutear ( resultados, status ) {
      if( status == 'OK' ) {
        dr.setDirections( resultados );
      }else{
        alert( 'Error' + status );
      }
    }
}
*/
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad España');
  }

  distanciaEstadios() {
    let mimodal = this.modalCtrl.create('ModalDistanciaEstadiosPage', {coords: this.coords, stadiums: this.stadiums})    
    mimodal.present();
    console.log(this.coords);
  }

}
