import loki from 'lokijs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../data/database.json');
const db = new loki(dbPath, {
    autoload: true,
    autoloadCallback: databaseInitialize,
    autosave: true,
    autosaveInterval: 4000
});

function databaseInitialize() {
    let transactions = db.getCollection('transactions');
    if (transactions === null) {
        transactions = db.addCollection('transactions');
    }

    let users = db.getCollection('users');
    if (users === null) {
        users = db.addCollection('users');
    }

    let logs = db.getCollection('logs');
    if (logs === null) {
        logs = db.addCollection('logs');
        logs.insert({ message: 'System initialized and ready', timestamp: new Date() });
    }
}

// Helper to ensure collections are ready
const ensureCollection = (name) => {
    let col = db.getCollection(name);
    if (!col) {
        col = db.addCollection(name);
    }
    return col;
};

export const getTransactions = () => ensureCollection('transactions');
export const getUsers = () => ensureCollection('users');
export const getLogs = () => ensureCollection('logs');
export const dbInstance = db;
