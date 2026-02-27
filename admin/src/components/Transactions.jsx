import React, { useState, useEffect } from 'react'
import { Search, Filter, CheckCircle, XCircle, Clock } from 'lucide-react'
import { apiRequest } from '../utils/api'

const Transactions = () => {
    const [filterAsset, setFilterAsset] = useState('All')
    const [txs, setTxs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const data = await apiRequest('/admin/transactions');
                setTxs(data);
                setLoading(false);
            } catch (error) {
                console.error('Transactions fetch error:', error);
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    const filteredTxs = filterAsset === 'All' || filterAsset === 'All Assets'
        ? txs
        : txs.filter(t => t.asset === filterAsset)

    if (loading) return <div>Loading transactions...</div>;

    return (
        <div className="view-animate">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Transaction Ledger</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ position: 'relative' }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input type="text" className="input" placeholder="Search ID or address..." style={{ paddingLeft: '2.5rem', width: '300px' }} />
                    </div>
                    <select
                        className="input"
                        style={{ width: '150px' }}
                        value={filterAsset}
                        onChange={(e) => setFilterAsset(e.target.value)}
                    >
                        <option>All Assets</option>
                        <option>USDT</option>
                        <option>ETH</option>
                        <option>BTC</option>
                    </select>
                </div>
            </div>

            <div className="card" style={{ padding: 0 }}>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Transaction ID</th>
                                <th>Asset</th>
                                <th>Amount</th>
                                <th>User / Source</th>
                                <th>Timestamp</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTxs.map(tx => (
                                <tr key={tx.id}>
                                    <td style={{ fontWeight: 600 }}>{tx.id}</td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: tx.asset === 'USDT' ? '#26a17b' : tx.asset === 'ETH' ? '#627eea' : '#f7931a' }}></span>
                                            {tx.asset}
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: 600 }}>{tx.amount}</td>
                                    <td style={{ color: '#94a3b8', fontFamily: 'monospace' }}>{tx.user}</td>
                                    <td>{tx.time}</td>
                                    <td>
                                        <span className={`badge ${tx.status === 'Approved' ? 'badge-success' :
                                            tx.status === 'Pending' ? 'badge-pending' : 'badge-danger'
                                            }`}>
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td>
                                        {tx.status === 'Pending' ? (
                                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                <button className="btn btn-primary" style={{ padding: '0.4rem', borderRadius: '4px' }} title="Approve">
                                                    <CheckCircle size={16} />
                                                </button>
                                                <button className="btn btn-danger" style={{ padding: '0.4rem', borderRadius: '4px' }} title="Reject">
                                                    <XCircle size={16} />
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="btn btn-ghost" style={{ padding: '0.4rem' }}>View Details</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Transactions
