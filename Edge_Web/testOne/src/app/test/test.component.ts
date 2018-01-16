import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../app.httpService';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: [HttpService]
})
export class TestComponent implements OnInit {

  arduinoData: any;
  array: any = [];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    let _base = this;
    setInterval(function () {

      /**Getting arduino values from server */
      _base.httpService.getData().then(function (success: any) {
        _base.arduinoData = success;
        for (let i = 0; i < _base.arduinoData.ArduinoData.length; i++) {
          _base.array.push(_base.arduinoData.ArduinoData[i].value);
          console.log(_base.array);
        }
      }, function (error) {
        console.log(error);
      });
    }, 500);
  }
}
