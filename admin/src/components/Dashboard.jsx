import React, { useState, useEffect } from 'react'
import { Wallet, ArrowUpRight, ArrowDownRight, Users, Activity } from 'lucide-react'
import { apiRequest } from '../utils/api'

const Dashboard = () => {
    const [stats, setStats] = useState([])
    const [recentActivity, setRecentActivity] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsData, activityData] = await Promise.all([
                    apiRequest('/admin/stats'),
                    apiRequest('/admin/transactions')
                ]);

                setStats([
                    { label: 'Total Volume', value: `$${statsData.totalVolume}`, change: '+12.5%', icon: Wallet, color: '#3b82f6' },
                    { label: 'Active Users', value: statsData.activeUsers.toString(), change: '+4.2%', icon: Users, color: '#10b981' },
                    { label: 'Total Transactions', value: statsData.totalTransactions.toString(), change: '+2.1%', icon: ArrowUpRight, color: '#f59e0b' },
                    { label: 'System Health', value: statsData.systemStatus, change: 'Stable', icon: Activity, color: '#8b5cf6' },
                ]);

                setRecentActivity(activityData.slice(0, 5));
                setLoading(false);
            } catch (error) {
                console.error('Dashboard fetch error:', error);
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) return <div>Loading dashboard...</div>;

    return (
        <div className="view-animate">
            <h1>Platform Overview</h1>

            <div className="stat-grid">
                {stats.map((stat, i) => (
                    <div key={i} className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                            <div style={{ background: `${stat.color}20`, padding: '0.75rem', borderRadius: '12px' }}>
                                <stat.icon size={24} color={stat.color} />
                            </div>
                            <span className={`badge ${stat.change.startsWith('+') ? 'badge-success' : stat.change === 'Stable' ? 'badge-info' : 'badge-danger'}`}>
                                {stat.change}
                            </span>
                        </div>
                        <h3 style={{ margin: 0, color: '#94a3b8', fontSize: '0.875rem' }}>{stat.label}</h3>
                        <p style={{ margin: '0.5rem 0 0 0', fontSize: '1.5rem', fontWeight: 'bold' }}>{stat.value}</p>
                    </div>
                ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div className="card">
                    <h2>Recent Activity</h2>
                    <div className="table-container">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Asset</th>
                                    <th>Amount</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentActivity.map(tx => (
                                    <tr key={tx.id}>
                                        <td style={{ fontWeight: 600 }}>{tx.id}</td>
                                        <td>{tx.asset}</td>
                                        <td style={{ color: tx.type === 'burn' ? '#ef4444' : '#10b981' }}>
                                            {tx.type === 'burn' ? '-' : '+'}{tx.amount}
                                        </td>
                                        <td>{tx.time}</td>
                                        <td><span className={`badge ${tx.status === 'Approved' ? 'badge-success' : 'badge-pending'}`}>{tx.status}</span></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card">
                    <h2>Asset Distribution</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {['USDT', 'ETH', 'BTC'].map(asset => (
                            <div key={asset} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                    {asset[0]}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                                        <span style={{ fontWeight: 600 }}>{asset}</span>
                                        <span style={{ color: '#94a3b8' }}>-</span>
                                    </div>
                                    <div style={{ height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{ width: '0%', height: '100%', background: '#3b82f6' }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
