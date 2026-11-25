import { Routes } from '@angular/router';
import { PublicFront } from './components/public-front/public-front';
import { Acceuil } from './components/acceuil/acceuil';
import { MaterialList } from './components/material-list/material-list';
import { Propos } from './components/propos/propos';
import { Panier } from './components/panier/panier';
import { Admin } from './components/admin/admin';

export const routes: Routes = [
  {
    path: '',
    component: PublicFront,
    children: [
      { path: '', redirectTo: 'accueil', pathMatch: 'full' },
      { path: 'accueil', title: 'Accueil', component: Acceuil },
      { path: 'produits', title: 'Matériels', component: MaterialList },
      { path: 'produits/:id', title: 'Détail matériel', component: MaterialList },
      { path: 'propos', title: 'À propos', component: Propos },
      { path: 'panier', title: 'Panier', component: Panier }
    ]
  },
  { path: 'admin', title: 'Administration', component: Admin },
  { path: 'admin/connexion', title: 'Connexion', component: Admin },
  { path: '**', redirectTo: 'accueil' }
];
