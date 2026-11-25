import { Component, OnInit, signal, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { form, FormField, FormRoot, required, min } from '@angular/forms/signals';
import { Router } from '@angular/router';
import { BoutiqueService } from '../../services/boutique';
import { MaterielService } from '../../services/materiel';
import { Materiel } from '../../interface/materiel';
import { PrixPipe } from '../../pipe/prix-pipe';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, FormRoot, FormField, PrixPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})


export class Admin implements OnInit {
  boutique = inject(BoutiqueService);
  materiels = inject(MaterielService);
  router = inject(Router);

  email = 'admin@infolab.tn';
  motDePasse = '';
  erreur = '';
  section = 'tableau';
  id: string | null = null;
  ancien = '';
  nouveauMotDePasse = '';
  message = '';

  model = signal<Materiel>({
    nom: '',
    marque: '',
    categorie: '',
    description: '',
    prix: 0,
    stock: 0,
    image: '/ordinateur.png',
    garantie: 12,
    note: 4,
    id: '',
    dateAjout: new Date(),
    disponible: false,
    comments: []
  });

  productForm = form(this.model, (path) => {
    required(path.nom, { message: 'Le nom est obligatoire.' });
    required(path.marque, { message: 'La marque est obligatoire.' });
    required(path.categorie, { message: 'La catégorie est obligatoire.' });
    min(path.prix, 0.1, { message: 'Le prix doit être supérieur à 0.' });
    min(path.stock, 0, { message: 'Le stock ne peut pas être négatif.' });
  });


  ngOnInit(): void {
    this.materiels.getMateriels().subscribe();
  }

  connecter(): void {
    if (this.boutique.connexion(this.email, this.motDePasse)) {
      this.erreur = '';
      this.section = 'tableau';
    } else {
      this.erreur = 'Email ou mot de passe incorrect.';
    }
  }

  deconnecter(): void {
    this.boutique.deconnexion();
    this.router.navigate(['/admin/connexion']);
  }

  nouveau(): void {
    this.id = null;
    this.model.set({
      nom: '', marque: '', categorie: '', description: '', prix: 0,
      stock: 0, image: '/ordinateur.png', garantie: 12, note: 4,
      id: '',
      dateAjout: new Date(),
      disponible: false,
      comments: []
    });
    this.section = 'formulaire';
  }

  modifier(m: Materiel): void {
    this.id = m.id;
    this.model.set({
      nom: m.nom,
      marque: m.marque,
      categorie: m.categorie,
      description: m.description,
      prix: m.prix,
      stock: m.stock,
      image: m.image,
      garantie: m.garantie,
      note: m.note,
      id: '',
      dateAjout: new Date(),
      disponible: false,
      comments: []
    });
    this.section = 'formulaire';
  }

  enregistrer(): void {
    if (this.productForm().invalid()) {
      return;
    }

    let materiel: Materiel = {
      id: '',
      nom: this.model().nom,
      marque: this.model().marque,
      categorie: this.model().categorie,
      description: this.model().description,
      prix: this.model().prix,
      stock: this.model().stock,
      image: this.model().image,
      garantie: this.model().garantie,
      note: this.model().note,
      disponible: this.model().stock > 0,
      dateAjout: new Date(),
      comments: []
    };

    if (this.id === null) {
      materiel.id = String(Date.now());
      this.materiels.ajouter(materiel).subscribe(() => {
        this.section = 'produits';
        this.model.set({
          nom: '', marque: '', categorie: '', description: '', prix: 0, stock: 0, image: '/ordinateur.png', garantie: 12, note: 4,
          id: '',
          dateAjout: new Date(),
          disponible: false,
          comments: []
        });
      });
    } else {
      materiel.id = this.id;
      let ancienMateriel = this.materiels.materiels().find(p => p.id === this.id);
      if (ancienMateriel) {
        materiel.dateAjout = ancienMateriel.dateAjout;
        materiel.comments = ancienMateriel.comments;
      }
      this.materiels.modifier(materiel).subscribe(() => {this.section = 'produits';
        this.model.set({
          nom: '', marque: '', categorie: '', description: '', prix: 0, stock: 0, image: '/ordinateur.png', garantie: 12, note: 4,
          id: '',
          dateAjout: new Date(),
          disponible: false,
          comments: []
        });
      });
    }
  }

  supprimer(id: string): void {
    this.materiels.supprimer(id).subscribe();
  }

  changerStatut(id: string, statut: string): void {
    this.boutique.changerStatut(id, statut);
  }

  changerMotDePasse(): void {
    if (this.nouveauMotDePasse.length < 6) {
      this.message = 'Le nouveau mot de passe doit contenir au moins 6 caractères.';
    } else if (this.boutique.changerMotDePasse(this.ancien, this.nouveauMotDePasse)) {
      this.message = 'Mot de passe modifié.';
    } else {
      this.message = 'Vérifiez les informations saisies.';
    }
  }
}
