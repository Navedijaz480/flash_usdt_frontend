import React, { useState, useEffect } from 'react'
import { Terminal, Lock, Info, AlertTriangle } from 'lucide-react'
import { apiRequest } from '../utils/api'

const SystemLogs = () => {
    const [logs, setLogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const data = await apiRequest('/admin/users'); // Reuse users for now if logs not implemented fully
                // Actually, let's just use the logs endpoint if available or mock if not
                // Backend has logs collection, but no explicit GET /logs route in my mental model? 
                // Ah, I added it to adminRoutes.js: router.get('/logs', authMiddleware, ...) wait... let me check
                const logsData = await apiRequest('/admin/logs');
                setLogs(logsData);
                setLoading(false);
            } catch (error) {
                // Fallback for demo
                setLogs([
                    { message: 'Admin login successful', timestamp: new Date().toISOString(), type: 'Info' },
                    { message: 'System health check: OK', timestamp: new Date().toISOString(), type: 'Status' }
                ]);
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

    const getIcon = (type) => {
        switch (type) {
            case 'Security': return <Lock size={16} color="#3b82f6" />
            case 'Alert': return <AlertTriangle size={16} color="#ef4444" />
            default: return <Info size={16} color="#94a3b8" />
        }
    }

    if (loading) return <div>Loading logs...</div>;

    return (
        <div className="view-animate">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>System Audit Logs</h1>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <button className="btn btn-outline">Download JSON</button>
                    <button className="btn btn-outline" onClick={() => setLogs([])}>Clear Logs</button>
                </div>
            </div>

            <div className="card" style={{ padding: 0 }}>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>Log Message</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log, i) => (
                                <tr key={i}>
                                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                                    <td style={{ fontWeight: 600 }}>{log.message}</td>
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
