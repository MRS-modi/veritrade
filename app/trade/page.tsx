"use client";

import { useEffect, useState } from "react";
import {
  Activity, ArrowDownRight, ArrowUpRight, BookOpen, ChevronDown, ChevronRight,
  CircleHelp, Clock3, Copy, ExternalLink, FileSearch, Globe2, LayoutDashboard,
  Menu, Plus, RefreshCw, ShieldCheck, SlidersHorizontal, Wallet, X, Zap,
} from "lucide-react";
import { useAccount, useBalance, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { arbitrumSepolia } from "wagmi/chains";

const asks = [
  { price: "2,486.80", amount: "1.420", total: "3,530.02", depth: 42 },
  { price: "2,486.50", amount: "0.870", total: "2,163.26", depth: 32 },
  { price: "2,486.20", amount: "2.150", total: "5,345.33", depth: 63 },
  { price: "2,486.00", amount: "0.640", total: "1,591.04", depth: 25 },
  { price: "2,485.70", amount: "1.080", total: "2,684.56", depth: 47 },
];
const bids = [
  { price: "2,485.40", amount: "1.730", total: "4,301.74", depth: 54 },
  { price: "2,485.10", amount: "0.920", total: "2,286.29", depth: 34 },
  { price: "2,484.80", amount: "2.440", total: "6,062.91", depth: 72 },
  { price: "2,484.50", amount: "1.150", total: "2,856.18", depth: 43 },
  { price: "2,484.20", amount: "0.780", total: "1,937.68", depth: 30 },
];
const marketRows = [
  { pair: "ETH / USDC", side: "Buy", price: "2,481.35", amount: "0.4200", time: "12:42:18", hash: "0xc41…81f2", status: "Preview" },
  { pair: "ETH / USDC", side: "Sell", price: "2,479.80", amount: "0.1250", time: "12:39:04", hash: "0x83a…0bc1", status: "Preview" },
  { pair: "ETH / USDC", side: "Buy", price: "2,476.20", amount: "1.0500", time: "12:35:47", hash: "0x910…a6d8", status: "Preview" },
];
const events = [
  { name: "OrderPlaced", desc: "Limit buy submitted to order book", hash: "0x3d2…9af1", time: "12:42:18", type: "buy" },
  { name: "TradeSettled", desc: "ETH / USDC · 0.42 ETH", hash: "0x7b1…43c0", time: "12:38:55", type: "settled" },
  { name: "OrderCancelled", desc: "Remaining escrow released", hash: "0xe83…0ad2", time: "12:34:21", type: "cancel" },
  { name: "OrderMatched", desc: "Partial fill · ETH / USDC", hash: "0x93a…bb01", time: "12:29:06", type: "matched" },
];

type View = "Trade" | "Portfolio" | "Explorer" | "Faucet";
type Side = "Buy" | "Sell";

function Logo() {
  return <a href="/" className="brand-mark" aria-label="VeriTrade home"><span className="brand-glyph">V</span><span className="brand-name">VERI<span>TRADE</span></span></a>;
}

function PriceChart() {
  const points = "0,143 18,136 31,147 45,126 60,133 74,119 88,128 101,103 116,111 130,94 144,105 160,91 175,98 191,77 205,87 220,68 235,76 249,62 263,70 278,55 294,65 309,43 324,52 338,39 352,47 366,24 381,35 396,28 412,40 427,18 443,27 459,14 475,20 490,8";
  return (
    <div className="chart-wrap">
      <div className="chart-legend"><span><i className="legend-dot green" /> ETH / USDC</span><span className="chart-intervals"><b>15m</b><span>1H</span><span>4H</span><span>1D</span><span className="chart-settings"><SlidersHorizontal size={13} /> Settings</span></span></div>
      <div className="chart-statline"><span className="chart-big-price">$2,485.70</span><span className="positive"><ArrowUpRight size={14} /> +2.48%</span><span className="chart-muted">24h change</span></div>
      <div className="chart-area">
        <div className="chart-y-labels"><span>2,500</span><span>2,490</span><span>2,480</span><span>2,470</span><span>2,460</span></div>
        <svg viewBox="0 0 500 180" preserveAspectRatio="none" className="price-chart" role="img" aria-label="Illustrative ETH-USDC price chart">
          <defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity=".20" /><stop offset="100%" stopColor="#10b981" stopOpacity="0" /></linearGradient></defs>
          {[24, 60, 96, 132, 168].map((y) => <line key={y} x1="0" x2="500" y1={y} y2={y} stroke="#252933" strokeDasharray="3 5" />)}
          <polygon points={`0,180 ${points} 500,180`} fill="url(#chartFill)" />
          <polyline points={points} fill="none" stroke="#10b981" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round" />
          <line x1="0" x2="500" y1="36" y2="36" stroke="#10b981" strokeDasharray="4 4" opacity=".55" />
          <circle cx="459" cy="14" r="4" fill="#10b981" stroke="#10141b" strokeWidth="2" />
        </svg>
        <div className="chart-price-tag">2,485.70</div>
        <div className="chart-x-labels"><span>09:00</span><span>10:00</span><span>11:00</span><span>12:00</span><span>13:00</span></div>
      </div>
      <div className="chart-footer"><span><i className="legend-dot green" /> Price preview</span><span>Illustrative data · not a live market feed</span></div>
    </div>
  );
}

function OrderBook({ onSelectPrice }: { onSelectPrice: (price: string) => void }) {
  return (
    <section className="panel orderbook-panel">
      <div className="panel-head"><div><h3>Order book</h3><p className="panel-sub">ETH / USDC</p></div><button className="icon-button" aria-label="Order book settings"><SlidersHorizontal size={15} /></button></div>
      <div className="book-labels"><span>Price <small>(USDC)</small></span><span>Size <small>(ETH)</small></span><span>Total</span></div>
      <div className="book-rows asks">{asks.map((row) => <button className="book-row" key={row.price} onClick={() => onSelectPrice(row.price.replace(",", ""))}><span className="price-red">{row.price}</span><span>{row.amount}</span><span>{row.total}</span><i style={{ width: `${row.depth}%` }} /></button>)}</div>
      <div className="book-mid"><span>2,485.70</span><span className="positive">≈ $2,485.70</span></div>
      <div className="book-rows bids">{bids.map((row) => <button className="book-row" key={row.price} onClick={() => onSelectPrice(row.price.replace(",", ""))}><span className="price-green">{row.price}</span><span>{row.amount}</span><span>{row.total}</span><i style={{ width: `${row.depth}%` }} /></button>)}</div>
      <div className="book-legend"><span><i className="legend-dot red" /> Sell depth</span><span><i className="legend-dot green" /> Buy depth</span></div>
    </section>
  );
}

function OrderForm({ connected, viewConnect, onOrderNotice, presetPrice }: { connected: boolean; viewConnect: () => void; onOrderNotice: (msg: string) => void; presetPrice: string }) {
  const [side, setSide] = useState<Side>("Buy");
  const [price, setPrice] = useState("2485.70");
  const [amount, setAmount] = useState("");
  const [percentage, setPercentage] = useState(0);
  const [orderType, setOrderType] = useState("Limit");
  const [showAdvanced, setShowAdvanced] = useState(false);
  useEffect(() => { if (presetPrice) setPrice(presetPrice); }, [presetPrice]);
  const numericPrice = Number(price) || 0;
  const numericAmount = Number(amount) || 0;
  const total = numericPrice * numericAmount;
  const setAmountByPercent = (pct: number) => { setPercentage(pct); setAmount((0.04 * pct / 100).toFixed(4)); };
  return (
    <section className="panel trade-panel">
      <div className="panel-head"><div><h3>Place order</h3><p className="panel-sub">ETH / USDC</p></div><span className="test-badge">TESTNET</span></div>
      <div className="side-tabs"><button className={side === "Buy" ? "buy-active" : ""} onClick={() => setSide("Buy")}>Buy / Long</button><button className={side === "Sell" ? "sell-active" : ""} onClick={() => setSide("Sell")}>Sell / Short</button></div>
      <div className="order-type-row"><button className={orderType === "Limit" ? "selected" : ""} onClick={() => setOrderType("Limit")}>Limit</button><button className={orderType === "Market" ? "selected" : ""} onClick={() => setOrderType("Market")}>Market</button><button className="help-mini" title="Limit orders rest on the book until matched."><CircleHelp size={14} /></button></div>
      {orderType === "Limit" && <label className="field-label">Price <span>USDC</span><div className="field-control"><input inputMode="decimal" aria-label="Price in USDC" value={price} onChange={(e) => setPrice(e.target.value)} /><button onClick={() => setPrice("2485.70")}>USDC</button></div></label>}
      <label className="field-label">Amount <span>ETH</span><div className="field-control"><input inputMode="decimal" placeholder="0.0000" aria-label="Amount in ETH" value={amount} onChange={(e) => { setAmount(e.target.value); setPercentage(0); }} /><button onClick={() => setAmount("")}>ETH</button></div></label>
      <div className="percent-buttons">{[25, 50, 75, 100].map((pct) => <button className={percentage === pct ? "percent-selected" : ""} onClick={() => setAmountByPercent(pct)} key={pct}>{pct}%</button>)}</div>
      <div className="order-summary"><span>Available balance</span><b>0.0400 ETH <small>· preview</small></b><span>Estimated total</span><b>{total > 0 ? total.toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 }) : "0.00"} USDC</b><span>Estimated fee</span><b>— <small>testnet gas varies</small></b></div>
      <button className={`submit-order ${side === "Sell" ? "submit-sell" : ""}`} onClick={() => { if (!connected) { viewConnect(); return; } onOrderNotice("Preview only: configure a deployed OrderBook.sol address before sending orders. No transaction was sent."); }}>{`Place ${orderType.toLowerCase()} ${side.toLowerCase()}`}<ChevronRight size={17} /></button>
      <p className="form-footnote"><ShieldCheck size={13} /> Self-custody · Orders require wallet confirmation</p>
      <button className="advanced-toggle" onClick={() => setShowAdvanced(!showAdvanced)}><SlidersHorizontal size={13} /> Advanced settings <ChevronDown className={showAdvanced ? "rotate" : ""} size={13} /></button>
      {showAdvanced && <div className="advanced-box"><label><input type="checkbox" /> Post-only order</label><label><input type="checkbox" /> Reduce-only (sell)</label><p>Advanced execution options become active after the smart contract is deployed.</p></div>}
    </section>
  );
}

