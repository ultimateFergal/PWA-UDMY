import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-auth',
  templateUrl: './card-auth.component.html',
  styleUrls: ['./card-auth.component.scss']
})
export class CardAuthComponent implements OnInit {

  title: string;
  public nowDateTime: string;
  clientIp: string;

  options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true};

  constructor() {

    setInterval(() => {
      this.nowDateTime = new Date().toLocaleDateString('es-ES', this.options).replace('p. m.', 'PM').replace('a. m.', 'AM');
    }, 1);

  }

  ngOnInit() {

    // this.nowDate = new Date().toString();
    this.getIPAddress();
  }

   getIPAddress = function() {
    fetch('http://www.geoplugin.net/json.gp').then(resp => {
      resp.json()
        .then(respObj => {
          this.clientIp = respObj.geoplugin_request;
        });
      });
    };

}
