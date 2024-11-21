const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieUFIMFBuWnNwRzdaZG94bCtJZDc1dHpzME9raERKaTV1V29HYkErVzIyYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTGdsRUR1MWNkZGVxaktGTzZ4UVRVQ3o3RjdITFRPR2xuSDV1TGhkY2xEbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4R3lkL3l3bkFJOHBVY1E0dlUxblJ0aURla2FQaTVpOU92ejFMU2gxMUVvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJiRnlUNGE4Yzc5dW5xeVdRc1Q5akhmSTloQ2s3a1EyUUNQNGNmbWhRR3h3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFPc0ltU1kveHpVVVk4V1FzMGg0ak9BWjBxRHR0a1RkQVVxK2RIc1pka2s9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkEzMVFLY3ljekN2dTNjVnpjNmwrdy8zTExLOXZxRE16QjUxUjQ1ZUFabDA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEdhVGxDTUYrU2M1VkxuTlRSRnIvSFFOTTljSWgwUlZJTjFmdkZqTEVFRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSkVyWlRjcEtHcm5GWnhkdkNvNm1pOEFTQlY5cUJVOXhBYkpodDlxY3Jqbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZDaVRnNHF6RFRlOHl5MHZkc0k2R0Nnajh5UjBjN01VNlpUMGNTS3k0ZFBsa0dYWkYxMm1VQjhUdVlUeVErTUhiQytjMEhpS0lQYTVoYStmNGY5dmhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NjYsImFkdlNlY3JldEtleSI6IkwyaStSUG42Sm5rQ2pXL3dtbUlmNGpiSENhUXVTekFraWo5U0l2Q2poUHM9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6InlubGRhQ185UnFTN2VlMk5vWUxJbGciLCJwaG9uZUlkIjoiZTMxZWI0ODUtYjc3OS00MmU1LThlMjgtYzEyYTZhYWM2MWMwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkE1YSt6L2pWcHFJcDZJUVdUaU5LajErbEExST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjdk1QWHRXMVIzaHlFNUVSN3RrcFhBMldWN2s9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNExYTTdUWjQiLCJtZSI6eyJpZCI6IjkyMzQ5MjE0NzEwMjo4M0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT3ozeTd3RUVNRGErcmtHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiZVpTZ0JMVEZzOENsajQ3VjQ2TWJtM2FkcENuc2Y1dThiY1JLVTFBYnVTQT0iLCJhY2NvdW50U2lnbmF0dXJlIjoidFlrUXlhYWkreWRGekRTcVBhZG1adUhaL3hDcmdlWXF4WkJBbUVrY296c1VLazQvK2xZZ25Cbnd6M3p6SE5vOVgzZUFrUXNtUGQxR09qVzJUcUc4QUE9PSIsImRldmljZVNpZ25hdHVyZSI6ImxMSldHaHJVRzIxZEc3VXIxSzBNYmxscEwxZ3YxUDdnV3ZHZE1ZN1hTZXVtSkdlS1FiUDRhdkMwTytXVG9aWEl3ZjNuRFBBS1hJcE55YTljWWg2R2pRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTIzNDkyMTQ3MTAyOjgzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhtVW9BUzB4YlBBcFkrTzFlT2pHNXQybmFRcDdIK2J2RzNFU2xOUUc3a2cifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzIxNjA4NDYsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBT3ZiIn0=',
    PREFIXE: process.env.PREFIX || "+",
    GITHUB : process.env.GITHUB|| 'https://github.com/Huaweike/BELTAH-MD',
    OWNER_NAME : process.env.OWNER_NAME || "Beltah Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "92342147102",
    ANTICALL: process.env.ANTICALL || "non",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTOREAD_MESSAGES: process.env.AUTOREAD_MESSAGES || "non",
    AUTO_REACT: process.env.AUTO_REACTION || "non",
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    CAPTION : process.env.CAPTION || "ᴘᴏᴡᴇʀᴇᴅ ʙʏ BELTAH-MD",
    BOT : process.env.BOT_NAME || 'BELTAH-MD',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    CHATBOT : process.env.PM_CHATBOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
