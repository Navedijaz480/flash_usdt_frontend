import React from 'react'
import { Wallet, ArrowUpRight, ArrowDownRight, Users, Activity } from 'lucide-react'

const Dashboard = () => {
    const stats = [
        { label: 'Total Volume', value: '$1,284,500.00', change: '+12.5%', icon: Wallet, color: '#3b82f6' },
        { label: 'Active Users', value: '3,842', change: '+4.2%', icon: Users, color: '#10b981' },
        { label: 'Daily Transfers', value: '142', change: '-2.1%', icon: ArrowUpRight, color: '#f59e0b' },
        { label: 'System Health', value: '99.9%', change: 'Stable', icon: Activity, color: '#8b5cf6' },
    ]

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
                                    <th>Event</th>
                                    <th>User</th>
                                    <th>Amount</th>
                                    <th>Time</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Transfer to External</td>
                                    <td>0x71C...3E21</td>
                                    <td style={{ color: '#ef4444' }}>-$1,200.00</td>
                                    <td>2 mins ago</td>
                                    <td><span className="badge badge-success">Completed</span></td>
                                </tr>
                                <tr>
                                    <td>Flash Mint</td>
                                    <td>Admin (0x000)</td>
                                    <td style={{ color: '#10b981' }}>+$50,000.00</td>
                                    <td>15 mins ago</td>
                                    <td><span className="badge badge-success">Completed</span></td>
                                </tr>
                                <tr>
                                    <td>Approval Request</td>
                                    <td>0x4A2...F129</td>
                                    <td>$5.00</td>
                                    <td>1 hour ago</td>
                                    <td><span className="badge badge-pending">Pending</span></td>
                                </tr>
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
                                        <span style={{ color: '#94a3b8' }}>82%</span>
                                    </div>
                                    <div style={{ height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                                        <div style={{ width: asset === 'USDT' ? '82%' : asset === 'ETH' ? '45%' : '30%', height: '100%', background: '#3b82f6' }} />
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
