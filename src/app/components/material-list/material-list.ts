import { Component, OnInit, signal, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MaterielService } from '../../services/materiel';
import { BoutiqueService } from '../../services/boutique';
import { Materiel } from '../../interface/materiel';
import { MaterialCard } from '../material-card/material-card';
import { PrixPipe } from '../../pipe/prix-pipe';

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, MaterialCard, PrixPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './material-list.html',
  styleUrl: './material-list.css'
})
export class MaterialList implements OnInit {
  service = inject(MaterielService);
  activatedroute = inject(ActivatedRoute);
  boutique = inject(BoutiqueService);

  nom = '';
  

  materiel = signal<Materiel | undefined>(undefined); 

  ngOnInit(): void {
    let id = this.activatedroute.snapshot.paramMap.get('id');
    if (id) {
      this.service.getMaterielById(id).subscribe(m =>{ this.materiel.set(m);});}
    else {
      this.service.getMateriels().subscribe();
    }
}
  prixMax?: number;

  resultats(): Materiel[] {
    const nom = this.nom.toLowerCase();
    const prixMax = this.prixMax;

    return this.service.materiels().filter(m => {
      const v_nom = m.nom.toLowerCase().includes(nom);
      const v_prix = prixMax == null || m.prix <= prixMax;

      return v_nom && v_prix;
    });
  }
}
