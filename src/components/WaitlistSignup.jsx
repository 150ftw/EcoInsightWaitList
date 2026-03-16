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
      <section id="waitlist-section" style={{ padding: '140px 0', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
            <div className="accent-gradient-text" style={{ fontSize: '1.5rem', fontWeight: 700 }}>Initializing Bharat's Future...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist-section" style={{ padding: '140px 0', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="glass-card animate-fade-in" style={{ padding: '4rem', textAlign: 'center' }}>
          {!clerkUser ? (
            <>
              <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>Join the Dalal Street Elite</h2>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', marginBottom: '3.5rem', fontSize: '1.25rem', maxWidth: '500px', margin: '0 auto 3.5rem', lineHeight: 1.6 }}>
                EcoInsight requires a verified identity to maintain the quality of our alpha signals. Sign in to claim your spot.
              </p>
              <div style={{ display: 'flex', gap: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <SignInButton mode="modal">
                  <button className="btn-primary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem', minWidth: '180px' }}>Sign In</button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="btn-secondary" style={{ padding: '1.25rem 2.5rem', fontSize: '1.1rem', minWidth: '180px' }}>Create Account</button>
                </SignUpButton>
              </div>
            </>
          ) : !isSubscribed ? (
            <>
              <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                <UserButton />
                <span style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{clerkUser.primaryEmailAddress?.emailAddress}</span>
              </div>
              <h2 style={{ fontSize: '3rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>Ready to Claim Your Rank?</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '3.5rem', fontSize: '1.2rem' }}>
                You're signed in. Click below to officially join the waitlist and secure your Bharat edge.
              </p>
              <button 
                onClick={signup}
                className="btn-primary" 
                disabled={loading}
                style={{ width: '100%', padding: '1.5rem', fontSize: '1.4rem' }}
              >
                {loading ? 'Securing Spot...' : 'Claim My Waitlist Spot →'}
              </button>
            </>
          ) : (
            <div className="success-state animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
                <UserButton />
              </div>
              <div style={{ fontSize: '5rem', marginBottom: '2rem', filter: 'drop-shadow(0 0 20px var(--accent-primary))' }}>🛡️</div>
              <h2 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: 1.1 }}>Access Secured</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.3rem' }}>
                Welcome to the future of Indian fintech. Your rank in Bharat is:
              </p>
              
              <div className="accent-gradient-text" style={{ fontSize: '6rem', fontWeight: 900, marginBottom: '3rem', lineHeight: 1 }}>
                #{waitlistData?.position}
              </div>
              
              <div style={{ margin: '3rem 0', padding: '2.5rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: '24px', border: '1px dashed var(--glass-border)', position: 'relative' }}>
                <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 800, color: 'white' }}>Boost your rank</p>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '2rem' }}>For every referral, you jump ahead of the queue.</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <input 
                    readOnly 
                    value={getReferralLink()} 
                    className="input-field" 
                    style={{ flex: 1, fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)' }} 
                  />
                  <button onClick={copyLink} className="btn-primary" style={{ padding: '0 2rem', fontSize: '0.9rem' }}>
                    {copySuccess ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                <div className="glass-card" style={{ padding: '2rem' }}>
                  <div className="accent-gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>{waitlistData?.referral_count || 0}</div>
                  <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, marginTop: '0.5rem' }}>Referrals</div>
                </div>
                <div className="glass-card" style={{ padding: '2rem' }}>
                  <div className="accent-gradient-text" style={{ fontSize: '3rem', fontWeight: 800 }}>#{waitlistData?.position}</div>
                  <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, marginTop: '0.5rem' }}>Live Rank</div>
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
