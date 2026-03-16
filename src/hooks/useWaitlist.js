import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useUser } from '@clerk/react';
import { welcomeTemplate } from '../lib/templates/welcome-template';

export const useWaitlist = () => {
  const { user: clerkUser, isLoaded } = useUser();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [waitlistData, setWaitlistData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [referralCodeFromUrl, setReferralCodeFromUrl] = useState(null);

  const RANK_OFFSET = 1580;

  useEffect(() => {
    // Check for referral code in URL or SessionStorage
    const params = new URLSearchParams(window.location.search);
    const refFromUrl = params.get('ref');
    
    if (refFromUrl) {
      setReferralCodeFromUrl(refFromUrl);
      sessionStorage.setItem('ecoinsight_ref_code', refFromUrl);
    } else {
      const savedRef = sessionStorage.getItem('ecoinsight_ref_code');
      if (savedRef) setReferralCodeFromUrl(savedRef);
    }
  }, []);

  useEffect(() => {
    if (isLoaded && clerkUser) {
      const email = clerkUser.primaryEmailAddress?.emailAddress;
      if (email) fetchLiveStats(email);
    }
  }, [isLoaded, clerkUser]);

  const fetchLiveStats = async (userEmail) => {
    try {
      console.log('Fetching live stats for:', userEmail);
      const { data: user, error: userError } = await supabase
        .from('waitlist')
        .select('*')
        .eq('email', userEmail)
        .maybeSingle();

      if (userError) {
        console.error('❌ Supabase fetch error:', userError);
        setIsSubscribed(false);
        return;
      }

      if (!user) {
        setIsSubscribed(false);
        return;
      }

      // Calculate position
      const { count, error: countError } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .lt('created_at', user.created_at);

      if (countError) {
        console.error('Supabase count error:', countError);
        throw countError;
      }

      const liveData = {
        ...user,
        position: RANK_OFFSET + (count || 0)
      };

      console.log('Successfully fetched live data:', liveData);
      setWaitlistData(liveData);
      setIsSubscribed(true);
      localStorage.setItem('ecoinsight_waitlist', JSON.stringify(liveData));
    } catch (err) {
      console.error('Error in fetchLiveStats:', err);
    }
  };

  const signup = async () => {
    console.log('🖱️ CLAMP MY SPOT CLICKED');
    if (!clerkUser) {
      console.log('❌ Signup failed: No Clerk user found');
      return;
    }
    const emailAddr = clerkUser.primaryEmailAddress?.emailAddress;
    console.log('📧 Email detected:', emailAddr);
    if (!emailAddr) {
      console.log('❌ Signup failed: No email address found');
      return;
    }

    setLoading(true);
    try {
      const emailAddr = clerkUser.primaryEmailAddress?.emailAddress;
      const finalReferralCode = referralCodeFromUrl || sessionStorage.getItem('ecoinsight_ref_code');
      
      console.log('Starting signup process for:', emailAddr);
      console.log('Referral code being used:', finalReferralCode);

      const newReferralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
      console.log('Attempting Supabase insert for:', { email: emailAddr, referred_by: finalReferralCode });
      const { data, error } = await supabase
        .from('waitlist')
        .insert([
          { 
            email: emailAddr, 
            referral_code: newReferralCode, 
            referred_by: finalReferralCode 
          }
        ])
        .select()
        .single();

      if (error) {
        if (error.code === '23505') {
          console.log('User already on waitlist, fetching stats...');
          await fetchLiveStats(emailAddr);
        } else {
          console.error('Supabase Insert Error:', error);
          throw error;
        }
      } else {
        console.log('Signup successful!');
        
        // --- 📧 MODIFIED: Send Welcome Email via Vercel Serverless Function ---
        try {
          console.log('Invoking welcome email (Vercel API) for:', emailAddr);
          const response = await fetch('/api/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: emailAddr })
          });
          const result = await response.json();
          if (!response.ok) {
            console.error('Welcome email API failed:', result.error || 'Unknown error', result.details || '');
          } else {
            console.log('Welcome email sent successfully:', result);
          }
        } catch (emailErr) {
          console.error('Welcome email Vercel API failed to invoke:', emailErr);
        }
        // -------------------------------------------------------------

        if (finalReferralCode) {
          console.log('Boosting referrer:', finalReferralCode);
          const { error: rpcError } = await supabase.rpc('increment_referral_count', { ref_code: finalReferralCode });
          if (rpcError) console.error('RPC Boost Error:', rpcError);
          
          sessionStorage.removeItem('ecoinsight_ref_code');
          setReferralCodeFromUrl(null);
        }
        await fetchLiveStats(emailAddr);
      }
    } catch (err) {
      console.error('Signup failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const getReferralLink = () => {
    if (!waitlistData) return '';
    const baseUrl = window.location.origin;
    return `${baseUrl}?ref=${waitlistData.referral_code}`;
  };

  return {
    clerkUser,
    isLoaded,
    isSubscribed,
    waitlistData,
    loading,
    signup,
    getReferralLink
  };
};
