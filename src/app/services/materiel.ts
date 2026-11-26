import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Materiel } from '../interface/materiel';

const url = 'http://localhost:3000/materiels';

@Injectable({ providedIn: 'root' })
export class MaterielService {
  private readonly _http = inject(HttpClient);
 

  private readonly liste = signal<Materiel[]>([]);
  readonly materiels = this.liste.asReadonly();

  getMateriels(): Observable<Materiel[]> {
    return this._http.get<Materiel[]>(url).pipe(tap(data => this.liste.set(data)));
  }

  getMaterielById(id: string): Observable<Materiel> {
    return this._http.get<Materiel>(`${url}/${id}`);
  }


  ajouter(m: Materiel): Observable<Materiel> {
    return this._http.post<Materiel>(url, m).pipe(tap(data => this.liste.update(all => [...all, data])));
  }

  modifier(m: Materiel): Observable<Materiel> {
    return this._http.put<Materiel>(`${url}/${m.id}`, m).pipe(tap(data => this.liste.update(all => all.map(p => p.id === data.id ? data : p))));
  }


  supprimer(id: string): Observable<void> {
    return this._http.delete<void>(`${url}/${id}`).pipe(tap(() => this.liste.update(all => all.filter(p => p.id !== id))));
  }
}
