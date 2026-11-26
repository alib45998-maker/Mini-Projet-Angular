import { Component, signal, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BoutiqueService } from '../../services/boutique';
import { PrixPipe } from '../../pipe/prix-pipe';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, FormsModule, PrixPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './panier.html',
  styleUrl: './panier.css'
})
export class Panier {
  boutique = inject(BoutiqueService);
  id = "";
  nom = '';
  prenom = '';
  email = '';
  telephone = '';
  adresse = '';
  message = signal('');


  valider(): void {
    if (this.nom === '' || this.prenom === '' || this.email === '' ||this.telephone === '' || this.adresse === '' || 
      this.boutique.panier().length === 0) {
      return;
    }

    let client = {
      id: this.id ,
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      mdp: '',
      adresse: this.adresse,
      tel: this.telephone
    };

    this.boutique.commander(client);
    this.message.set('Votre commande a été enregistrée.');
  }
}
