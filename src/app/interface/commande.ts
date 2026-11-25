import { Client } from "./client";
import { LignePanier } from "./ligne-panier";

export interface Commande {
  id: string;
  client: Client;
  lignes: LignePanier[];
  total: number;
  datecmd: string;
  statut: string;
}
