"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = authorize;
const node_path_1 = __importDefault(require("node:path"));
const node_process_1 = __importDefault(require("node:process"));
const local_auth_1 = require("@google-cloud/local-auth");
const googleapis_1 = require("googleapis");
const promises_1 = __importDefault(require("fs/promises"));
const SCOPES = [
    'https://www.googleapis.com/auth/gmail.compose',
    'https://www.googleapis.com/auth/gmail.send',
    'https://www.googleapis.com/auth/gmail.modify'
];
const CREDENTIALS_PATH = node_path_1.default.join(node_process_1.default.cwd(), './src/configs/credentials.json');
const TOKEN_PATH = node_path_1.default.join(node_process_1.default.cwd(), './src/configs/token.json');
async function loadSavedCredentials() {
    try {
        const content = await promises_1.default.readFile(TOKEN_PATH);
        const credentials = JSON.parse(content.toString());
        return googleapis_1.google.auth.fromJSON(credentials);
    }
    catch (err) {
        return null;
    }
}
async function saveCredentials(client) {
    const content = await promises_1.default.readFile(CREDENTIALS_PATH);
    const keys = JSON.parse(content.toString());
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
        type: 'authorized_user',
        client_id: key.client_id,
        client_secret: key.client_secret,
        refresh_token: client.credentials.refresh_token,
    });
    await promises_1.default.writeFile(TOKEN_PATH, payload);
}
;
async function authorize() {
    let client = await loadSavedCredentials();
    if (client) {
        return client;
    }
    client = await (0, local_auth_1.authenticate)({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
    });
    if (client.credentials) {
        await saveCredentials(client);
    }
    return client;
}
;
//# sourceMappingURL=googleApiAuth.js.map