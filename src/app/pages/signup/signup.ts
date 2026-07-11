import { Component } from '@angular/core';
import { Button } from '../../shared/components/button/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'signup-page',
  templateUrl: './signup.html',
  host: {
    class: 'min-h-screen flex items-center justify-center bg-slate-100 p-4',
  },
  imports: [Button, RouterLink],
})
export class SignupPage {}
