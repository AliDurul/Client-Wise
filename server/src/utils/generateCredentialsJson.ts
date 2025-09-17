import fs from 'fs';
import path from 'path';
import env from '../configs/env'


const credentials = {
  web: {
    client_id: env.GOOGLE_CLIENT_ID || '',
    project_id: env.GOOGLE_PROJECT_ID || '',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: env.GOOGLE_CLIENT_SECRET || '',
    redirect_uris: env.GOOGLE_REDIRECT_URIS
      ? env.GOOGLE_REDIRECT_URIS.split(',').map(uri => uri.trim())
      : [],
  }
};

fs.writeFileSync(
  path.resolve(__dirname, '../configs/credentials.json'),
  JSON.stringify(credentials, null, 2)
);

console.log('credentials.json generated successfully.');