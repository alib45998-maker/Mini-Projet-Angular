import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-acceuil',
  standalone: true,
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './acceuil.html',
  styleUrl: './acceuil.css'
})
export class Acceuil {
  bien = 'bienvenue';
}
