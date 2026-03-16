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
      const { data: user, error: userError } = await supabase
        .from('waitlist')
        .select('*')
        .eq('email', userEmail)
        .single();

      if (userError || !user) {
        setIsSubscribed(false);
        return;
      }

      // Calculate position: (Users with more referrals) OR (Users with same referrals but joined earlier)
      const { count, error: countError } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true })
        .or(`referral_count.gt.${user.referral_count},and(referral_count.eq.${user.referral_count},created_at.lt.${user.created_at})`);

      if (countError) throw countError;

      const liveData = {
        ...user,
        position: RANK_OFFSET + (count || 0)
      };

      setWaitlistData(liveData);
      setIsSubscribed(true);
      localStorage.setItem('ecoinsight_waitlist', JSON.stringify(liveData));
    } catch (err) {
      console.error('Error fetching live stats:', err);
    }
  };

  const signup = async () => {
    if (!clerkUser) return;
    const emailAddr = clerkUser.primaryEmailAddress?.emailAddress;
    if (!emailAddr) return;

    setLoading(true);
    try {
      const emailAddr = clerkUser.primaryEmailAddress?.emailAddress;
      const finalReferralCode = referralCodeFromUrl || sessionStorage.getItem('ecoinsight_ref_code');
      
      console.log('Starting signup process for:', emailAddr);
      console.log('Referral code being used:', finalReferralCode);

      const newReferralCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      
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
