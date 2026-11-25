import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Materiel } from '../interface/materiel';

@Injectable({ providedIn: 'root' })
export class MaterielService {
  private readonly _http = inject(HttpClient);
  private readonly url = 'http://localhost:3000/materiels';

  
  private readonly liste = signal<Materiel[]>([]);
  readonly materiels = this.liste.asReadonly();

  getMateriels(): Observable<Materiel[]> {
    return this._http.get<Materiel[]>(this.url).pipe(tap(data => this.liste.set(data)));
  }

  getMaterielById(id: string): Observable<Materiel> {
    return this._http.get<Materiel>(`${this.url}/${id}`);
  }


  ajouter(m: Materiel): Observable<Materiel> {
    return this._http.post<Materiel>(this.url, m).pipe(tap(data => this.liste.update(all => [...all, data])));
  }

  modifier(m: Materiel): Observable<Materiel> {
    return this._http.put<Materiel>(`${this.url}/${m.id}`, m).pipe(tap(data => this.liste.update(all => all.map(p => p.id === data.id ? data : p))));
  }



  supprimer(id: string): Observable<void> {
    return this._http.delete<void>(`${this.url}/${id}`).pipe(tap(() => this.liste.update(all => all.filter(p => p.id !== id))));
  }
}
