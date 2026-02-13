import React from 'react'
import { MoreVertical, UserMinus, Shield, Eye } from 'lucide-react'

const Users = () => {
    const users = [
        { id: 1, address: '0x8F2e...a4b2', joined: '2026-02-10', balance: '1,250 USDT', status: 'Active' },
        { id: 2, address: '0x1A2b...E4d5', joined: '2026-02-11', balance: '450 USDT', status: 'Active' },
        { id: 3, address: '0x7C3d...F9g0', joined: '2026-02-12', balance: '0 USDT', status: 'Inactive' },
        { id: 4, address: '0x9E8f...H2j1', joined: '2026-02-13', balance: '12,000 USDT', status: 'Active' },
    ]

    return (
        <div className="view-animate">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>User Management</h1>
                <button className="btn btn-outline">Export User Data</button>
            </div>

            <div className="card" style={{ padding: 0 }}>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Wallet Address</th>
                                <th>Joined Date</th>
                                <th>Total Balance</th>
                                <th>Status</th>
                                <th>Access Level</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td style={{ fontFamily: 'monospace', color: '#3b82f6', fontWeight: 600 }}>{user.address}</td>
                                    <td>{user.joined}</td>
                                    <td>{user.balance}</td>
                                    <td>
                                        <span className={`badge ${user.status === 'Active' ? 'badge-success' : 'badge-danger'}`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                                            <Shield size={14} color="#94a3b8" />
                                            Standard
                                        </div>
                                    </td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                                            <button className="btn btn-ghost" style={{ padding: '0.4rem' }} title="View Activity">
                                                <Eye size={16} />
                                            </button>
                                            <button className="btn btn-ghost" style={{ padding: '0.4rem', color: '#ef4444' }} title="Restrict Access">
                                                <UserMinus size={16} />
                                            </button>
                                            <button className="btn btn-ghost" style={{ padding: '0.4rem' }}>
                                                <MoreVertical size={16} />
                                            </button>
                                        </div>
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

export default Users
