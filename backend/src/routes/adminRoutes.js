import express from 'express';
import jwt from 'jsonwebtoken';
import { getTransactions, getUsers, getLogs, dbInstance } from '../services/dbService.js';
import { authMiddleware } from '../middleware/auth.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();
const SECRET = process.env.JWT_SECRET || 'super-secret-key';
const ADMIN_LICENSE = process.env.ADMIN_LICENSE || 'ADMIN-FLASH-2026';

// Admin Login
router.post('/login', (req, res) => {
    const { licenseKey } = req.body;
    if (licenseKey === ADMIN_LICENSE) {
        const token = jwt.sign({ role: 'admin' }, SECRET, { expiresIn: '8h' });
        return res.json({ success: true, token });
    }
    res.status(401).json({ success: false, message: 'Invalid License Key' });
});

// Get Stats
router.get('/stats', (req, res) => {
    try {
        const txs = getTransactions().find() || [];
        const usersCount = getUsers().count() || 0;

        const totalVolume = txs.reduce((acc, tx) => {
            const amountStr = tx.amount ? tx.amount.toString().replace(/,/g, '') : '0';
            const val = parseFloat(amountStr);
            return acc + (isNaN(val) ? 0 : val);
        }, 0);

        res.json({
            totalTransactions: txs.length,
            activeUsers: usersCount,
            totalVolume: totalVolume.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            systemStatus: 'Optimal'
        });
    } catch (error) {
        console.error('Stats fetch error:', error);
        res.json({
            totalTransactions: 0,
            activeUsers: 0,
            totalVolume: "0.00",
            systemStatus: 'Optimal'
        });
    }
});

// Get Transactions
router.get('/transactions', (req, res) => {
    try {
        const txs = getTransactions().find() || [];
        res.json([...txs].reverse());
    } catch (error) {
        console.error('Transactions fetch error:', error);
        res.json([]);
    }
});

// Get Logs
router.get('/logs', (req, res) => {
    res.json(getLogs().find().reverse());
});

// Get Users
router.get('/users', (req, res) => {
    res.json(getUsers().find());
});

// Token Operations (Mint/Burn)
router.post('/token-ops', (req, res) => {
    const { opType, asset, amount, address } = req.body;
    const numAmount = parseFloat(amount.replace(/,/g, ''));

    // Record the transaction
    const newTx = {
        id: `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        asset,
        amount: numAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        user: address || 'ADMIN',
        time: new Date().toLocaleString(),
        status: 'Approved',
        type: opType
    };
    getTransactions().insert(newTx);

    // Update User Balance if address is provided
    if (address && asset === 'USDT') {
        let user = getUsers().findOne({ address });
        if (!user) {
            user = getUsers().insert({ address, balance: '0.00', status: 'Active' });
        }

        const currentBalance = parseFloat(user.balance.replace(/,/g, ''));
        const newBalance = opType === 'mint' ? currentBalance + numAmount : currentBalance - numAmount;
        user.balance = newBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        getUsers().update(user);
    }

    getLogs().insert({
        message: `${opType.toUpperCase()} ${numAmount.toLocaleString()} ${asset} ${address ? `to ${address}` : ''} by Admin`,
        timestamp: new Date()
    });

    res.json({ success: true, transaction: newTx });
});

export default router;
