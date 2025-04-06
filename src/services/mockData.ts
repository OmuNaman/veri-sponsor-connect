
import { UserProfile, UserRole } from "@/contexts/AuthContext";

// Define interfaces for YouTuber and Sponsor profiles
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

// Mock user data for development and testing
export const mockUsers: UserProfile[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "youtuber",
    avatar: "https://i.pravatar.cc/150?img=1",
    isVerified: true,
  },
  {
    id: "2", 
    name: "Alex Rodriguez",
    email: "alex@example.com",
    role: "youtuber",
    avatar: "https://i.pravatar.cc/150?img=2",
    isVerified: true,
  },
  {
    id: "3",
    name: "Tech Gadgets Inc.",
    email: "contact@techgadgets.com",
    role: "sponsor",
    avatar: "https://i.pravatar.cc/150?img=3",
    isVerified: true,
  },
  {
    id: "4",
    name: "GreenEats",
    email: "partnerships@greeneats.com",
    role: "sponsor",
    avatar: "https://i.pravatar.cc/150?img=4",
    isVerified: true,
  },
  {
    id: "5",
    name: "Jamie Chen",
    email: "jamie@example.com",
    role: "youtuber",
    avatar: "https://i.pravatar.cc/150?img=5",
    isVerified: false,
  },
];

// Mock YouTuber profile data
const mockYouTuberProfiles: YouTuberProfile[] = [
  {
    userId: "1",
    channelName: "TechWithSarah",
    channelUrl: "https://youtube.com/techwithsarah",
    description: "I create videos about the latest tech gadgets, software reviews, and tech tips for everyday users.",
    categories: ["Technology", "Gadgets", "Reviews"],
    location: "San Francisco, CA",
    priceRange: "$1,000 - $5,000",
    stats: {
      subscribers: 850000,
      averageViews: 125000,
      totalVideos: 230,
      engagementRate: 5.8
    },
    pastBrands: ["Samsung", "Logitech", "Squarespace"],
    contentSamples: [
      "https://youtube.com/watch?v=sample1",
      "https://youtube.com/watch?v=sample2"
    ]
  },
  {
    userId: "2",
    channelName: "Game Zone with Alex",
    channelUrl: "https://youtube.com/gamezonealex",
    description: "Gaming walkthroughs, reviews, and industry news for passionate gamers.",
    categories: ["Gaming", "Technology", "Entertainment"],
    location: "Austin, TX",
    priceRange: "$2,000 - $7,000",
    stats: {
      subscribers: 1200000,
      averageViews: 300000,
      totalVideos: 450,
      engagementRate: 7.2
    },
    pastBrands: ["Razer", "Nvidia", "EA Games"],
    contentSamples: [
      "https://youtube.com/watch?v=sample3",
      "https://youtube.com/watch?v=sample4"
    ]
  },
  {
    userId: "5",
    channelName: "Jamie's Kitchen",
    channelUrl: "https://youtube.com/jamieskitchen",
    description: "Simple, delicious recipes for home cooks of all skill levels.",
    categories: ["Cooking", "Food", "Lifestyle"],
    location: "Portland, OR",
    priceRange: "$800 - $3,000",
    stats: {
      subscribers: 420000,
      averageViews: 85000,
      totalVideos: 120,
      engagementRate: 6.5
    },
    pastBrands: ["HelloFresh", "KitchenAid", "Whole Foods"],
    contentSamples: [
      "https://youtube.com/watch?v=sample5",
      "https://youtube.com/watch?v=sample6"
    ]
  }
];

// Mock Sponsor profile data
const mockSponsorProfiles: SponsorProfile[] = [
  {
    userId: "3",
    companyName: "Tech Gadgets Inc.",
    website: "https://techgadgets.example.com",
    description: "We create innovative tech gadgets for everyday use. Our products include smart home devices, wearables, and mobile accessories.",
    industry: ["Technology", "Consumer Electronics", "Smart Home"],
    location: "Seattle, WA",
    budget: "$5,000 - $20,000",
    targetAudience: ["Tech enthusiasts", "Early adopters", "25-40 age group"],
    pastCampaigns: [
      "Product launch video sponsorships",
      "Unboxing and review collaborations",
      "Tech convention coverage"
    ]
  },
  {
    userId: "4",
    companyName: "GreenEats",
    website: "https://greeneats.example.com",
    description: "Sustainable, plant-based meal kits delivered to your door. We make healthy eating easy and eco-friendly.",
    industry: ["Food", "Health", "Sustainability"],
    location: "Chicago, IL",
    budget: "$3,000 - $15,000",
    targetAudience: ["Health-conscious consumers", "Environmentally aware", "22-45 age group"],
    pastCampaigns: [
      "Recipe integration videos",
      "Meal kit unboxing and cooking",
      "Health and wellness collaborations"
    ]
  }
];

// Helper functions to get data
export const getUserById = (id: string): UserProfile | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getAllYouTubers = (): UserProfile[] => {
  return mockUsers.filter(user => user.role === "youtuber");
};

export const getAllSponsors = (): UserProfile[] => {
  return mockUsers.filter(user => user.role === "sponsor");
};

export const getYouTuberProfileByUserId = (userId: string): YouTuberProfile | null => {
  return mockYouTuberProfiles.find(profile => profile.userId === userId) || null;
};

export const getSponsorProfileByUserId = (userId: string): SponsorProfile | null => {
  return mockSponsorProfiles.find(profile => profile.userId === userId) || null;
};
