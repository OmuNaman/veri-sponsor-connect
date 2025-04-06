
import { User, UserRole } from "@/contexts/AuthContext";

// Types for YouTuber profiles
export type YouTuberStats = {
  subscribers: number;
  averageViews: number;
  totalVideos: number;
  engagementRate: number;
};

export type YouTuberProfile = {
  id: string;
  userId: string;
  channelName: string;
  channelUrl: string;
  description: string;
  categories: string[];
  location: string;
  stats: YouTuberStats;
  pastBrands: string[];
  contentSamples: string[];
  priceRange: string;
};

// Types for Sponsor profiles
export type SponsorProfile = {
  id: string;
  userId: string;
  companyName: string;
  website: string;
  description: string;
  industry: string[];
  location: string;
  budget: string;
  targetAudience: string[];
  pastCampaigns: string[];
};

// Message types
export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
};

export type Conversation = {
  id: string;
  participants: string[];
  lastMessage: Message;
  unreadCount: number;
};

// Campaign/Sponsorship types
export type SponsorshipStatus = "pending" | "active" | "completed" | "declined";

export type Sponsorship = {
  id: string;
  sponsorId: string;
  youtuberId: string;
  title: string;
  description: string;
  budget: string;
  requirements: string;
  status: SponsorshipStatus;
  createdAt: Date;
  updatedAt: Date;
};

// Mock users (extended from AuthContext)
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Tech Innovations Inc.",
    email: "sponsor@example.com",
    role: "sponsor",
    avatar: "https://i.pravatar.cc/150?img=3",
    isVerified: true,
  },
  {
    id: "2",
    name: "Gaming Legends",
    email: "youtuber@example.com",
    role: "youtuber",
    avatar: "https://i.pravatar.cc/150?img=4",
    isVerified: true,
  },
  {
    id: "3",
    name: "Beauty Brand Co.",
    email: "beautybrand@example.com",
    role: "sponsor",
    avatar: "https://i.pravatar.cc/150?img=5",
    isVerified: true,
  },
  {
    id: "4",
    name: "Tech Reviews",
    email: "techreviewer@example.com",
    role: "youtuber",
    avatar: "https://i.pravatar.cc/150?img=6",
    isVerified: true,
  },
  {
    id: "5",
    name: "Travel Vlogger",
    email: "travelvlog@example.com",
    role: "youtuber",
    avatar: "https://i.pravatar.cc/150?img=7",
    isVerified: false,
  },
  {
    id: "6",
    name: "Fitness Equipment",
    email: "fitgear@example.com",
    role: "sponsor",
    avatar: "https://i.pravatar.cc/150?img=8",
    isVerified: true,
  },
  {
    id: "7",
    name: "Cooking Channel",
    email: "foodie@example.com",
    role: "youtuber",
    avatar: "https://i.pravatar.cc/150?img=9",
    isVerified: true,
  },
  {
    id: "8",
    name: "Fashion Brand",
    email: "stylish@example.com",
    role: "sponsor",
    avatar: "https://i.pravatar.cc/150?img=10",
    isVerified: false,
  },
];