export default function Home() {
  const [activeView, setActiveView] = useState<View>("Trade");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [walletOpen, setWalletOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [presetPrice, setPresetPrice] = useState("");
  const [copied, setCopied] = useState(false);
  const { address, isConnected, chainId } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain, isPending: switching } = useSwitchChain();
  const { data: nativeBalance } = useBalance({ address });
  const isCorrectNetwork = chainId === arbitrumSepolia.id;
  const shortAddress = address ? `${address.slice(0, 6)}…${address.slice(-4)}` : "Connect wallet";
  const navItems: { name: View; icon: typeof Activity }[] = [
    { name: "Trade", icon: LayoutDashboard }, { name: "Portfolio", icon: Wallet }, { name: "Explorer", icon: FileSearch }, { name: "Faucet", icon: Zap },
  ];
  const handleNotice = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 5200); };
  const addressForExplorer = address ? `https://sepolia.arbiscan.io/address/${address}` : "https://sepolia.arbiscan.io";

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="topbar-left"><button className="mobile-menu icon-button" onClick={() => setMobileNavOpen(!mobileNavOpen)} aria-label="Toggle navigation"><Menu size={19} /></button><Logo /><div className="top-divider" /><span className="product-label">DECENTRALIZED EXCHANGE <span className="beta-tag">BETA</span></span></div>
        <div className="topbar-right">
          <div className="network-control"><span className="network-dot" /><span>Arbitrum Sepolia</span><ChevronDown size={14} /></div>
          <div className="gas-pill"><Zap size={13} /> <span>Gas</span> <b>—</b></div>
          {isConnected ? <div className="wallet-wrap"><button className={`wallet-button connected ${!isCorrectNetwork ? "wrong-network" : ""}`} onClick={() => setWalletOpen(!walletOpen)}><span className="wallet-live-dot" />{shortAddress}<ChevronDown size={14} /></button>{walletOpen && <div className="wallet-popover"><div className="popover-top"><span>Connected wallet</span><button onClick={() => setWalletOpen(false)} aria-label="Close wallet menu"><X size={14} /></button></div><b className="popover-address">{address}</b><span className="popover-balance">{nativeBalance ? `${Number(nativeBalance.formatted).toFixed(4)} ${nativeBalance.symbol}` : "Balance loading…"}</span>{!isCorrectNetwork && <button className="popover-action" onClick={() => switchChain({ chainId: arbitrumSepolia.id })}>Switch to Arbitrum Sepolia</button>}<a className="popover-action" href={addressForExplorer} target="_blank" rel="noreferrer">View on explorer <ExternalLink size={13} /></a><button className="disconnect-action" onClick={() => { disconnect(); setWalletOpen(false); }}>Disconnect wallet</button></div>}</div> : <div className="wallet-wrap"><button className="wallet-button" onClick={() => setWalletOpen(!walletOpen)}><Wallet size={15} /> Connect wallet <ChevronDown size={14} /></button>{walletOpen && <div className="wallet-popover connect-popover"><div className="popover-top"><span>Connect a wallet</span><button onClick={() => setWalletOpen(false)} aria-label="Close wallet menu"><X size={14} /></button></div><p className="popover-hint">Choose a wallet to connect to the testnet.</p>{connectors.map((connector) => <button className="connector-option" key={connector.uid} disabled={isPending} onClick={() => connect({ connector }, { onSuccess: () => setWalletOpen(false), onError: () => handleNotice("Wallet connection was not completed. Check your wallet extension and try again.") })}><span className="connector-icon">{connector.name.toLowerCase().includes("meta") ? "M" : "W"}</span>{connector.name}<ChevronRight size={15} /></button>)}{!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID && <p className="popover-footnote">WalletConnect is enabled after adding a project ID to <code>.env.local</code>.</p>}</div>}</div>}
        </div>
      </header>

      <div className="workspace">
        <aside className={`sidebar ${mobileNavOpen ? "sidebar-open" : ""}`}>
          <div className="sidebar-section-label">WORKSPACE</div>
          <nav className="side-nav" aria-label="Main navigation">{navItems.map(({ name, icon: Icon }) => <button key={name} onClick={() => { setActiveView(name); setMobileNavOpen(false); }} className={`nav-item ${activeView === name ? "nav-active" : ""}`}><Icon size={17} strokeWidth={1.8} /><span>{name}</span>{name === "Explorer" && <span className="nav-live" />}</button>)}</nav>
          <div className="sidebar-bottom"><div className="security-card"><div className="security-icon"><ShieldCheck size={17} /></div><b>Transparent by design</b><p>Verify every order and settlement onchain.</p><a href="https://sepolia.arbiscan.io" target="_blank" rel="noreferrer">Open block explorer <ExternalLink size={12} /></a></div><div className="sidebar-network"><span className="network-dot" /><span>Testnet environment</span><span className="sidebar-network-label">TEST</span></div><div className="sidebar-version">VERITRADE TERMINAL <span>v0.1.0</span></div></div>
        </aside>

        <section className="main-content">
          <div className="page-heading"><div><div className="eyebrow"><span className="network-dot" /> ONCHAIN MARKETS <ChevronRight size={12} /> {activeView.toUpperCase()}</div><h1>{activeView === "Trade" ? "Trading terminal" : activeView === "Portfolio" ? "Portfolio" : activeView === "Explorer" ? "Protocol explorer" : "Test token faucet"}</h1><p>{activeView === "Trade" ? "A precise, transparent view of the market." : activeView === "Portfolio" ? "Track wallet assets and order activity in one place." : activeView === "Explorer" ? "Inspect protocol events and transaction references." : "Get test assets to evaluate the trading flow."}</p></div><div className="page-heading-right"><span className="read-only-label"><span className="tiny-status-dot" /> PREVIEW ENVIRONMENT</span><button className="refresh-button" onClick={() => handleNotice("Preview panel refreshed. Market figures are illustrative sample data.")}><RefreshCw size={14} /> Refresh</button></div></div>

          {activeView === "Trade" && <>
            <div className="market-strip"><div className="market-title"><div className="coin-pair-icon"><span>Ξ</span><i>$</i></div><div><b>ETH / USDC</b><span>Ethereum <i className="pair-separator">·</i> USDC</span></div></div><div className="market-stat"><span>Last price</span><b>$2,485.70</b><small className="positive">+2.48%</small></div><div className="market-stat"><span>24h high</span><b>$2,512.40</b><small>24h range</small></div><div className="market-stat"><span>24h low</span><b>$2,421.10</b><small>24h range</small></div><div className="market-stat"><span>24h volume</span><b>$18.42M</b><small>ETH / USDC</small></div><div className="market-source"><span className="source-indicator" /> Sample data</div></div>
            <div className="trading-grid"><section className="panel chart-panel"><div className="panel-head"><div><h3>Price chart</h3><p className="panel-sub">ETH / USDC · 15 minute interval</p></div><div className="chart-head-actions"><span className="chart-kind"> <Activity size={13} /> Candlestick view</span><button className="icon-button" aria-label="Chart options"><SlidersHorizontal size={15} /></button></div></div><PriceChart /></section>
              <OrderForm connected={isConnected && isCorrectNetwork} viewConnect={() => { setWalletOpen(true); handleNotice("Connect your wallet on Arbitrum Sepolia to continue."); }} onOrderNotice={handleNotice} presetPrice={presetPrice} />
              <OrderBook onSelectPrice={(price) => { setPresetPrice(price); handleNotice(`Selected ${Number(price).toLocaleString()} USDC from the order book.`); }} />
            </div>
            <section className="panel orders-panel"><div className="panel-head orders-heading"><div><h3>Your orders</h3><p className="panel-sub">Open orders, activity and settlement history</p></div><div className="table-actions"><button className="table-tab active">Open orders <span>0</span></button><button className="table-tab">Order history</button><button className="table-tab">Trade history</button></div></div><div className="table-scroll"><table><thead><tr><th>PAIR</th><th>SIDE</th><th>PRICE (USDC)</th><th>AMOUNT (ETH)</th><th>TIME</th><th>TX HASH</th><th>STATUS</th></tr></thead><tbody>{marketRows.map((row, i) => <tr key={`${row.hash}-${i}`}><td><b>{row.pair}</b></td><td><span className={`side-pill ${row.side.toLowerCase()}`}>{row.side}</span></td><td>{row.price}</td><td>{row.amount}</td><td className="muted-cell">{row.time}</td><td><a className="hash-link" href="https://sepolia.arbiscan.io" target="_blank" rel="noreferrer">{row.hash} <ExternalLink size={11} /></a></td><td><span className="preview-status">Sample</span></td></tr>)}</tbody></table></div><div className="table-note"><span><CircleHelp size={13} /> Sample rows for layout preview. They are not onchain transactions.</span><button onClick={() => setActiveView("Explorer")}>View audit trail <ChevronRight size={13} /></button></div></section>
          </>}

          {activeView === "Portfolio" && <div className="secondary-view"><div className="portfolio-summary-grid"><div className="panel balance-card"><span className="card-kicker">TOTAL WALLET VALUE</span><strong>—</strong><p>Token pricing will appear when a market feed is connected.</p><div className="balance-divider" /><div className="balance-meta"><span>Connected wallet</span><b>{isConnected ? shortAddress : "Not connected"}</b></div></div><div className="panel portfolio-mini-stat"><span>TEST-ETH</span><strong>{nativeBalance ? Number(nativeBalance.formatted).toFixed(4) : "—"}</strong><small>Native Arbitrum Sepolia ETH</small><span className="asset-symbol eth">Ξ</span></div><div className="panel portfolio-mini-stat"><span>TEST-USDC</span><strong>—</strong><small>Token contract not configured</small><span className="asset-symbol usdc">$</span></div></div><section className="panel asset-table-panel"><div className="panel-head"><div><h3>Assets</h3><p className="panel-sub">Balances read from the connected wallet where configured</p></div><button className="refresh-button" onClick={() => handleNotice("Asset list refreshed. TEST-USDC needs its deployed token address.")}><RefreshCw size={14} /> Refresh</button></div><div className="table-scroll"><table><thead><tr><th>ASSET</th><th>NETWORK</th><th>WALLET BALANCE</th><th>USD VALUE</th><th>STATUS</th></tr></thead><tbody><tr><td><span className="asset-cell-icon eth">Ξ</span><span className="asset-name">Test ETH <small>ETH</small></span></td><td>Arbitrum Sepolia</td><td>{nativeBalance ? `${Number(nativeBalance.formatted).toFixed(5)} ETH` : "Connect wallet to read"}</td><td>—</td><td><span className="onchain-status">Onchain balance</span></td></tr><tr><td><span className="asset-cell-icon usdc">$</span><span className="asset-name">Test USD Coin <small>TEST-USDC</small></span></td><td>Arbitrum Sepolia</td><td>—</td><td>—</td><td><span className="preview-status">Token address needed</span></td></tr></tbody></table></div></section><section className="panel next-steps-panel"><div className="security-icon"><ShieldCheck size={18} /></div><div><h3>Finish testnet setup</h3><p>Add deployed token addresses and the OrderBook contract address to enable verified token balances and real order actions.</p></div><button className="outline-button" onClick={() => handleNotice("Configure NEXT_PUBLIC_TEST_USDC_ADDRESS and NEXT_PUBLIC_ORDERBOOK_ADDRESS in .env.local after deploying contracts.")}>View setup details <ChevronRight size={14} /></button></section></div>}

          {activeView === "Explorer" && <div className="secondary-view"><div className="explorer-summary-grid"><div className="panel explorer-stat"><span>NETWORK</span><b>Arbitrum Sepolia</b><small><Globe2 size={13} /> EVM testnet</small></div><div className="panel explorer-stat"><span>CONTRACT STATUS</span><b className="warning-text">Not configured</b><small>Awaiting OrderBook deployment</small></div><div className="panel explorer-stat"><span>EVENT SOURCE</span><b>Preview stream</b><small>Sample events · not live</small></div></div><section className="panel events-panel"><div className="panel-head"><div><h3>Protocol event stream</h3><p className="panel-sub">Order and settlement events — illustrative sample records</p></div><span className="stream-tag"><span className="tiny-status-dot" /> PREVIEW</span></div><div className="events-list">{events.map((event, i) => <div className="event-row" key={`${event.hash}-${i}`}><div className={`event-icon event-${event.type}`}>{event.type === "settled" ? <ShieldCheck size={16} /> : event.type === "cancel" ? <X size={16} /> : event.type === "matched" ? <Activity size={16} /> : <Plus size={16} />}</div><div className="event-info"><b>{event.name}</b><span>{event.desc}</span></div><div className="event-time"><b>{event.time}</b><span>Oct 21, 2026</span></div><a className="hash-link" href="https://sepolia.arbiscan.io" target="_blank" rel="noreferrer">{event.hash} <ExternalLink size={12} /></a></div>)}</div></section><section className="panel audit-info"><div className="audit-info-icon"><BookOpen size={18} /></div><div><h3>Public verification, no account required</h3><p>Once a contract is deployed, this page will read emitted events and link each transaction hash to the Arbitrum Sepolia explorer. No central account is needed to inspect public onchain activity.</p><a href="https://sepolia.arbiscan.io" target="_blank" rel="noreferrer">Open Arbiscan Sepolia <ExternalLink size={13} /></a></div></section></div>}

          {activeView === "Faucet" && <div className="secondary-view faucet-layout"><section className="panel faucet-card"><div className="faucet-icon"><Zap size={22} /></div><span className="card-kicker">TESTNET TOOLING</span><h2>Get test assets</h2><p>Use test tokens to try wallet connection and prepare for a trade. Testnet tokens have no real-world value.</p><div className="faucet-network-line"><span className="network-dot" /> Arbitrum Sepolia <span className="faucet-label">TESTNET</span></div><div className="faucet-token-row"><span className="asset-cell-icon eth">Ξ</span><div><b>Test ETH</b><small>Required for testnet gas fees</small></div><a href="https://faucet.quicknode.com/arbitrum/sepolia" target="_blank" rel="noreferrer">Open faucet <ExternalLink size={13} /></a></div><div className="faucet-token-row"><span className="asset-cell-icon usdc">$</span><div><b>TEST-USDC</b><small>Order quote token · contract not configured</small></div><button disabled title="Configure a test token faucet before enabling this action">Unavailable</button></div><button className="submit-order faucet-connect" onClick={() => { if (!isConnected) setWalletOpen(true); else if (!isCorrectNetwork) switchChain({ chainId: arbitrumSepolia.id }); else handleNotice("Wallet is connected. Test token faucet calls will be enabled after contract configuration."); }}>{!isConnected ? "Connect wallet" : !isCorrectNetwork ? "Switch to Arbitrum Sepolia" : "Check token setup"}<ChevronRight size={16} /></button><p className="form-footnote"><ShieldCheck size={13} /> Only use faucets you trust. Never share your seed phrase.</p></section><section className="panel faucet-guide"><h3>Before you trade</h3><div className="setup-step"><span>01</span><div><b>Connect a testnet wallet</b><p>Choose MetaMask or another injected wallet and switch to Arbitrum Sepolia.</p></div></div><div className="setup-step"><span>02</span><div><b>Get test ETH</b><p>Test ETH pays the gas fees required for wallet transactions on the testnet.</p></div></div><div className="setup-step"><span>03</span><div><b>Load test USDC</b><p>The project team must deploy or configure a test ERC-20 token and its faucet.</p></div></div><div className="setup-step"><span>04</span><div><b>Verify the contract</b><p>Use the block explorer to inspect contract details before interacting with it.</p></div></div></section></div>}

          <footer className="page-footer"><span>© 2026 VeriTrade Protocol <i /> Built for transparent peer-to-peer trading</span><div><a href="https://sepolia.arbiscan.io" target="_blank" rel="noreferrer">Arbiscan <ExternalLink size={11} /></a><a href="#docs" onClick={(e) => { e.preventDefault(); handleNotice("Documentation link will be added with the contract release."); }}>Docs <ExternalLink size={11} /></a><a href="#security" onClick={(e) => { e.preventDefault(); handleNotice("Security documentation will be published after contract review."); }}>Security <ExternalLink size={11} /></a></div></footer>
        </section>
      </div>
      {notice && <div className="toast" role="status"><div className="toast-icon"><CircleHelp size={16} /></div><span>{notice}</span><button onClick={() => setNotice("")} aria-label="Dismiss message"><X size={15} /></button></div>}
    </main>
  );
}
