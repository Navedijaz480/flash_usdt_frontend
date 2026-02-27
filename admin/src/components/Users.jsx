import React, { useState, useEffect } from 'react'
import { MoreVertical, UserMinus, Shield, Eye } from 'lucide-react'
import { apiRequest } from '../utils/api'

const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await apiRequest('/admin/users');
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error('Users fetch error:', error);
                setLoading(false);
            }
        };
        fetchUsers();
    }, []);

    if (loading) return <div>Loading users...</div>;

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
                                <th>Balance</th>
                                <th>Status</th>
                                <th>Access Level</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => (
                                <tr key={i}>
                                    <td style={{ fontFamily: 'monospace', color: '#3b82f6', fontWeight: 600 }}>{user.address}</td>
                                    <td>{user.balance} USDT</td>
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
