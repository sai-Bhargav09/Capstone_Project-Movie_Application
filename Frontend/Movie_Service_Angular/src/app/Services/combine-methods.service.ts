import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CombineMethodsService {

  constructor() { }

  ngOnInit(): void {
  }

  images:String[]=[];
  imageno: any;

  addUserImage(i: any) {
    if (i == '/assets/c488340ad56e5454f4576f6c708b63aa.png') {
      this.imageno = 1;
      this.images.length=0;
      this.images.push(i);
      return this.imageno;
    }
    else if (i == '/assets/chick.png') {
      this.imageno = 2;
      this.images.length=0;
      this.images.push(i);
      return this.imageno;
    }
    else if (i == '/assets/flat,1000x1000,075,f.u2.png') {
      this.imageno = 3;
      this.images.length=0;
      this.images.push(i);
      return this.imageno;
    }
    else if (i == '/assets/images.png') {
      this.imageno = 4;
      this.images.length=0;
      this.images.push(i);
      return this.imageno;
    }
    else if(i =='/assets/Netflix-avatar.png'){
      this.imageno = 5;
      this.images.length=0;
      this.images.push(i);
      return this.imageno;
    }
  }


  userImage: any;
  isUserAdmin: boolean = false;

  getProfileImage() {
    if (localStorage.getItem('userImage') == "1") {
      this.userImage = "assets/c488340ad56e5454f4576f6c708b63aa.png";
      return this.userImage;
    }
    else if (localStorage.getItem('userImage') == "2") {
      this.userImage = "assets/chick.png";
      return this.userImage;
    }
    else if (localStorage.getItem('userImage') == "3") {
      this.userImage = "assets/flat,1000x1000,075,f.u2.png";
      return this.userImage;
    }
    else if (localStorage.getItem('userImage') == "4") {
      this.userImage = "assets/images.png";
      return this.userImage;
    }
    else if (localStorage.getItem('userImage') == "5") {
      this.userImage = "assets/Netflix-avatar.png";
      return this.userImage;
    }
    if (localStorage.getItem('userRole') == "ROLE_ADMIN") {
      this.isUserAdmin = true;
    }
    else { this.isUserAdmin = false; }
  }
}
