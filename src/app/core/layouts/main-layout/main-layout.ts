import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../../../shared/components/header/header';
import { Footer } from '../../../shared/components/footer/footer';

@Component({
  selector: 'main-layout',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './main-layout.html',
})
export class MainLayout {}
