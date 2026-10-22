import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, BadgeCheck, BookOpen, ChevronRight, ExternalLink, Fingerprint, ShieldCheck, Waypoints, Zap } from "lucide-react";

function Logo() {
  return <Link href="/" className="brand-mark" aria-label="VeriTrade home"><span className="brand-glyph">V</span><span className="brand-name">VERI<span>TRADE</span></span></Link>;
}

export default function LandingPage() {
  return (
    <main className="landing-shell">
      <header className="landing-nav">
        <Logo />
        <nav className="landing-links" aria-label="Main navigation"><a href="#markets">Markets</a><a href="#how-it-works">How it works</a><a href="#transparency">Transparency</a></nav>
        <div className="landing-nav-actions"><span className="landing-network"><i /> Arbitrum Sepolia</span><Link href="/trade" className="button-primary nav-launch">Launch terminal <ArrowRight size={15} /></Link></div>
      </header>

      <section className="landing-hero">
        <div className="hero-copy">
          <div className="hero-eyebrow"><span className="hero-eyebrow-mark"><Waypoints size={13} /></span> ONCHAIN TRADING, WITHOUT THE BLACK BOX <span className="hero-beta">TESTNET PREVIEW</span></div>
          <h1>Trade by your rules.<br /><span>Verify every move.</span></h1>
          <p className="hero-description">A self-custody marketplace for peer-to-peer limit orders. Transparent execution, visible order state, and settlement designed to be verified onchain.</p>
          <div className="hero-actions"><Link href="/trade" className="button-primary hero-cta">Open trading terminal <ArrowRight size={16} /></Link><a href="#how-it-works" className="button-secondary">Explore the protocol <ChevronRight size={15} /></a></div>
          <div className="hero-assurance"><span><ShieldCheck size={15} /> Self-custody by design</span><i /><span><Fingerprint size={14} /> Publicly auditable</span><i /><span><Zap size={14} /> EVM L2 testnet</span></div>
        </div>

        <div className="hero-terminal" aria-label="Illustrative trading terminal preview">
          <div className="terminal-topline"><div className="terminal-title-group"><span className="terminal-logo">V</span><div><b>ETH / USDC</b><small>SPOT MARKET <span className="terminal-test-pill">PREVIEW</span></small></div></div><div className="terminal-network"><i /> ARBITRUM SEPOLIA</div></div>
          <div className="terminal-price-row"><div><span className="terminal-label">INDICATIVE PRICE</span><strong>$2,485.70</strong></div><div className="terminal-change"><ArrowUpRight size={15} /> +2.48% <small>24H</small></div></div>
          <div className="terminal-chart-box">
            <div className="terminal-chart-labels"><span>2,510</span><span>2,495</span><span>2,480</span><span>2,465</span><span>2,450</span></div>
            <svg viewBox="0 0 530 210" preserveAspectRatio="none" className="landing-chart" role="img" aria-label="Illustrative market line, not live prices">
              <defs><linearGradient id="landingFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#10b981" stopOpacity=".22"/><stop offset="100%" stopColor="#10b981" stopOpacity="0"/></linearGradient></defs>
              {[20,62,104,146,188].map(y => <line key={y} x1="0" x2="530" y1={y} y2={y} stroke="#262a34" strokeDasharray="3 6"/>)}
              <polygon points="0,210 0,162 21,151 41,158 62,126 83,135 105,115 127,130 148,104 169,118 190,89 212,104 232,75 253,82 275,63 296,80 317,52 339,68 359,43 381,55 402,30 423,42 444,23 466,34 487,14 508,25 530,8 530,210" fill="url(#landingFill)"/>
              <polyline points="0,162 21,151 41,158 62,126 83,135 105,115 127,130 148,104 169,118 190,89 212,104 232,75 253,82 275,63 296,80 317,52 339,68 359,43 381,55 402,30 423,42 444,23 466,34 487,14 508,25 530,8" fill="none" stroke="#10b981" strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" strokeLinecap="round"/>
              <circle cx="530" cy="8" r="4" fill="#10b981" stroke="#10141b" strokeWidth="2"/>
            </svg>
            <div className="landing-price-tag">2,485.70</div>
            <div className="terminal-time-labels"><span>09:00</span><span>10:00</span><span>11:00</span><span>12:00</span><span>13:00</span></div>
          </div>
          <div className="terminal-bottom-row"><div><span className="terminal-label">TOP BID</span><b className="color-green">2,485.40</b></div><div><span className="terminal-label">TOP ASK</span><b className="color-red">2,485.70</b></div><div><span className="terminal-label">ORDER STATUS</span><b className="terminal-status"><i /> READY FOR TESTNET</b></div></div>
          <div className="terminal-footnote"><span><i /> Illustrative interface data</span><span>No live orders or prices shown</span></div>
        </div>
      </section>

      <section className="trust-strip" id="markets"><div className="trust-strip-intro">BUILT AROUND VERIFIABLE EXECUTION</div><div className="trust-point"><ShieldCheck size={17}/><span><b>Self-custody</b><small>Your wallet signs each action</small></span></div><div className="trust-point"><Waypoints size={17}/><span><b>Onchain order state</b><small>Designed for transparent order status</small></span></div><div className="trust-point"><BookOpen size={17}/><span><b>Open audit trail</b><small>Check transactions on the explorer</small></span></div></section>

      <section className="landing-section" id="how-it-works"><div className="section-heading"><div><span className="section-kicker">A CLEARER WAY TO TRADE</span><h2>Three steps. One verifiable flow.</h2></div><p>VeriTrade is designed to keep order actions and settlement visible—without asking users to trust a hidden matching service.</p></div><div className="steps-grid"><article className="step-card"><div className="step-number">01 <span><Fingerprint size={17}/></span></div><h3>Connect your wallet</h3><p>Use a self-custody EVM wallet on the supported test network. No platform account is required to inspect public activity.</p><div className="step-link">Wallet-first access <ArrowRight size={13}/></div></article><article className="step-card"><div className="step-number">02 <span><Waypoints size={17}/></span></div><h3>Place a limit order</h3><p>Choose a price and amount. The intended contract design uses explicit order state and escrow-backed order handling.</p><div className="step-link">Order-book design <ArrowRight size={13}/></div></article><article className="step-card"><div className="step-number">03 <span><BadgeCheck size={17}/></span></div><h3>Verify the outcome</h3><p>Follow emitted protocol events and inspect transaction hashes through the public testnet block explorer.</p><a className="step-link" href="https://sepolia.arbiscan.io" target="_blank" rel="noreferrer">Explore Arbiscan <ExternalLink size={12}/></a></article></div></section>

      <section className="transparency-section" id="transparency"><div className="transparency-icon"><ShieldCheck size={21}/></div><div className="transparency-copy"><span className="section-kicker">TRANSPARENCY, NOT PROMISES</span><h2>Verify the protocol, not just the interface.</h2><p>The current build is a testnet UI prototype. Contract addresses, order execution, and live market data are intentionally not presented as active until deployment and verification are complete.</p></div><div className="transparency-action"><span><i /> TESTNET PROTOTYPE</span><Link href="/trade" className="button-secondary">View terminal <ArrowRight size={14}/></Link></div></section>

      <footer className="landing-footer"><Logo/><span>© 2026 VeriTrade. A transparent-trading prototype.</span><div><a href="https://sepolia.arbiscan.io" target="_blank" rel="noreferrer">Arbiscan Sepolia <ExternalLink size={11}/></a><Link href="/trade">Trading terminal <ArrowUpRight size={12}/></Link></div></footer>
    </main>
  );
}
