
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ArrowUpRight, ArrowRight, MessageSquare, AlertCircle, CheckCircle2, Clock } from "lucide-react";
import VerifiedBadge from "@/components/VerifiedBadge";
import { 
  getSponsorshipsByYouTuberId, 
  getSponsorshipsBySponsorId,
  getConversationsForUser,
  getUserById,
  mockConversations
} from "@/services/mockData";

// Sample data for charts
const viewsData = [
  { name: "Jan", views: 65000 },
  { name: "Feb", views: 59000 },
  { name: "Mar", views: 80000 },
  { name: "Apr", views: 81000 },
  { name: "May", views: 95000 },
  { name: "Jun", views: 110000 },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [sponsorships, setSponsorships] = useState([]);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    if (user) {
      // Get sponsorships based on user role
      let userSponsorships;
      if (user.role === "youtuber") {
        userSponsorships = getSponsorshipsByYouTuberId(user.id);
      } else {
        userSponsorships = getSponsorshipsBySponsorId(user.id);
      }
      setSponsorships(userSponsorships);
      
      // Get conversations
      const userConversations = getConversationsForUser(user.id);
      setConversations(userConversations);
    }
  }, [user]);

  // Return loading state if user data is not available
  if (!user) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-verisponsor-blue"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center">
              Welcome, {user.name}
              {user.isVerified && <VerifiedBadge className="ml-2" />}
            </h1>
            <p className="text-gray-500 mt-1">
              {user.role === "youtuber" ? "Creator Dashboard" : "Brand Dashboard"}
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <Button asChild variant="outline" className="flex items-center">
              <Link to="/messages">
                <MessageSquare className="mr-2 h-4 w-4" /> Messages
              </Link>
            </Button>
            <Button asChild className="flex items-center">
              <Link to="/discover">
                <ArrowRight className="mr-2 h-4 w-4" /> 
                {user.role === "youtuber" ? "Find Sponsors" : "Find Creators"}
              </Link>
            </Button>
          </div>
        </div>

        {!user.isVerified && (
          <Card className="mb-6 border-orange-200 bg-orange-50">
            <CardContent className="p-4 flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-start md:items-center">
                <AlertCircle className="h-5 w-5 text-orange-500 mr-2 flex-shrink-0 mt-0.5 md:mt-0" />
                <div>
                  <p className="font-medium text-orange-800">Your profile is not verified</p>
                  <p className="text-sm text-orange-700 mt-1">Complete your profile to get verified and start connecting.</p>
                </div>
              </div>
              <Button asChild className="mt-4 md:mt-0 bg-orange-500 hover:bg-orange-600">
                <Link to="/profile">Complete Profile</Link>
              </Button>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Active Sponsorships</CardTitle>
              <CardDescription>Current active partnerships</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {sponsorships.filter(s => s.status === "active").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pending Requests</CardTitle>
              <CardDescription>Awaiting approval or review</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {sponsorships.filter(s => s.status === "pending").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Unread Messages</CardTitle>
              <CardDescription>Messages requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {conversations.reduce((total, conv) => total + conv.unreadCount, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sponsorships" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="sponsorships">Sponsorships</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="messages">Recent Messages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="sponsorships">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sponsorships.length > 0 ? (
                sponsorships.map((sponsorship) => {
                  const otherPartyId = user.role === "youtuber" ? sponsorship.sponsorId : sponsorship.youtuberId;
                  const otherParty = getUserById(otherPartyId);
                  
                  return (
                    <Card key={sponsorship.id} className="overflow-hidden">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle>{sponsorship.title}</CardTitle>
                            <CardDescription className="mt-1">
                              {user.role === "youtuber" ? "Sponsor" : "Creator"}: {otherParty?.name}
                            </CardDescription>
                          </div>
                          <StatusBadge status={sponsorship.status} />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">{sponsorship.description}</p>
                        <div className="text-sm">
                          <div className="flex justify-between py-2 border-b">
                            <span className="font-medium">Budget:</span>
                            <span>{sponsorship.budget}</span>
                          </div>
                          <div className="flex justify-between py-2">
                            <span className="font-medium">Created:</span>
                            <span>{formatDate(sponsorship.createdAt)}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="bg-gray-50 border-t flex justify-between">
                        <Button variant="ghost" asChild>
                          <Link to={`/messages`}>
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Message
                          </Link>
                        </Button>
                        <Button variant="outline">View Details</Button>
                      </CardFooter>
                    </Card>
                  );
                })
              ) : (
                <div className="col-span-full flex flex-col items-center py-16 bg-gray-50 rounded-lg">
                  <p className="text-lg text-gray-500 mb-4">No sponsorships found</p>
                  <Button asChild>
                    <Link to="/discover">
                      {user.role === "youtuber" ? "Find Sponsors" : "Find Creators"}
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>View your sponsorship performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={viewsData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="views" fill="#8b5cf6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Total Views</p>
                    <p className="text-2xl font-bold">490,000</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> 12.5%
                    </p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Engagement Rate</p>
                    <p className="text-2xl font-bold">8.7%</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> 2.3%
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Conversion Rate</p>
                    <p className="text-2xl font-bold">3.2%</p>
                    <p className="text-sm text-green-600 flex items-center mt-1">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> 0.5%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="messages">
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
                <CardDescription>Latest communications with partners</CardDescription>
              </CardHeader>
              <CardContent>
                {conversations.length > 0 ? (
                  <div className="space-y-4">
                    {conversations.map((conversation) => {
                      const otherPartyId = conversation.participants.find(id => id !== user.id);
                      const otherParty = getUserById(otherPartyId);
                      
                      return (
                        <div key={conversation.id} className="flex items-start p-4 rounded-lg border hover:bg-gray-50 transition-colors">
                          <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden mr-4">
                            <img src={otherParty?.avatar} alt={otherParty?.name} className="h-full w-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between">
                              <h4 className="font-medium truncate">
                                {otherParty?.name}
                                {otherParty?.isVerified && <VerifiedBadge size="sm" className="ml-1" />}
                              </h4>
                              <span className="text-xs text-gray-500">
                                {formatMessageTime(conversation.lastMessage.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600 truncate mt-1">{conversation.lastMessage.content}</p>
                          </div>
                          {conversation.unreadCount > 0 && (
                            <span className="bg-verisponsor-blue text-white text-xs font-medium rounded-full h-5 min-w-5 flex items-center justify-center ml-2">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      );
                    })}
                    <div className="text-center pt-4">
                      <Button asChild variant="outline">
                        <Link to="/messages">View All Messages</Link>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 mb-4">No messages yet</p>
                    <Button asChild>
                      <Link to="/discover">Start a Conversation</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Helper components
const StatusBadge = ({ status }) => {
  const variants = {
    active: {
      color: "bg-green-100 text-green-800 border-green-200",
      icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
    },
    pending: {
      color: "bg-amber-100 text-amber-800 border-amber-200",
      icon: <Clock className="h-3 w-3 mr-1" />,
    },
    completed: {
      color: "bg-blue-100 text-blue-800 border-blue-200",
      icon: <CheckCircle2 className="h-3 w-3 mr-1" />,
    },
    declined: {
      color: "bg-red-100 text-red-800 border-red-200",
      icon: <AlertCircle className="h-3 w-3 mr-1" />,
    }
  };

  const { color, icon } = variants[status] || variants.pending;

  return (
    <Badge variant="outline" className={`${color} flex items-center`}>
      {icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

// Helper functions
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const formatMessageTime = (date) => {
  const now = new Date();
  const messageDate = new Date(date);
  const diffDays = Math.floor((now - messageDate) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return messageDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return messageDate.toLocaleDateString('en-US', { weekday: 'short' });
  } else {
    return messageDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

export default Dashboard;
