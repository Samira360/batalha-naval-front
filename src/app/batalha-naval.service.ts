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

  comprarPacote(compradorId: number, temaId: number) {
    return this.http.post(`${this.urlBase}/pacotes/usuarios/${compradorId}/temas/${temaId}/comprar`, null);
  }

  getUserPacotes(userId: number) {
    return this.http.get(`${this.urlBase}/usuarios/${userId}/pacotes`);
  }

  async getUserPacotesPre(userId: number): Promise<any> {
    return this.http.get(`${this.urlBase}/usuarios/${userId}/pacotes`);
  }

  updateUserTemaId(userId: number, formData: any){
    return this.http.put(`${this.urlBase}/usuarios/${userId}/alterar-ids-pacotes`, formData);
  }
  updateVolumeMusica(userId: number, formData: any) {
    return this.http.put(`${this.urlBase}/usuarios/${1}/alterar-volumemusica`, formData);
  }

  updateVolumeSom(userId: number, formData: any) {
    return this.http.put(`${this.urlBase}/usuarios/${1}/alterar-volumesom`, formData);
  }
  
  updateMoeda(userId: number, formData: any) {
    return this.http.put(`${this.urlBase}/usuarios/${userId}/alterar-moeda`, formData);
  }
  updateDiamante(userId: number, formData: any) {
    return this.http.put(`${this.urlBase}/usuarios/${userId}/alterar-diamante`, formData);
  }
  updateVitoria(userId: number, vitoria: number, formData: any) {
    return this.http.put(`${this.urlBase}/usuarios/${userId}/alterar-vitorias`, formData);
  }
  updateUserName(userId: number, formData: any) {
    return this.http.put(`${this.urlBase}/usuarios/${userId}/alterar-nome`, formData);
  }
  updateUserPassword(userId: number, formData: any) {
    return this.http.put(`${this.urlBase}/usuarios/${userId}/alterar-senha`, formData);
  }

  updatesrcAvatar(userId: number, formData: any) {
    return this.http.put(`${this.urlBase}/usuarios/${userId}/alterar-srcAvatar`, formData);
  }

}
