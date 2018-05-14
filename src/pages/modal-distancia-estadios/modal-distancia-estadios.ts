import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

declare var google:any;

@IonicPage()
@Component({
  selector: 'page-modal-distancia-estadios',
  templateUrl: 'modal-distancia-estadios.html',
})
export class ModalDistanciaEstadiosPage {

  coords = '';
  stadiums = [];

  directions = [];
  
  visible = true;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private viewCtrl: ViewController,  
  
  ) {
    this.coords=navParams.get('coords');
    this.stadiums=navParams.get('stadiums');    
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalDistanciaEstadiosPage');

    this.calcularDistancia();
    
  }

  toggleItem() {
    this.visible = !this.visible;
  }

  calcularDistancia() {
    
    var start = this.coords;
    var end = [];
    var resultDirections = this.directions;
    var stadiumsL = this.stadiums;

    for (var x = 0; x < stadiumsL.length; x ++) {
    
      var posicion = new google.maps.LatLng(stadiumsL[x].Lat, stadiumsL[x].Long);  

      end.push(posicion);
    }
      
    var service = new google.maps.DistanceMatrixService();
    var settings = {
      origins: [start],
      destinations: end,
      travelMode: google.maps.TravelMode.DRIVING, 
      unitSystem: google.maps.DirectionsUnitSystem.METRIC,  
    }

    service.getDistanceMatrix(settings, callback);

    function callback(response, status) {

    if (status == google.maps.DistanceMatrixStatus.OK) {

      var origins = response.originAddresses;

      for (var i = 0; i < origins.length; i++) {

        var results = response.rows[i].elements;

        for (var j = 0; j < results.length; j++) {
          
          var element = results[j];

          var distance = element.distance.text;
          var duration = element.duration.text;
          var value = element.duration.value;
          
          resultDirections.push({Distance: distance, Duration: duration, Name: stadiumsL[j].Name, durationValue: value});
          
          resultDirections.sort(function (a, b) {
            if (a.durationValue > b.durationValue) {
              return 1;
            }
            if (a.durationValue < b.durationValue) {
              return -1;
            }
            return 0;
          });
        }
      }
    }
  }
}
  
cerrarModal() {
    this.viewCtrl.dismiss();
}   

}
