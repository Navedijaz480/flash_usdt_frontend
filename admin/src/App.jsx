import React, { useState } from 'react'
import { LayoutDashboard, Users as UsersIcon, CreditCard, ShieldCheck, Activity, LogOut, Lock } from 'lucide-react'
import Dashboard from './components/Dashboard'
import Transactions from './components/Transactions'
import Users from './components/Users'
import TokenOps from './components/TokenOps'
import SystemLogs from './components/SystemLogs'

const App = () => {
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [licenseKey, setLicenseKey] = useState('')
    const [activeTab, setActiveTab] = useState('dashboard')

    const handleLogin = (e) => {
        e.preventDefault()
        if (licenseKey === 'ADMIN-FLASH-2026') {
            setIsAuthorized(true)
        } else {
            alert('Invalid License Key')
        }
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <Dashboard />
            case 'transactions': return <Transactions />
            case 'users': return <Users />
            case 'tokens': return <TokenOps />
            case 'logs': return <SystemLogs />
            default: return <Dashboard />
        }
    }

    if (!isAuthorized) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                width: '100vw',
                background: 'radial-gradient(circle at center, #1e293b 0%, #020617 100%)'
            }}>
                <div className="card view-animate" style={{ width: '400px', padding: '2.5rem', textAlign: 'center' }}>
                    <div style={{ background: '#3b82f620', width: '64px', height: '64px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                        <Lock size={32} color="#3b82f6" />
                    </div>
                    <h2 style={{ marginBottom: '0.5rem' }}>Admin Access</h2>
                    <p style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '2rem' }}>Enter your security license key to continue</p>

                    <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <input
                            type="password"
                            placeholder="•••• •••• •••• ••••"
                            className="input"
                            value={licenseKey}
                            onChange={(e) => setLicenseKey(e.target.value)}
                            style={{ textAlign: 'center', letterSpacing: '0.2em', fontSize: '1rem' }}
                            autoFocus
                        />
                        <button className="btn btn-primary" type="submit" style={{ height: '48px' }}>
                            Authorize Session
                        </button>
                    </form>

                    <p style={{ marginTop: '2rem', fontSize: '0.75rem', color: '#4b5563' }}>
                        Secure Enterprise Encryption Active
                    </p>
                </div>
            </div>
        )
    }

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'transactions', label: 'Transactions', icon: CreditCard },
        { id: 'users', label: 'Users', icon: UsersIcon },
        { id: 'tokens', label: 'Token Controls', icon: ShieldCheck },
        { id: 'logs', label: 'System Logs', icon: Activity },
    ]

    return (
        <div className="admin-layout">
            <aside className="sidebar">
                <div style={{ padding: '0 0.5rem 2rem 0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#3b82f6' }}>
                        <div style={{ width: '32px', height: '32px', background: '#3b82f6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <ShieldCheck size={20} />
                        </div>
                        <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.02em' }}>FLASH ADMIN</span>
                    </div>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`btn ${activeTab === item.id ? 'btn-primary' : 'btn-ghost'}`}
                            style={{ justifyContent: 'flex-start', width: '100%', padding: '0.75rem 1rem' }}
                        >
                            <item.icon size={20} /> {item.label}
                        </button>
                    ))}
                </nav>

                <div style={{ marginTop: 'auto', borderTop: '1px solid #1e293b', paddingTop: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 0.5rem 1.5rem 0.5rem' }}>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#1e293b', border: '1px solid #334155' }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Super Admin</div>
                            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>admin@flash.id</div>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsAuthorized(false)}
                        className="btn btn-outline"
                        style={{ width: '100%', color: '#ef4444' }}
                    >
                        <LogOut size={18} /> Logout Session
                    </button>
                </div>
            </aside>

            <main className="main-content">
                {renderContent()}
            </main>
        </div>
    )
}

export default App
