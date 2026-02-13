import React from 'react'
import { Terminal, Lock, Info, AlertTriangle } from 'lucide-react'

const SystemLogs = () => {
    const logs = [
        { id: 1, type: 'Info', event: 'Admin Login', details: 'Successful login from IP 192.168.1.1', time: '5 mins ago', user: 'Admin' },
        { id: 2, type: 'Security', event: 'TX Approval', details: 'TX-9030 approved by Admin', time: '12 mins ago', user: 'Admin' },
        { id: 3, type: 'Security', event: 'Mint Operation', details: '10,000 USDT minted to treasury', time: '1 hour ago', user: 'Admin' },
        { id: 4, type: 'Alert', event: 'Failed Access', details: 'Invalid license key attempt', time: '2 hours ago', user: 'Visitor' },
        { id: 5, type: 'Info', event: 'User Registered', details: 'New wallet connected: 0x9E8f...H2j1', time: '3 hours ago', user: 'System' },
    ]

    const getIcon = (type) => {
        switch (type) {
            case 'Security': return <Lock size={16} color="#3b82f6" />
            case 'Alert': return <AlertTriangle size={16} color="#ef4444" />
            default: return <Info size={16} color="#94a3b8" />
        }
    }

    return (
        <div className="view-animate">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>System Audit Logs</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-outline">Download JSON</button>
                    <button className="btn btn-outline">Clear Logs</button>
                </div>
            </div>

            <div className="card" style={{ padding: 0 }}>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Event Name</th>
                                <th>Detailed Log</th>
                                <th>Timestamp</th>
                                <th>User / Source</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map(log => (
                                <tr key={log.id}>
                                    <td>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                            {getIcon(log.type)}
                                            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{log.type}</span>
                                        </div>
                                    </td>
                                    <td style={{ fontWeight: 600 }}>{log.event}</td>
                                    <td style={{ color: '#94a3b8' }}>{log.details}</td>
                                    <td>{log.time}</td>
                                    <td>
                                        <span className="badge badge-info">{log.user}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#4b5563', fontSize: '0.875rem' }}>
                <Terminal size={14} />
                Live system stream active...
            </div>
        </div>
    )
}

export default SystemLogs
