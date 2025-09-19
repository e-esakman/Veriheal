import { createClient } from '@supabase/supabase-js';

// You'll need to add these to your .env file
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

// Only create client if both URL and key are provided
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const signInWithWallet = async (walletAddress: string) => {
  if (!supabase) {
    console.warn('Supabase not configured, skipping auth');
    // Return a mock user for development
    return {
      user: {
        id: walletAddress,
        wallet_address: walletAddress,
        user_metadata: {
          username: `user_${walletAddress.slice(-8)}`,
          display_name: `Wallet User ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
        }
      },
      error: null
    };
  }

  try {
    // First, try to sign in with the wallet address as a custom auth
    const { data, error } = await supabase.auth.signInWithPassword({
      email: `${walletAddress}@wallet.local`, // Create a pseudo-email from wallet address
      password: walletAddress, // Use wallet address as password (you might want to hash this)
    });

    if (error && error.message.includes('Invalid login credentials')) {
      // If user doesn't exist, create a new account
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: `${walletAddress}@wallet.local`,
        password: walletAddress,
        options: {
          data: {
            wallet_address: walletAddress,
            username: `user_${walletAddress.slice(-8)}`,
            display_name: `Wallet User ${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`,
          }
        }
      });

      if (signUpError) {
        console.error('Sign up error:', signUpError);
        return { user: null, error: signUpError };
      }

      return { user: signUpData.user, error: null };
    }

    if (error) {
      console.error('Sign in error:', error);
      return { user: null, error };
    }

    return { user: data.user, error: null };
  } catch (error) {
    console.error('Wallet auth error:', error);
    return { user: null, error };
  }
};

export const signOutWallet = async () => {
  if (!supabase) {
    console.warn('Supabase not configured, skipping sign out');
    return;
  }
  
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Sign out error:', error);
    throw error;
  }
};

export const getCurrentWalletUser = async () => {
  if (!supabase) {
    console.warn('Supabase not configured, returning null user');
    return null;
  }
  
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Get user error:', error);
    return null;
  }
  return user;
};