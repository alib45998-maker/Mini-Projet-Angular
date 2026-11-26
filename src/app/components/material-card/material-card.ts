import { Component, input, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Materiel } from '../../interface/materiel';
import { BoutiqueService } from '../../services/boutique';
import { PrixPipe } from '../../pipe/prix-pipe';

@Component({
  selector: 'app-material-card',
  standalone: true,
  imports: [RouterLink, PrixPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './material-card.html',
  styleUrl: './material-card.css'
})
export class MaterialCard {
  materiel = input.required<Materiel>();
  carte = 'product-card carte';

  boutique = inject(BoutiqueService);

  estIndisponible(): boolean {
    
    return this.materiel().disponible === false || this.materiel().stock < 1;
  }
}
