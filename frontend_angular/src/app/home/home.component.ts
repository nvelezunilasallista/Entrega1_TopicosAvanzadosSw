import { CommonModule, NgFor } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [NgFor, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  public productList: any[] = [];
  public selectedProduct: any; 
  public selectedPLU: string = "";
  public selectedMaxUnits: number = 0;
  public unitsToSell: number = 1; 
  public isModalOpen: boolean = false;
  public showError: boolean = false;
  public showOk : boolean = false;
  
  constructor(private router: Router, private http: HttpClient){}

  ngOnInit() {
    var session = sessionStorage.getItem('token');

    if(session == null || session.trim() == ''){
      this.router.navigate(['/login']);
    }

    this.loadCourses();
  }

  loadCourses(){
    
    var url = "http://localhost:6542/api/seller/getAvailableProducts";

    var token = sessionStorage.getItem('token');

    var headers = new HttpHeaders().set(
      'Content-Type', 'application/json',  
    );

    headers = headers.append('Authorization', token!);

    this.http.get(url, {headers}).subscribe({
      next: (resp: any) => {
        this.productList = resp
      },
      error: err =>{
        console.error(err);
      }
    });

  }

  logOut(){
    sessionStorage.removeItem("token");
    this.router.navigate(['/login']);
  }

  navigateToCreateCourse(){
    this.router.navigate(['/createcourse']);
  }


  openSellModal(product: any){
    this.selectedProduct = product;
    this.selectedMaxUnits = product.unitsAvailable;
    this.selectedPLU = product.plu;

    (window as any).openSellModal();
  }


  sellProduct() {
    if (this.unitsToSell > 0 && this.unitsToSell <= this.selectedProduct.unitsAvailable) {

      var url = "http://localhost:6542/api/seller/registerSale";
      var token = sessionStorage.getItem('token');

      var headers = new HttpHeaders().set(
        'Content-Type', 'application/json'
      );

      headers = headers.append('Authorization', token!);

      var body = {
        'plu': this.selectedPLU,
        'quantity': this.unitsToSell
      }

      this.http.post(url, body, {headers}).subscribe({
        next: (resp: any) => {
          this.showOk = true;
          this.showError= false;
        },
        error: err =>{
          this.showError= true;
          this.showOk = false;
        }
      });

    } else {
      alert('Por favor, ingrese un número válido de unidades a vender.');
    }
  }
}
