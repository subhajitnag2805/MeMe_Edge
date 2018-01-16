//import modules
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {
    //provide the base url
    private url = 'http://localhost:7000';
    private headerOptions = new RequestOptions({
        headers: new Headers({ 'Content-Type': 'application/json;charset=UTF-8' })
    });

    constructor(private http: Http) { }

    public getData() {
        let _base = this;
        console.log("Http service");
        return new Promise(function (resolve, reject) {
            _base.http.get(_base.url + "/dataDetails", _base.headerOptions)
                .map(response => response.json()).
                subscribe(res => {
                    console.log("res :", res);
                    resolve(res);
                }, function (error) {
                    console.log("error :", error);
                    reject(error)
                });
        });
    }
}