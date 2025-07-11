import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { Tables } from '@/integrations/supabase/types';
import { useToast } from '@/hooks/use-toast';

type Subscriber = Tables<'subscribers'>;

interface AuthContextType {
  user: User | null;
  subscriber: Subscriber | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  checkSubscription: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const checkSubscription = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) throw error;
      
      // Get updated subscriber data from database
      const { data: subscriberData } = await supabase
        .from('subscribers')
        .select('*')
        .eq('email', user.email)
        .single();
        
      if (subscriberData) {
        setSubscriber(subscriberData);
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    toast({
      title: "เข้าสู่ระบบสำเร็จ",
      description: "ยินดีต้อนรับกลับ!",
    });
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    toast({
      title: "สมัครสมาชิกสำเร็จ",
      description: "กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี",
    });
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    setSubscriber(null);
    toast({
      title: "ออกจากระบบสำเร็จ",
      description: "ขอบคุณที่ใช้บริการ",
    });
  };

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        
        if (session?.user) {
          // Check subscription when user signs in
          setTimeout(checkSubscription, 1000);
        } else {
          setSubscriber(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [user]);

  const value = {
    user,
    subscriber,
    loading,
    signIn,
    signUp,
    signOut,
    checkSubscription,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};