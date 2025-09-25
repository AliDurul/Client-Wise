import path from 'node:path';
import process from 'node:process';
import { authenticate } from '@google-cloud/local-auth';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import fs from 'fs/promises';

const SCOPES = [
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.modify'
];
const CREDENTIALS_PATH = path.join(process.cwd(), './src/configs/credentials.json');
const TOKEN_PATH = path.join(process.cwd(), './src/configs/token.json');

async function loadSavedCredentials(): Promise<OAuth2Client | null> {
    try {
        const content = await fs.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content.toString());
        return google.auth.fromJSON(credentials) as OAuth2Client;
    } catch (err) {
        return null;
    }
}

async function saveCredentials(client: OAuth2Client) {
    const content = await fs.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content.toString());
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
};

export async function authorize(): Promise<OAuth2Client> {
    let client = await loadSavedCredentials();
    if (client) {
        return client;
    }

    client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    }) as unknown as OAuth2Client;

    if (client.credentials) {
        await saveCredentials(client);
    }

    return client;
};

