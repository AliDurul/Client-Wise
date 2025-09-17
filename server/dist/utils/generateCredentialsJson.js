"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const env_1 = __importDefault(require("../configs/env"));
const credentials = {
    web: {
        client_id: env_1.default.GOOGLE_CLIENT_ID || '',
        project_id: env_1.default.GOOGLE_PROJECT_ID || '',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_secret: env_1.default.GOOGLE_CLIENT_SECRET || '',
        redirect_uris: env_1.default.GOOGLE_REDIRECT_URIS
            ? env_1.default.GOOGLE_REDIRECT_URIS.split(',').map(uri => uri.trim())
            : [],
    }
};
fs_1.default.writeFileSync(path_1.default.resolve(__dirname, '../configs/credentials.json'), JSON.stringify(credentials, null, 2));
console.log('credentials.json generated successfully.');
//# sourceMappingURL=generateCredentialsJson.js.map