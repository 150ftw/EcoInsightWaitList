import React, { useState } from 'react';
import { useWaitlist } from '../hooks/useWaitlist';
import { SignInButton, SignOutButton, SignUpButton, UserButton } from '@clerk/react';

const WaitlistSignup = () => {
  const { clerkUser, isLoaded, isSubscribed, waitlistData, loading, signup, getReferralLink } = useWaitlist();
  const [copySuccess, setCopySuccess] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(getReferralLink());
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  if (!isLoaded) {
    return (
      <section id="waitlist-section" style={{ padding: 'clamp(60px, 12vh, 140px) 0', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="glass-card" style={{ padding: 'clamp(2rem, 8vw, 4rem)', textAlign: 'center' }}>
            <div className="accent-gradient-text" style={{ fontSize: 'clamp(1.1rem, 4vw, 1.5rem)', fontWeight: 700 }}>Initializing Bharat's Future...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist-section" style={{ padding: 'clamp(4rem, 15vh, 140px) 0', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="glass-card animate-fade-in" style={{ padding: 'clamp(2rem, 8vw, 4rem)', textAlign: 'center' }}>
          {!clerkUser ? (
            <>
              <div className="exclusive-badge" style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(139, 92, 246, 0.1)', border: '1px solid var(--accent-primary)', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--accent-primary)', marginBottom: '2rem' }}>Priority Enrollment Open</div>
              <h2 style={{ marginBottom: '1.5rem', lineHeight: 1.1 }}>Request Exclusive Entry</h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: 'clamp(2rem, 6vw, 3.5rem)', fontSize: 'clamp(1rem, 3vw, 1.25rem)', maxWidth: '500px', margin: '0 auto clamp(2.5rem, 6vw, 3.5rem)', lineHeight: 1.6 }}>
                EcoInsight enrollment is strictly restricted to verified foundational slots. Access is currently <strong>request-only</strong>.
              </p>
              <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'center' }}>
                <SignInButton mode="modal">
                  <button className="btn-primary" style={{ minWidth: 'min(300px, 100%)', width: '100%' }}>Sign In</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="btn-secondary" style={{ minWidth: 'min(300px, 100%)', width: '100%' }}>Create Account</button>
                </SignUpButton>
              </div>
            </>
          ) : !isSubscribed ? (
            <>
              <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <UserButton />
                <span style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)' }}>{clerkUser.primaryEmailAddress?.emailAddress}</span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>Secure Your Foundational Slot</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: 'clamp(2.5rem, 6vw, 3.5rem)', fontSize: 'clamp(1rem, 2.5vw, 1.2rem)' }}>
                Identity verified. Click below to officially request your priority slot in the EcoInsight institutional network.
              </p>
              <button 
                onClick={signup}
                className="btn-primary" 
                disabled={loading}
                style={{ width: '100%', padding: '1.5rem', fontSize: 'clamp(1.1rem, 4vw, 1.4rem)' }}
              >
                {loading ? 'Requesting Access...' : 'Request Priority Entry →'}
              </button>
            </>
          ) : (
            <div className="success-state animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <UserButton />
              </div>
              <div style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', marginBottom: '1.5rem', filter: 'drop-shadow(0 0 20px var(--accent-primary))' }}>🛡️</div>
              <h2 style={{ marginBottom: '1rem', lineHeight: 1.1 }}>Entry Slot Secured</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: 'clamp(1.1rem, 3vw, 1.3rem)' }}>
                Welcome to the institutional network. Your foundational entry number is:
              </p>
              
              <div className="accent-gradient-text" style={{ fontSize: 'clamp(4rem, 15vw, 7rem)', fontWeight: 900, marginBottom: '2rem', lineHeight: 1 }}>
                #{waitlistData?.position}
              </div>
              
              <div className="referral-link-container" style={{ margin: 'clamp(2rem, 6vw, 3.1rem) 0', padding: 'clamp(1.5rem, 5vw, 2.5rem)', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '24px', border: '1px dashed var(--glass-border)', position: 'relative' }}>
                <p style={{ fontSize: 'clamp(1rem, 3vw, 1.2rem)', marginBottom: '1rem', fontWeight: 800, color: 'white' }}>🚀 Skip the Queue</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>Successfully refer <strong>3 foundational members</strong> to jump to the front of the line for instant portal access.</p>
                <div className="referral-input-group" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', flexDirection: 'column', alignItems: 'stretch' }}>
                  <input 
                    readOnly 
                    value={getReferralLink()} 
                    className="input-field" 
                    style={{ flex: 1, width: '100%', fontSize: '0.85rem', background: 'rgba(0,0,0,0.2)', textAlign: 'center' }} 
                  />
                  <button onClick={copyLink} className="btn-primary" style={{ width: '100%', padding: '1rem 1.5rem', fontSize: '1rem' }}>
                    {copySuccess ? 'Copied Link! ✅' : 'Copy Referral Link'}
                  </button>
                </div>
              </div>

              <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem' }}>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <div className="accent-gradient-text" style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: 800 }}>{waitlistData?.referral_count || 0}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, marginTop: '0.5rem' }}>Network Boost</div>
                </div>
                <div className="glass-card" style={{ padding: '1.5rem' }}>
                  <div className="accent-gradient-text" style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', fontWeight: 800 }}>#{waitlistData?.position}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, marginTop: '0.5rem' }}>Queue No.</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default WaitlistSignup;
