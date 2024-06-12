import { Injectable } from '@angular/core';
import { Environment } from './environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BatalhaNavalService {

  urlBase = Environment.url;

  constructor(private http: HttpClient) { }

  postTeste(formData: any) {
    return this.http.post(`${this.urlBase}/teste`, formData);
  }

  postUser(formData: any) {
    return this.http.post(`${this.urlBase}/usuarios`, formData);
  }

  getUser(userId: any) {
    return this.http.get(`${this.urlBase}/usuarios/usuarios/${userId}`);
  }

  postPacote(formData: any) {
    return this.http.post(`${this.urlBase}/pacotes`, formData);
  }

  getPacotes() {
    return this.http.get(`${this.urlBase}/pacotes`);
  }

  deleteTema(temaId: number) {
    return this.http.delete(`${this.urlBase}/pacotes/${temaId}`);
  }

  getPacote(temaId: number) {
    return this.http.get(`${this.urlBase}/pacotes/${temaId}`);
  }

  updatePacote(temaId: number, formData: any) {
    return this.http.put(`${this.urlBase}/pacotes/${temaId}`, formData);
  }

  login(formData: any) {
    return this.http.post(`${this.urlBase}/usuarios/login`, formData);
  }

  updateVolumeMusica(userId: number, formData: any) {
    return this.http.put(`${this.urlBase}/usuarios/${userId}/alterar-volumemusica`, formData);
  }

  updateVolumeSom(userId: number, formData: any) {
    return this.http.put(`${this.urlBase}/usuarios/${userId}/alterar-volumesom`, formData);
  }
  
  updateMoeda(userId: number, formData: any) {
    return this.http.put(`${this.urlBase}/usuarios/${userId}/alterar-moeda`, formData);
  }
  updateDiamante(userId: number, formData: any) {
    return this.http.put(`${this.urlBase}/usuarios/${userId}/alterar-diamante`, formData);
  }
  updateTrofeu(userId: number, trofeu: number, formData: any) {
    return this.http.put(`${this.urlBase}/usuarios/${userId}/alterar-trofeu`, formData);
  }
  updateUserName(userId: number, formData: any) {
    return this.http.put(`${this.urlBase}/usuarios/${userId}/alterar-nome`, formData);
  }
  updateUserPassword(userId: number, formData: any) {
    return this.http.put(`${this.urlBase}/usuarios/${userId}/alterar-senha`, formData);
  }

}
