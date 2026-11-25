import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { BoutiqueService } from '../../services/boutique';

@Component({
  selector: 'app-public-front',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './public-front.html',
  styleUrl: './public-front.css'
})
export class PublicFront {
  boutique = inject(BoutiqueService);
}