// Mock YouTuber profiles
export const mockYouTuberProfiles: YouTuberProfile[] = [
  {
    id: "yt1",
    userId: "2",
    channelName: "Gaming Legends",
    channelUrl: "https://youtube.com/gaminglegends",
    description: "Premier gaming channel featuring the latest game reviews, walkthroughs, and industry news. Specializing in AAA titles and indie gems.",
    categories: ["Gaming", "Technology", "Reviews"],
    location: "Los Angeles, CA",
    stats: {
      subscribers: 850000,
      averageViews: 120000,
      totalVideos: 450,
      engagementRate: 8.5
    },
    pastBrands: ["NVIDIA", "Razer", "Logitech"],
    contentSamples: [
      "https://youtube.com/watch?v=sample1",
      "https://youtube.com/watch?v=sample2",
    ],
    priceRange: "$3,000 - $5,000"
  },
  {
    id: "yt2",
    userId: "4",
    channelName: "Tech Reviews",
    channelUrl: "https://youtube.com/techreviews",
    description: "In-depth analysis and reviews of the latest smartphones, laptops, and gadgets. Honest opinions and detailed comparisons.",
    categories: ["Technology", "Reviews", "Gadgets"],
    location: "New York, NY",
    stats: {
      subscribers: 1200000,
      averageViews: 250000,
      totalVideos: 380,
      engagementRate: 7.2
    },
    pastBrands: ["Samsung", "Apple", "Google"],
    contentSamples: [
      "https://youtube.com/watch?v=techsample1",
      "https://youtube.com/watch?v=techsample2",
    ],
    priceRange: "$5,000 - $8,000"
  },
  {
    id: "yt3",
    userId: "5",
    channelName: "Travel Adventures",
    channelUrl: "https://youtube.com/traveladventures",
    description: "Exploring the world's most beautiful and remote destinations. Travel guides, tips, and breathtaking cinematography.",
    categories: ["Travel", "Adventure", "Lifestyle"],
    location: "Miami, FL",
    stats: {
      subscribers: 620000,
      averageViews: 95000,
      totalVideos: 210,
      engagementRate: 6.8
    },
    pastBrands: ["Airbnb", "TripAdvisor", "DJI"],
    contentSamples: [
      "https://youtube.com/watch?v=travelsample1",
      "https://youtube.com/watch?v=travelsample2",
    ],
    priceRange: "$2,000 - $4,000"
  },
  {
    id: "yt4",
    userId: "7",
    channelName: "Gourmet Kitchen",
    channelUrl: "https://youtube.com/gourmetkitchen",
    description: "Delicious recipes and cooking techniques for home chefs. From quick weeknight meals to impressive dinner party dishes.",
    categories: ["Cooking", "Food", "Lifestyle"],
    location: "Chicago, IL",
    stats: {
      subscribers: 980000,
      averageViews: 185000,
      totalVideos: 320,
      engagementRate: 9.2
    },
    pastBrands: ["KitchenAid", "Whole Foods", "Blue Apron"],
    contentSamples: [
      "https://youtube.com/watch?v=foodsample1",
      "https://youtube.com/watch?v=foodsample2",
    ],
    priceRange: "$3,500 - $6,000"
  }
];

// Mock Sponsor profiles
export const mockSponsorProfiles: SponsorProfile[] = [
  {
    id: "sp1",
    userId: "1",
    companyName: "Tech Innovations Inc.",
    website: "https://techinnovations.example.com",
    description: "Leading technology company specializing in AI-powered consumer electronics and smart home devices.",
    industry: ["Technology", "Consumer Electronics", "Smart Home"],
    location: "San Francisco, CA",
    budget: "$10,000 - $50,000 per campaign",
    targetAudience: ["Tech enthusiasts", "Early adopters", "Professionals", "18-45 age group"],
    pastCampaigns: ["Smart Home Essentials Launch", "AI Assistant Promotion"]
  },
  {
    id: "sp2",
    userId: "3",
    companyName: "Beauty Brand Co.",
    website: "https://beautybrand.example.com",
    description: "Premium skincare and makeup brand committed to sustainable beauty practices and cruelty-free products.",
    industry: ["Beauty", "Skincare", "Cosmetics"],
    location: "New York, NY",
    budget: "$5,000 - $30,000 per campaign",
    targetAudience: ["Beauty enthusiasts", "Women 18-45", "Environmentally conscious consumers"],
    pastCampaigns: ["Summer Glow Collection", "Eco-Friendly Packaging Initiative"]
  },
  {
    id: "sp3",
    userId: "6",
    companyName: "Fitness Equipment Pro",
    website: "https://fitnessequipment.example.com",
    description: "High-quality fitness equipment for home and professional gyms. Innovative designs for effective workouts.",
    industry: ["Fitness", "Sports Equipment", "Health"],
    location: "Denver, CO",
    budget: "$8,000 - $25,000 per campaign",
    targetAudience: ["Fitness enthusiasts", "Home gym owners", "Personal trainers", "25-50 age group"],
    pastCampaigns: ["Home Workout Revolution", "Professional Series Launch"]
  },
  {
    id: "sp4",
    userId: "8",
    companyName: "Fashion Forward",
    website: "https://fashionforward.example.com",
    description: "Contemporary fashion brand offering trendy apparel and accessories for the style-conscious consumer.",
    industry: ["Fashion", "Apparel", "Accessories"],
    location: "Los Angeles, CA",
    budget: "$7,000 - $20,000 per campaign",
    targetAudience: ["Fashion enthusiasts", "Young adults 18-35", "Urban professionals"],
    pastCampaigns: ["Summer Collection Showcase", "Sustainable Denim Line"]
  }
];

