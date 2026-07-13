import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from '../button/button';
import { LucideUser, LucideShoppingCart, LucideLogOut } from '@lucide/angular';

@Component({
  selector: 'app-header',
  templateUrl: './header.html',
  imports: [RouterLink, Button, LucideUser, LucideShoppingCart, LucideLogOut],
})
export class Header {}
