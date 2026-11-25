import { Injectable, signal } from '@angular/core';
import { Client } from '../interface/client';
import { Commande } from '../interface/commande';
import { LignePanier } from '../interface/ligne-panier';
import { Materiel } from '../interface/materiel';


@Injectable({ 
  providedIn: 'root' 

})

export class BoutiqueService {

  panier = signal<LignePanier[]>([]);
  commandes = signal<Commande[]>([]);

  adminConnecte = signal(false);
  motDePasseAdmin = signal('admin123');

  nombreArticles(): number {
    let nb = 0;
    for (let l of this.panier()) {
      nb = nb + l.quantite;
    }
    return nb;
  }

  total(): number {
    let s = 0;
    for (let l of this.panier()) {
      s = s + l.materiel.prix * l.quantite;
    }
    return s;
  }

  connexion(email: string, motDePasse: string): boolean {
    if (email === 'admin@infolab.tn' && motDePasse === this.motDePasseAdmin()) {
      this.adminConnecte.set(true);
      return true;
    }
    return false;
  }

  changerMotDePasse(ancien: string, nouveau: string): boolean {
    if (ancien !== this.motDePasseAdmin()) {
      return false;
    }
    this.motDePasseAdmin.set(nouveau);
    return true;
  }

  deconnexion(): void { 
    this.adminConnecte.set(false);
  }

  ajouterPanier(m: Materiel): void {
    if (m.stock < 1) return;

    this.panier.update(l => {const ligneExistante = l.find(ligne => ligne.materiel.id === m.id);
      if (!ligneExistante) {
        return [...l, { materiel: m, quantite: 1 }];
      }

      return l.map(ligne => ligne.materiel.id === m.id && ligne.quantite < m.stock? 
        { materiel: m, quantite: ligne.quantite + 1 }: ligne);
    });
  }

  changerQuantite(id: string, quantite: number): void {
    if (quantite < 1) {
      this.supprimerPanier(id);
      return;
    }

    this.panier.update(lignes => lignes.map(ligne =>ligne.materiel.id === id ? 
    { materiel: ligne.materiel, quantite: quantite <= ligne.materiel.stock ? quantite : ligne.materiel.stock }: ligne
    ));
  }

  supprimerPanier(id: string): void {
    this.panier.update(lignes => lignes.filter(ligne => ligne.materiel.id !== id));
  }

  commander(client: Client): void {
    const c: Commande = {
      id : "",
      client,
      lignes: this.panier(),
      total: this.total(),
      datecmd : "",
      statut: 'En attente'
    };
    this.commandes.update(cmd => [...cmd, c]);
    this.panier.set([]);
  }

  changerStatut(id: string, statut: string): void {
    this.commandes.update(cmd => cmd.map(v_cmd =>v_cmd.id === id ? { ...v_cmd, statut } : v_cmd));
  }
}
