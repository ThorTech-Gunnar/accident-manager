import { PublicClientApplication, AuthenticationResult } from '@azure/msal-browser';
import { Client } from '@microsoft/microsoft-graph-client';
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser';

class OneDriveService {
  private client: Client | null = null;
  private msalInstance: PublicClientApplication;

  constructor() {
    this.msalInstance = new PublicClientApplication({
      auth: {
        clientId: 'YOUR_CLIENT_ID', // Replace with your Azure AD app client ID
        authority: 'https://login.microsoftonline.com/common',
        redirectUri: window.location.origin,
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: false,
      },
    });
  }

  async login(): Promise<void> {
    try {
      const loginResponse = await this.msalInstance.loginPopup({
        scopes: ['Files.ReadWrite', 'Files.ReadWrite.All', 'Sites.ReadWrite.All'],
      });
      this.initializeGraphClient(loginResponse);
    } catch (err) {
      console.error(err);
    }
  }

  private initializeGraphClient(authResponse: AuthenticationResult) {
    const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(this.msalInstance, {
      account: authResponse.account,
      scopes: ['Files.ReadWrite', 'Files.ReadWrite.All', 'Sites.ReadWrite.All'],
      interactionType: 'popup',
    });

    this.client = Client.initWithMiddleware({
      authProvider,
    });
  }

  async uploadFile(file: File, path: string): Promise<string> {
    if (!this.client) {
      throw new Error('Client not initialized. Please log in first.');
    }

    try {
      const response = await this.client.api(`/me/drive/root:/${path}:/content`).put(file);
      return response.id;
    } catch (error) {
      console.error('Error uploading file to OneDrive:', error);
      throw error;
    }
  }

  async downloadFile(fileId: string): Promise<Blob> {
    if (!this.client) {
      throw new Error('Client not initialized. Please log in first.');
    }

    try {
      const response = await this.client.api(`/me/drive/items/${fileId}/content`).get();
      return response;
    } catch (error) {
      console.error('Error downloading file from OneDrive:', error);
      throw error;
    }
  }

  async listFolders(): Promise<any[]> {
    if (!this.client) {
      throw new Error('Client not initialized. Please log in first.');
    }

    try {
      const response = await this.client.api('/me/drive/root/children')
        .filter('folder ne null')
        .get();
      return response.value;
    } catch (error) {
      console.error('Error listing folders from OneDrive:', error);
      throw error;
    }
  }
}

export const oneDriveService = new OneDriveService();