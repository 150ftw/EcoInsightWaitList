import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/react'
import { dark } from '@clerk/themes'
import './index.css'
import App from './App.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY} 
      afterSignOutUrl="/"
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#8b5cf6',
          colorBackground: '#0a0a0a',
          colorText: '#ffffff',
          colorTextSecondary: '#ffffff', // Force secondary text to white for labels
          borderRadius: '24px',
        },
        elements: {
          card: {
            backgroundColor: 'rgba(12, 12, 12, 0.98)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(139, 92, 246, 0.1)',
          },
          headerTitle: {
            color: '#ffffff',
            fontSize: '1.75rem',
            fontWeight: '900',
            letterSpacing: '-0.04em',
          },
          headerSubtitle: {
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '1.1rem',
            opacity: 1,
          },
          formFieldLabel: {
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '1rem',
            marginBottom: '0.75rem',
          },
          formFieldInput: {
            backgroundColor: 'rgba(255, 255, 255, 0.1)', // Lightened from 0.05
            border: '1px solid rgba(255, 255, 255, 0.25)', // More visible border
            color: '#ffffff',
            fontSize: '1.1rem',
            padding: '1.15rem 1.25rem',
            '&:focus': {
              borderColor: '#8b5cf6',
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              boxShadow: '0 0 25px rgba(139, 92, 246, 0.3)',
            },
            '&::placeholder': {
              color: 'rgba(255, 255, 255, 0.6) !important',
            }
          },
          dividerText: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '0.9rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
          },
          dividerLine: {
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
          },
          socialButtonsBlockButton: {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
            }
          },
          socialButtonsBlockButtonText: {
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '1.05rem',
          },
          formButtonPrimary: {
            background: 'linear-gradient(135deg, #8b5cf6 0%, #d946ef 100%)',
            height: '3.5rem',
            fontSize: '1.1rem',
            fontWeight: '800',
            border: 'none',
            '&:hover': {
              filter: 'brightness(1.2)',
              transform: 'translateY(-2px)',
              boxShadow: '0 10px 20px rgba(139, 92, 246, 0.4)',
            }
          },
          footerActionText: {
            color: 'rgba(255, 255, 255, 0.85)',
            fontSize: '1rem',
          },
          footerActionLink: {
            color: '#8b5cf6',
            fontWeight: '800',
            '&:hover': {
              color: '#d946ef',
              textDecoration: 'underline',
            }
          },
          identityPreviewText: {
             color: '#ffffff',
             fontWeight: '700',
          },
          formFieldAction: {
            color: '#8b5cf6',
            fontWeight: '700',
          },
          // User Button Popover
          userButtonPopoverCard: {
            backgroundColor: 'rgba(12, 12, 12, 0.98)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
          },
          userButtonPopoverActionButtonText: {
            color: '#ffffff',
            fontWeight: '600',
          },
          userButtonPopoverActionButtonIcon: {
            color: '#ffffff',
          },
          userButtonPopoverHeaderTitle: {
            color: '#ffffff',
            fontWeight: '800',
          },
          userButtonPopoverHeaderSubtitle: {
            color: 'rgba(255, 255, 255, 0.7)',
          },
          userButtonPopoverFooter: {
            display: 'none', // Keeps it clean
          }
        }
      }}
    >
      <App />
    </ClerkProvider>
  </StrictMode>,
)
