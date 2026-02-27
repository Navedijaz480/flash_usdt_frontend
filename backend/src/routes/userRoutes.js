import express from 'express';
import { getTransactions, getUsers } from '../services/dbService.js';

const router = express.Router();

// Get balance
router.get('/balance/:address', (req, res) => {
    const { address } = req.params;

    let user = getUsers().findOne({ address });

    // Auto-create user if not exists
    if (!user) {
        user = getUsers().insert({
            address,
            balance: '0.00',
            status: 'Active'
        });
    }

    res.json({
        address,
        balance: user.balance
    });
});

// Transfer tokens
router.post('/transfer', (req, res) => {
    const { from, to, amount, asset } = req.body;

    if (!from || !to || !amount) {
        return res.status(400).json({
            success: false,
            message: 'Missing required fields'
        });
    }

    const numAmount = parseFloat(amount.toString().replace(/,/g, ''));

    if (isNaN(numAmount) || numAmount <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid amount'
        });
    }

    // 🔹 Get or create sender
    let sender = getUsers().findOne({ address: from });
    if (!sender) {
        sender = getUsers().insert({
            address: from,
            balance: '0.00',
            status: 'Active'
        });
    }

    const senderBalance = parseFloat(sender.balance.replace(/,/g, ''));

    // if (senderBalance < numAmount) {
    //     return res.status(400).json({
    //         success: false,
    //         message: 'Insufficient balance'
    //     });
    // }

    // 🔹 Get or create recipient
    let recipient = getUsers().findOne({ address: to });
    if (!recipient) {
        recipient = getUsers().insert({
            address: to,
            balance: '0.00',
            status: 'Active'
        });
    }

    // 🔹 Update balances
    const newSenderBalance = (senderBalance - numAmount).toFixed(2);
    const newRecipientBalance = (parseFloat(recipient.balance.replace(/,/g, '')) + numAmount).toFixed(2);

    sender.balance = parseFloat(newSenderBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    recipient.balance = parseFloat(newRecipientBalance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    getUsers().update(sender);
    getUsers().update(recipient);

    // 🔹 Create transaction
    const newTx = {
        id: `TX-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        asset: asset || 'USDT',
        amount: numAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
        from,
        to,
        user: from,
        time: new Date().toLocaleString(),
        status: 'Approved',
        type: 'transfer',
        network: 'Ethereum'
    };

    getTransactions().insert(newTx);

    res.json({
        success: true,
        transaction: newTx
    });
});

export default router;