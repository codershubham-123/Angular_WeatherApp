import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import axios from 'axios';
import { Observable } from 'rxjs';
import { Country } from './model/country';
import { State } from './model/state';
import { City } from './model/city';
import { CountrystatecityService } from './services/countrystatecity.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather';


  constructor( private http: HttpClient, private CountrystatecityService: CountrystatecityService){}

  listcountry !: Country[]
  countrySelected !: string
  listState !: State[]
  selectedState !: string
  listCity !: City[]


  ngOnInit(){
    this.fetchCountry();
  }
  private fetchCountry() {
    this.CountrystatecityService.getCountry().subscribe(data=>{
      this.listcountry = data
      console.log('Countries fetched', this.listcountry)
    })
  }

  onCountrySelected(countryIso : any){
    this.CountrystatecityService.getStateOfSelectedCountry(countryIso).subscribe(data=>{
      this.listState = data 
      console.log('States Retrieved', this.listState)
    })
  }

  onStateSelected(countryparam=this.countrySelected, stateparam= this.selectedState){
    this.CountrystatecityService.getCitiesOfSelectedState(countryparam, stateparam).subscribe(data=>{
      this.listCity = data
      console.log('Cities retrieved', this.listCity)
    })

  }

  
  


  

  array: any = []


  submit(data: any) {
    this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${data.city}&appid=63cfe938a09ada9e27d7f5e19a230ba8`).subscribe(res => {
      console.log(res);
      this.array = [res]
    let x  = <HTMLElement> document.querySelector("#myDiv");
       x.innerHTML = " "
    },
    ()=> {
       let x  = <HTMLElement> document.querySelector("#myDiv");
       x.innerHTML = "Please select a country"
    })
  }

}
