
import React, { createContext, useContext, useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { Database } from "@/integrations/supabase/types";

export type UserRole = "youtuber" | "sponsor";

export type UserProfile = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  isVerified: boolean;
};

export interface YouTuberProfile {
  userId: string;
  channelName: string;
  channelUrl: string;
  description: string;
  categories: string[];
  location: string;
  priceRange: string;
  stats: {
    subscribers: number;
    averageViews: number;
    totalVideos: number;
    engagementRate: number;
  };
  pastBrands: string[];
  contentSamples: string[];
}

export interface SponsorProfile {
  userId: string;
  companyName: string;
  website: string;
  description: string;
  industry: string[];
  location: string;
  budget: string;
  targetAudience: string[];
  pastCampaigns: string[];
}

type AuthContextType = {
  user: UserProfile | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  getAllYouTubers: () => Promise<UserProfile[]>;
  getAllSponsors: () => Promise<UserProfile[]>;
  getUserById: (id: string) => Promise<UserProfile | null>;
  getYouTuberProfileByUserId: (userId: string) => Promise<YouTuberProfile | null>;
  getSponsorProfileByUserId: (userId: string) => Promise<SponsorProfile | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession?.user) {
          fetchUserProfile(currentSession.user);
        } else {
          setUser(null);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (authUser: User) => {
    try {
      // Use strongly typed query with proper table reference
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return;
      }

      if (data) {
        setUser({
          id: data.id,
          name: data.name,
          email: authUser.email || '',
          role: data.role as UserRole,
          avatar: data.avatar || '',
          isVerified: data.is_verified,
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast({
        title: "Login failed",
        description: error.message || "Invalid email or password. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
        },
      });

      if (error) {
        throw error;
      }
    } catch (error: any) {
      toast({
        title: "Registration failed",
        description: error.message || "Registration failed. Please try again.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error: any) {
      toast({
        title: "Logout failed",
        description: error.message || "Logout failed. Please try again.",
        variant: "destructive",
      });
    }
  };

  // New functions to replace mock data services
  const getAllYouTubers = async (): Promise<UserProfile[]> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'youtuber');

      if (error) {
        console.error('Error fetching YouTubers:', error);
        return [];
      }

      return data.map(profile => ({
        id: profile.id,
        name: profile.name,
        email: '', // Email not available from profiles table
        role: profile.role as UserRole,
        avatar: profile.avatar || '',
        isVerified: profile.is_verified,
      }));
    } catch (error) {
      console.error('Error fetching YouTubers:', error);
      return [];
    }
  };

  const getAllSponsors = async (): Promise<UserProfile[]> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'sponsor');

      if (error) {
        console.error('Error fetching sponsors:', error);
        return [];
      }

      return data.map(profile => ({
        id: profile.id,
        name: profile.name,
        email: '', // Email not available from profiles table
        role: profile.role as UserRole,
        avatar: profile.avatar || '',
        isVerified: profile.is_verified,
      }));
    } catch (error) {
      console.error('Error fetching sponsors:', error);
      return [];
    }
  };

  const getUserById = async (id: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        console.error('Error fetching user by ID:', error);
        return null;
      }

      return {
        id: data.id,
        name: data.name,
        email: '', // Email not available from profiles table
        role: data.role as UserRole,
        avatar: data.avatar || '',
        isVerified: data.is_verified,
      };
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      return null;
    }
  };

  // Note: These functions are placeholders. In a real app, you would need tables for YouTuber and Sponsor profiles
  const getYouTuberProfileByUserId = async (userId: string): Promise<YouTuberProfile | null> => {
    // This would fetch from a youtuber_profiles table in a real implementation
    console.log('Fetching YouTuber profile for:', userId);
    return null;
  };

  const getSponsorProfileByUserId = async (userId: string): Promise<SponsorProfile | null> => {
    // This would fetch from a sponsor_profiles table in a real implementation
    console.log('Fetching Sponsor profile for:', userId);
    return null;
  };

  const value = {
    user,
    session,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    getAllYouTubers,
    getAllSponsors,
    getUserById,
    getYouTuberProfileByUserId,
    getSponsorProfileByUserId,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
