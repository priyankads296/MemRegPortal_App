import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.css']
})
export class LogoutModalComponent {
  constructor(private route:ActivatedRoute,private loginAuth:AuthService,private router:Router){}

   onLogoutClick():void{
    console.log("User logged out successfully.");
    this.closeModal();
    this.loginAuth.removeToken();
    this.router.navigate(['login']);
   }
  closeModal():void {
    const modalElement=document.getElementById("logoutModal");
    if(modalElement){
      modalElement.classList.remove('show');
      modalElement.style.display='none';
      const modalBackdrop=document.querySelector('.modal-backdrop');
      if(modalBackdrop)
      {
        modalBackdrop.remove();
      }
    }
  }
}
