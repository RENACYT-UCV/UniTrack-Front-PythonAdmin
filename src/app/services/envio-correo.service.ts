import { Injectable } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EnvioCorreoService {
  private apiUrl = environment.correoApiUrl; // URL de tu API
  public currentUser: any = null;
  public currentEmail: string = '';

  constructor(private http: HttpClient, private navCtrl: NavController) {}
  // Envía el código de verificación al correo del usuario
  sendVerificationCodee(correo: string): Observable<any> {
    return this.http.post(`${this.apiUrl}users/forgot-password`, { correo });
  }

  // Verifica el código de verificación
  verifyVerificationCode(code: number): Observable<any> {
    return this.http.post(`${this.apiUrl}users/verify-code`, { code });
  }
  // Restablece la contraseña del usuario
  resetPassword(
    correo: string,
    newPassword: string,
    code: string
  ): Observable<any> {
    const body = { correo: correo, password: newPassword, code };
    return this.http.post(`${this.apiUrl}/users/reset-password`, body);
  }
}
