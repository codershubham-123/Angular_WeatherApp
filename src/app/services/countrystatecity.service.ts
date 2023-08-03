import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Country } from '../model/country';

@Injectable({
  providedIn: 'root'
})
export class CountrystatecityService {


  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers : new HttpHeaders({
      'Content-type': 'application/json',
      'X-CSCAPI-KEY' : 'cjNLMEZpWlhlenk1WjBjQVBGd2JsWHdkR0hwam52T3J0cmd0VVB2ZQ=='
    })
  }

  getCountry(): Observable<Country[]>{
    return this.httpClient.get<Country[]>('https://api.countrystatecity.in/v1/countries',
     {headers : this.httpOptions.headers})
  }

  getStateOfSelectedCountry(countryIso : string): Observable<any>{
    return this.httpClient.get(`https://api.countrystatecity.in/v1/countries/${countryIso}/states`, 
    {headers : this.httpOptions.headers} )
  }



  getCitiesOfSelectedState(countryIso: any, stateIso: any):Observable<any>{
    return this.httpClient.get(`https://api.countrystatecity.in/v1/countries/${countryIso}/states/${stateIso}/cities`,
    {headers : this.httpOptions.headers})
  }

}
