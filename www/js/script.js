//funções de front office

import { DatabaseTables } from "./DB/tables.js";
import { DatabaseRequest } from "./DB/request.js";
import { BrowserStorage } from "./DB/storage.js";
import { AuthRequest } from "./DB/authentication.js";
var DB = new DatabaseRequest();
var BS = new BrowserStorage();
var AR = new AuthRequest();


function log() { AR.logout(() => {}); }

document.body.innerHTML = "<button onclick=\"log();\">log</button>";