// Mock conversations and messages
export const mockConversations: Conversation[] = [
  {
    id: "conv1",
    participants: ["1", "2"],
    lastMessage: {
      id: "msg3",
      conversationId: "conv1",
      senderId: "1",
      receiverId: "2",
      content: "Great! I'd like to discuss the details of our potential collaboration.",
      timestamp: new Date(2024, 3, 4, 10, 30),
      read: false
    },
    unreadCount: 1
  },
  {
    id: "conv2",
    participants: ["1", "4"],
    lastMessage: {
      id: "msg6",
      conversationId: "conv2",
      senderId: "4",
      receiverId: "1",
      content: "I'll prepare a draft proposal for the tech review series and send it over tomorrow.",
      timestamp: new Date(2024, 3, 3, 14, 15),
      read: true
    },
    unreadCount: 0
  },
  {
    id: "conv3",
    participants: ["3", "7"],
    lastMessage: {
      id: "msg9",
      conversationId: "conv3",
      senderId: "3",
      receiverId: "7",
      content: "We love your cooking channel and would be interested in featuring our cookware in your upcoming videos.",
      timestamp: new Date(2024, 3, 2, 9, 45),
      read: true
    },
    unreadCount: 0
  }
];

export const mockMessages: Record<string, Message[]> = {
  "conv1": [
    {
      id: "msg1",
      conversationId: "conv1",
      senderId: "2",
      receiverId: "1",
      content: "Hello, I'm interested in your brand and would like to discuss potential sponsorship opportunities.",
      timestamp: new Date(2024, 3, 4, 9, 0),
      read: true
    },
    {
      id: "msg2",
      conversationId: "conv1",
      senderId: "1",
      receiverId: "2",
      content: "Hi there! Thanks for reaching out. We've been following your channel and are impressed with your content.",
      timestamp: new Date(2024, 3, 4, 9, 15),
      read: true
    },
    {
      id: "msg3",
      conversationId: "conv1",
      senderId: "1",
      receiverId: "2",
      content: "Great! I'd like to discuss the details of our potential collaboration.",
      timestamp: new Date(2024, 3, 4, 10, 30),
      read: false
    }
  ],
  "conv2": [
    {
      id: "msg4",
      conversationId: "conv2",
      senderId: "1",
      receiverId: "4",
      content: "Hello! We're launching a new product next month and would love to have you review it on your channel.",
      timestamp: new Date(2024, 3, 3, 13, 45),
      read: true
    },
    {
      id: "msg5",
      conversationId: "conv2",
      senderId: "4",
      receiverId: "1",
      content: "Hi! That sounds interesting. What kind of product is it? I'd be happy to discuss the details.",
      timestamp: new Date(2024, 3, 3, 14, 0),
      read: true
    },
    {
      id: "msg6",
      conversationId: "conv2",
      senderId: "4",
      receiverId: "1",
      content: "I'll prepare a draft proposal for the tech review series and send it over tomorrow.",
      timestamp: new Date(2024, 3, 3, 14, 15),
      read: true
    }
  ],
  "conv3": [
    {
      id: "msg7",
      conversationId: "conv3",
      senderId: "7",
      receiverId: "3",
      content: "I noticed your beauty products and think they would be a great fit for my audience.",
      timestamp: new Date(2024, 3, 2, 9, 0),
      read: true
    },
    {
      id: "msg8",
      conversationId: "conv3",
      senderId: "3",
      receiverId: "7",
      content: "Thank you for your interest! Your channel demographics align well with our target market.",
      timestamp: new Date(2024, 3, 2, 9, 30),
      read: true
    },
    {
      id: "msg9",
      conversationId: "conv3",
      senderId: "3",
      receiverId: "7",
      content: "We love your cooking channel and would be interested in featuring our cookware in your upcoming videos.",
      timestamp: new Date(2024, 3, 2, 9, 45),
      read: true
    }
  ]
};

