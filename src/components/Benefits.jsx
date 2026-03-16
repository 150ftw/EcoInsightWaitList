const Icons = {
  Market: () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 21H3V3" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 14L12 9L16 13L21 8" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="21" cy="8" r="2" fill="var(--accent-secondary)"/>
    </svg>
  ),
  Realtime: () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill="var(--accent-primary)" fillOpacity="0.2" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M13 2L3 14H12L11 22" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Smarter: () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5 2C7.567 2 6 3.567 6 5.5C6 6.71118 6.6136 7.77881 7.54639 8.40465C7.26514 8.71887 7.1084 9.12469 7.1084 9.57031C7.1084 10.3662 7.63222 11.0336 8.35122 11.238C8.1275 11.4647 8 11.7821 8 12.1328C8 12.8797 8.58661 13.4844 9.30945 13.4844H10.6906C11.4134 13.4844 12 12.8797 12 12.1328C12 11.7821 11.8725 11.4647 11.6488 11.238C12.3678 11.0336 12.8916 10.3662 12.8916 9.57031C12.8916 9.12469 12.7349 8.71887 12.4536 8.40465C13.3864 7.77881 14 6.71118 14 5.5C14 3.567 12.433 2 10.5 2H9.5Z" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 21C12 21 17 20 17 15C17 12 15 10 12 10C9 10 7 12 7 15C7 20 12 21 12 21Z" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  Early: () => (
    <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 16.5L12 19L19.5 16.5V11L12 8.5L4.5 11V16.5Z" stroke="var(--accent-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 8.5V4M8 5L12 8.5L16 5" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 19V22M8 21.5L12 19L16 21.5" stroke="var(--accent-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
};

const benefits = [
  {
    title: 'Nifty & Sensex Alpha',
    description: 'Our AI identifies patterns across NSE and BSE indices to find high-growth multibagger opportunities before the street.',
    icon: <Icons.Market />
  },
  {
    title: 'Real-Time On/Off-Chain Analytics',
    description: 'Live tracking of FII & DII data, bulk deals, and corporate actions that move the Indian indices.',
    icon: <Icons.Realtime />
  },
  {
    title: 'Tax-Optimized Insights',
    description: 'Intelligence that considers STCG/LTCG implications, helping you maximize your post-tax wealth in India.',
    icon: <Icons.Smarter />
  },
  {
    title: 'Bharat-First Intelligence',
    description: 'Tailored for the unique volatility and sector rotations of the Indian economy, from IT to Fintech.',
    icon: <Icons.Early />
  }
];

const Benefits = () => {
  return (
    <section style={{ padding: 'clamp(4rem, 10vh, 7.5rem) 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 8vw, 6rem)' }}>
          <h2 style={{ marginBottom: '1.5rem', lineHeight: 1.1 }}>Invest with a Bharat Edge</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(1rem, 3vw, 1.2rem)', maxWidth: '700px', margin: '0 auto', opacity: 0.9 }}>
            Generic tools ignore the nuances of the Indian market. EcoInsight is built for the Indian investor, providing clarity in the world's fastest-growing economy.
          </p>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(250px, 100%, 300px), 1fr))', 
          gap: 'clamp(1.5rem, 4vw, 2.5rem)' 
        }}>
          {benefits.map((benefit, index) => (
            <div key={index} className="glass-card animate-fade-in" style={{ 
              padding: 'clamp(2rem, 5vw, 3.5rem)', 
              animationDelay: `${0.1 * index}s`, 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem', 
              alignItems: 'center', 
              textAlign: 'center' 
            }}>
              <div style={{ 
                width: 'clamp(60px, 12vw, 80px)', 
                height: 'clamp(60px, 12vw, 80px)', 
                marginBottom: '1rem', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                background: 'rgba(139, 92, 246, 0.05)', 
                borderRadius: '20px', 
                border: '1px solid rgba(139, 92, 246, 0.1)' 
              }}>
                {benefit.icon}
              </div>
              <h3 style={{ fontSize: 'clamp(1.25rem, 4vw, 1.6rem)', marginBottom: '0.5rem', color: 'white' }}>{benefit.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 'clamp(0.95rem, 3vw, 1.1rem)', lineHeight: 1.6 }}>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
