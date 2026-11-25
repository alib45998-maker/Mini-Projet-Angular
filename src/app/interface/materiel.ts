import { Commentaire } from "./commentaire";

export interface Materiel {
  id: string;
  nom: string;
  marque: string;
  categorie: string;
  description: string;
  prix: number;
  stock: number;
  image: string;
  garantie: number;
  note: number;
  dateAjout: Date;
  disponible: boolean;
  comments: Commentaire[];
}