// Mock sponsorships
export const mockSponsorships: Sponsorship[] = [
  {
    id: "spon1",
    sponsorId: "1",
    youtuberId: "2",
    title: "Gaming Peripherals Review Series",
    description: "A 3-part video series reviewing our latest gaming peripherals with hands-on demonstrations and performance testing.",
    budget: "$4,500",
    requirements: "Each video should be minimum 10 minutes with dedicated sections for each product feature. Include links to our store in description.",
    status: "active",
    createdAt: new Date(2024, 2, 15),
    updatedAt: new Date(2024, 3, 1)
  },
  {
    id: "spon2",
    sponsorId: "3",
    youtuberId: "4",
    title: "Tech-Beauty Integration Campaign",
    description: "Showcase how our smart beauty devices integrate with mobile apps for personalized skincare routines.",
    budget: "$6,000",
    requirements: "Demonstrate app features, before/after results, and highlight the technology behind the products.",
    status: "pending",
    createdAt: new Date(2024, 3, 3),
    updatedAt: new Date(2024, 3, 3)
  },
  {
    id: "spon3",
    sponsorId: "6",
    youtuberId: "7",
    title: "Healthy Cooking with Fitness Equipment Pro",
    description: "Integrate our kitchen fitness tools into your cooking segments to promote healthy meal prep combined with fitness.",
    budget: "$3,800",
    requirements: "Feature at least 2 of our products per video in a 5-video series. Include coupon code for viewers.",
    status: "completed",
    createdAt: new Date(2024, 1, 10),
    updatedAt: new Date(2024, 2, 25)
  },
  {
    id: "spon4",
    sponsorId: "1",
    youtuberId: "4",
    title: "Smart Home Tech Integration",
    description: "Showcase our new smart home devices in a comprehensive review and setup guide.",
    budget: "$5,200",
    requirements: "Include unboxing, setup process, integration with other systems, and daily usage examples.",
    status: "declined",
    createdAt: new Date(2024, 2, 5),
    updatedAt: new Date(2024, 2, 7)
  }
];

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

// Helper function to get YouTuber profile by user ID
export const getYouTuberProfileByUserId = (userId: string): YouTuberProfile | undefined => {
  return mockYouTuberProfiles.find(profile => profile.userId === userId);
};

// Helper function to get Sponsor profile by user ID
export const getSponsorProfileByUserId = (userId: string): SponsorProfile | undefined => {
  return mockSponsorProfiles.find(profile => profile.userId === userId);
};

// Helper function to get conversations for a user
export const getConversationsForUser = (userId: string): Conversation[] => {
  return mockConversations.filter(conv => conv.participants.includes(userId));
};

// Helper function to get messages for a conversation
export const getMessagesForConversation = (conversationId: string): Message[] => {
  return mockMessages[conversationId] || [];
};

// Helper function to get sponsorships by YouTuber ID
export const getSponsorshipsByYouTuberId = (youtuberId: string): Sponsorship[] => {
  return mockSponsorships.filter(sponsorship => sponsorship.youtuberId === youtuberId);
};

// Helper function to get sponsorships by Sponsor ID
export const getSponsorshipsBySponsorId = (sponsorId: string): Sponsorship[] => {
  return mockSponsorships.filter(sponsorship => sponsorship.sponsorId === sponsorId);
};

// Helper function to get all YouTubers
export const getAllYouTubers = (): User[] => {
  return mockUsers.filter(user => user.role === "youtuber");
};

// Helper function to get all Sponsors
export const getAllSponsors = (): User[] => {
  return mockUsers.filter(user => user.role === "sponsor");
};
