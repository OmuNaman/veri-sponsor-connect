import { UserProfile, UserRole } from "@/contexts/AuthContext";

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
