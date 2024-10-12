import { GoogleAuth } from 'google-auth-library';
import { google } from 'googleapis';

class GoogleDriveService {
  private auth: GoogleAuth;
  private drive: any;

  constructor() {
    this.auth = new GoogleAuth({
      scopes: ['https://www.googleapis.com/auth/drive.file'],
      clientId: 'YOUR_CLIENT_ID', // Replace with your Google Cloud client ID
    });
    this.drive = google.drive({ version: 'v3', auth: this.auth });
  }

  async login(): Promise<void> {
    try {
      await this.auth.getAccessToken();
    } catch (err) {
      console.error('Google Drive login failed:', err);
      throw err;
    }
  }

  async uploadFile(file: File, folderId: string): Promise<string> {
    try {
      const response = await this.drive.files.create({
        requestBody: {
          name: file.name,
          parents: [folderId],
        },
        media: {
          mimeType: file.type,
          body: file,
        },
      });
      return response.data.id;
    } catch (error) {
      console.error('Error uploading file to Google Drive:', error);
      throw error;
    }
  }

  async downloadFile(fileId: string): Promise<Blob> {
    try {
      const response = await this.drive.files.get({
        fileId: fileId,
        alt: 'media',
      }, { responseType: 'blob' });
      return response.data;
    } catch (error) {
      console.error('Error downloading file from Google Drive:', error);
      throw error;
    }
  }

  async listFolders(): Promise<any[]> {
    try {
      const response = await this.drive.files.list({
        q: "mimeType='application/vnd.google-apps.folder'",
        fields: 'files(id, name)',
      });
      return response.data.files;
    } catch (error) {
      console.error('Error listing folders from Google Drive:', error);
      throw error;
    }
  }
}

export const googleDriveService = new GoogleDriveService();