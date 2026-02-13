import React, { useState } from 'react'
import { PlusCircle, MinusCircle, ShieldAlert, Send } from 'lucide-react'

const TokenOps = () => {
    const [opType, setOpType] = useState('mint')
    const [asset, setAsset] = useState('USDT')
    const [amount, setAmount] = useState('')
    const [isSigning, setIsSigning] = useState(false)

    const handleAction = (e) => {
        e.preventDefault()
        setIsSigning(true)
        // Simulate wallet signing
        setTimeout(() => {
            alert(`Success: ${opType.toUpperCase()} ${amount} ${asset} completed.`)
            setIsSigning(false)
            setAmount('')
        }, 2000)
    }

    return (
        <div className="view-animate">
            <h1>Token Operations</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ padding: '0.75rem', background: '#3b82f620', borderRadius: '12px' }}>
                            <ShieldAlert size={24} color="#3b82f6" />
                        </div>
                        <div>
                            <h2 style={{ margin: 0 }}>Treasury Control</h2>
                            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.875rem' }}>Manual mint/burn requires admin signature</p>
                        </div>
                    </div>

                    <form onSubmit={handleAction}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Operation Type</label>
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    type="button"
                                    onClick={() => setOpType('mint')}
                                    className="btn"
                                    style={{ flex: 1, background: opType === 'mint' ? '#3b82f6' : '#1e293b', color: 'white' }}
                                >
                                    <PlusCircle size={18} /> Mint
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setOpType('burn')}
                                    className="btn"
                                    style={{ flex: 1, background: opType === 'burn' ? '#ef4444' : '#1e293b', color: 'white' }}
                                >
                                    <MinusCircle size={18} /> Burn
                                </button>
                            </div>
                        </div>

                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Asset</label>
                            <select className="input" value={asset} onChange={(e) => setAsset(e.target.value)}>
                                <option>USDT</option>
                                <option>ETH</option>
                                <option>BTC</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: 600 }}>Amount</label>
                            <input
                                type="number"
                                className="input"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={`btn ${opType === 'mint' ? 'btn-primary' : 'btn-danger'}`}
                            style={{ width: '100%', height: '50px' }}
                            disabled={isSigning}
                        >
                            {isSigning ? 'Signing with Wallet...' : `Confirm ${opType.toUpperCase()}`}
                        </button>
                    </form>
                </div>

                <div className="card">
                    <h2>Current Supply</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ padding: '1rem', background: '#020617', borderRadius: '12px', border: '1px solid #1e293b' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>
                                <span>Flash USDT</span>
                                <span>Active</span>
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>1,250,000.00 <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>USDT</span></div>
                        </div>

                        <div style={{ padding: '1rem', background: '#020617', borderRadius: '12px', border: '1px solid #1e293b' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>
                                <span>Wrapped ETH</span>
                                <span>Active</span>
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>425.50 <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>ETH</span></div>
                        </div>

                        <div style={{ padding: '1rem', background: '#020617', borderRadius: '12px', border: '1px solid #1e293b' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>
                                <span>Flash BTC</span>
                                <span>Inactive</span>
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#4b5563' }}>0.00 <span style={{ fontSize: '0.875rem', color: '#94a3b8' }}>BTC</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TokenOps
