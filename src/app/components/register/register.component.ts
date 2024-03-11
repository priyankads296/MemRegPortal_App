import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterDetails } from 'src/app/models/register.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  repeatPass: string='none';
  registerDetails: RegisterDetails={
    Firstname:'',
    Lastname:'',
    Username:'',
    Password:'',
    Phoneno:'',
   
  }
  constructor(private router:Router,private authService:AuthService){}
 
  ngOnInit(): void {
   
  
   }
   registerForm=new FormGroup({
    firstname: new FormControl("",[Validators.required,
      Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
    // lastname:['',Validators.required],
    // username:['',Validators.required],
    // password:['',Validators.required],
    // confirmpassword:['',Validators.required]
    lastname:new FormControl("",[Validators.required,
      Validators.minLength(2),Validators.pattern("[a-zA-Z].*")]),
    username:new FormControl("",[Validators.required,
      Validators.minLength(2),Validators.email]),
    password:new FormControl("",[Validators.required,
      Validators.minLength(6),
      Validators.maxLength(15)]),
    confirmpassword:new FormControl(""),
    phoneno:new FormControl("",[Validators.required,Validators.minLength(10),
      Validators.maxLength(10)])
  });
  onSubmit()
   {
    if(this.Password.value==this.ConfirmPassword.value)
    {
      console.log(this.registerForm.valid);
      this.repeatPass='none';

      this.authService.registerUser(this.registerDetails).subscribe((res: any) => {
        console.log(res);
        if(res.IsSuccess==false)
          alert(res.Message);
        else
        {
          alert(res.Message);
          this.router.navigateByUrl("login");
        }
  
        
          
      })
    }else
    {
      this.repeatPass='inline'
    }
    
   }
   get Firstname(): FormControl{
    return this.registerForm.get("firstname") as FormControl;
  }
  get Lastname(): FormControl{
    return this.registerForm.get("lastname") as FormControl;
  }
  get Username(): FormControl{
    return this.registerForm.get("username") as FormControl;
  }
  get Password(): FormControl{
    return this.registerForm.get("password") as FormControl;
  }
  
  get ConfirmPassword(): FormControl{
      return this.registerForm.get("confirmpassword") as FormControl;
    }
  get Phoneno(): FormControl{
    return this.registerForm.get("phoneno") as FormControl;
  }
     
}
