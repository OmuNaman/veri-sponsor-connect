
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Link as LinkIcon, ChevronRight, Shield, CheckCircle2 } from "lucide-react";
import VerifiedBadge from "@/components/VerifiedBadge";
import { 
  getUserById, 
  getYouTuberProfileByUserId, 
  getSponsorProfileByUserId 
} from "@/services/mockData";

// YouTuber Profile Form Schema
const youtuberProfileSchema = z.object({
  channelName: z.string().min(2, { message: "Channel name is required" }),
  channelUrl: z.string().url({ message: "Please enter a valid URL" }),
  description: z.string().min(20, { message: "Description should be at least 20 characters" }),
  categories: z.string().min(1, { message: "Please enter at least one category" }),
  location: z.string().min(2, { message: "Location is required" }),
  subscribers: z.string().min(1, { message: "Number of subscribers is required" }),
  averageViews: z.string().min(1, { message: "Average views is required" }),
  priceRange: z.string().min(1, { message: "Price range is required" }),
});

// Sponsor Profile Form Schema
const sponsorProfileSchema = z.object({
  companyName: z.string().min(2, { message: "Company name is required" }),
  website: z.string().url({ message: "Please enter a valid URL" }),
  description: z.string().min(20, { message: "Description should be at least 20 characters" }),
  industry: z.string().min(1, { message: "Please enter at least one industry" }),
  location: z.string().min(2, { message: "Location is required" }),
  budget: z.string().min(1, { message: "Budget range is required" }),
  targetAudience: z.string().min(1, { message: "Target audience is required" }),
});

const Profile = () => {
  const { user } = useAuth();
  const { id } = useParams(); // Get ID from URL if viewing someone else's profile
  const [viewMode, setViewMode] = useState(!!id); // If ID is in URL, we're in view mode
  const [profileData, setProfileData] = useState(null);
  const [profileUser, setProfileUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState("unverified");

  const youtuberForm = useForm({
    resolver: zodResolver(youtuberProfileSchema),
    defaultValues: {
      channelName: "",
      channelUrl: "",
      description: "",
      categories: "",
      location: "",
      subscribers: "",
      averageViews: "",
      priceRange: "",
    },
  });

  const sponsorForm = useForm({
    resolver: zodResolver(sponsorProfileSchema),
    defaultValues: {
      companyName: "",
      website: "",
      description: "",
      industry: "",
      location: "",
      budget: "",
      targetAudience: "",
    },
  });

  // Load profile data
  useEffect(() => {
    const targetUserId = id || (user ? user.id : null);
    if (targetUserId) {
      // If viewing someone else's profile, fetch their user data
      const profileOwner = id ? getUserById(id) : user;
      setProfileUser(profileOwner);

      // Get the appropriate profile data based on user role
      if (profileOwner.role === "youtuber") {
        const youtuberProfile = getYouTuberProfileByUserId(targetUserId);
        setProfileData(youtuberProfile);
        
        // If we have data and are not in view mode, pre-fill the form
        if (youtuberProfile && !viewMode) {
          youtuberForm.reset({
            channelName: youtuberProfile.channelName,
            channelUrl: youtuberProfile.channelUrl,
            description: youtuberProfile.description,
            categories: youtuberProfile.categories.join(", "),
            location: youtuberProfile.location,
            subscribers: youtuberProfile.stats.subscribers.toString(),
            averageViews: youtuberProfile.stats.averageViews.toString(),
            priceRange: youtuberProfile.priceRange,
          });
        }
      } else if (profileOwner.role === "sponsor") {
        const sponsorProfile = getSponsorProfileByUserId(targetUserId);
        setProfileData(sponsorProfile);
        
        // If we have data and are not in view mode, pre-fill the form
        if (sponsorProfile && !viewMode) {
          sponsorForm.reset({
            companyName: sponsorProfile.companyName,
            website: sponsorProfile.website,
            description: sponsorProfile.description,
            industry: sponsorProfile.industry.join(", "),
            location: sponsorProfile.location,
            budget: sponsorProfile.budget,
            targetAudience: sponsorProfile.targetAudience.join(", "),
          });
        }
      }

      // Check verification status
      setVerificationStatus(profileOwner.isVerified ? "verified" : profileData ? "pending" : "unverified");
    }
  }, [id, user, viewMode]);

  const onYoutuberSubmit = (data) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile updated successfully",
        description: "Your profile has been submitted for verification.",
      });
      setIsLoading(false);
      
      // Update verification status to pending
      setVerificationStatus("pending");
    }, 1500);
  };

  const onSponsorSubmit = (data) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Profile updated successfully",
        description: "Your profile has been submitted for verification.",
      });
      setIsLoading(false);
      
      // Update verification status to pending
      setVerificationStatus("pending");
    }, 1500);
  };

  // Display loading state while fetching data
  if (!profileUser) {
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
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-verisponsor-blue to-verisponsor-purple h-32"></div>
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end -mt-16 sm:-mt-12 mb-6">
              <Avatar className="h-24 w-24 sm:h-32 sm:w-32 border-4 border-white shadow-md">
                <AvatarImage src={profileUser.avatar} alt={profileUser.name} />
                <AvatarFallback>{profileUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-bold flex items-center">
                      {profileUser.name}
                      {profileUser.isVerified && <VerifiedBadge className="ml-2" />}
                    </h1>
                    <p className="text-gray-500">
                      {profileUser.role === "youtuber" ? "YouTube Creator" : "Brand Sponsor"}
                    </p>
                  </div>
                  {!viewMode ? (
                    <div className="mt-4 sm:mt-0">
                      <VerificationBadge status={verificationStatus} />
                    </div>
                  ) : (
                    <div className="mt-4 sm:mt-0 flex space-x-3">
                      <Button className="flex items-center">
                        <MessageSquare className="mr-2 h-4 w-4" />
                        Message
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar with stats */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Info</CardTitle>
                {viewMode && profileData && (
                  <CardDescription>
                    {profileUser.role === "youtuber" ? "Channel statistics" : "Company information"}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {profileData ? (
                  <>
                    {profileUser.role === "youtuber" ? (
                      // YouTuber Stats
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Channel Name</h3>
                          <p>{profileData.channelName}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Channel Link</h3>
                          <a 
                            href={profileData.channelUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-verisponsor-blue flex items-center hover:underline"
                          >
                            <LinkIcon className="h-3 w-3 mr-1" />
                            YouTube Channel
                          </a>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Subscribers</h3>
                          <p className="text-lg font-semibold">
                            {profileData.stats.subscribers.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Average Views</h3>
                          <p className="text-lg font-semibold">
                            {profileData.stats.averageViews.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Total Videos</h3>
                          <p>{profileData.stats.totalVideos}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Engagement Rate</h3>
                          <p>{profileData.stats.engagementRate}%</p>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Location</h3>
                          <p>{profileData.location}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Price Range</h3>
                          <p>{profileData.priceRange}</p>
                        </div>
                      </div>
                    ) : (
                      // Sponsor Stats
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Company Name</h3>
                          <p>{profileData.companyName}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Website</h3>
                          <a 
                            href={profileData.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-verisponsor-blue flex items-center hover:underline"
                          >
                            <LinkIcon className="h-3 w-3 mr-1" />
                            Company Website
                          </a>
                        </div>
                        <Separator />
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Location</h3>
                          <p>{profileData.location}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Budget Range</h3>
                          <p>{profileData.budget}</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : !viewMode ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500 mb-2">Complete your profile to get verified</p>
                    <ChevronRight className="h-6 w-6 text-gray-400 mx-auto animate-pulse-slow" />
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Profile information not available</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {profileData && (
              <Card>
                <CardHeader>
                  <CardTitle>
                    {profileUser.role === "youtuber" ? "Content Categories" : "Industries"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profileUser.role === "youtuber" && profileData.categories.map((category, idx) => (
                      <Badge key={idx} variant="secondary">{category}</Badge>
                    ))}
                    {profileUser.role === "sponsor" && profileData.industry.map((industry, idx) => (
                      <Badge key={idx} variant="secondary">{industry}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main content area */}
          <div className="lg:col-span-2">
            {viewMode ? (
              // View mode
              <Card>
                <CardHeader>
                  <CardTitle>About</CardTitle>
                </CardHeader>
                <CardContent>
                  {profileData ? (
                    <div className="space-y-6">
                      <p className="text-gray-700">{profileData.description}</p>
                      
                      {profileUser.role === "youtuber" && (
                        <>
                          <div>
                            <h3 className="text-lg font-medium mb-2">Previous Brand Collaborations</h3>
                            <div className="flex flex-wrap gap-2">
                              {profileData.pastBrands.map((brand, idx) => (
                                <Badge key={idx}>{brand}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-2">Content Samples</h3>
                            <ul className="space-y-2">
                              {profileData.contentSamples.map((sample, idx) => (
                                <li key={idx}>
                                  <a 
                                    href={sample} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-verisponsor-blue flex items-center hover:underline"
                                  >
                                    <LinkIcon className="h-3 w-3 mr-1" />
                                    Video Sample {idx + 1}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                      
                      {profileUser.role === "sponsor" && (
                        <>
                          <div>
                            <h3 className="text-lg font-medium mb-2">Target Audience</h3>
                            <div className="flex flex-wrap gap-2">
                              {profileData.targetAudience.map((audience, idx) => (
                                <Badge key={idx}>{audience}</Badge>
                              ))}
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-lg font-medium mb-2">Past Campaigns</h3>
                            <ul className="space-y-2">
                              {profileData.pastCampaigns.map((campaign, idx) => (
                                <li key={idx} className="flex items-center">
                                  <CheckCircle2 className="h-4 w-4 text-green-500 mr-2" />
                                  {campaign}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <p className="text-gray-500">No profile information available</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              // Edit mode
              <Card>
                <CardHeader>
                  <CardTitle>Complete Your Profile</CardTitle>
                  <CardDescription>
                    Provide all the necessary information to get verified on VeriSponsor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {user.role === "youtuber" ? (
                    // YouTuber Profile Form
                    <Form {...youtuberForm}>
                      <form onSubmit={youtuberForm.handleSubmit(onYoutuberSubmit)} className="space-y-6">
                        <FormField
                          control={youtuberForm.control}
                          name="channelName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Channel Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your YouTube channel name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={youtuberForm.control}
                          name="channelUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Channel URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://youtube.com/yourchannel" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={youtuberForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Channel Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe your channel, content, and audience" 
                                  className="min-h-[100px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={youtuberForm.control}
                            name="categories"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Content Categories</FormLabel>
                                <FormControl>
                                  <Input placeholder="Gaming, Technology, etc." {...field} />
                                </FormControl>
                                <FormDescription>Separate categories with commas</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={youtuberForm.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input placeholder="City, Country" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={youtuberForm.control}
                            name="subscribers"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Subscribers</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g., 100000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={youtuberForm.control}
                            name="averageViews"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Average Views per Video</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g., 20000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={youtuberForm.control}
                          name="priceRange"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sponsorship Price Range</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., $1,000 - $3,000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? "Submitting..." : "Submit for Verification"}
                        </Button>
                      </form>
                    </Form>
                  ) : (
                    // Sponsor Profile Form
                    <Form {...sponsorForm}>
                      <form onSubmit={sponsorForm.handleSubmit(onSponsorSubmit)} className="space-y-6">
                        <FormField
                          control={sponsorForm.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your company name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={sponsorForm.control}
                          name="website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Website</FormLabel>
                              <FormControl>
                                <Input placeholder="https://yourcompany.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={sponsorForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Company Description</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Describe your company, products, and values" 
                                  className="min-h-[100px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={sponsorForm.control}
                            name="industry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Industry</FormLabel>
                                <FormControl>
                                  <Input placeholder="Technology, Beauty, etc." {...field} />
                                </FormControl>
                                <FormDescription>Separate industries with commas</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={sponsorForm.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input placeholder="City, Country" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <FormField
                          control={sponsorForm.control}
                          name="budget"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sponsorship Budget Range</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., $5,000 - $20,000 per campaign" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={sponsorForm.control}
                          name="targetAudience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Target Audience</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Tech enthusiasts, 18-34 age group" {...field} />
                              </FormControl>
                              <FormDescription>Separate audience segments with commas</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <Button type="submit" className="w-full" disabled={isLoading}>
                          {isLoading ? "Submitting..." : "Submit for Verification"}
                        </Button>
                      </form>
                    </Form>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Helper component for verification status
const VerificationBadge = ({ status }) => {
  const variants = {
    unverified: {
      color: "bg-gray-100 text-gray-800 border-gray-200",
      icon: <Shield className="h-4 w-4 mr-2" />,
      text: "Unverified - Complete Your Profile",
    },
    pending: {
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      icon: <Shield className="h-4 w-4 mr-2" />,
      text: "Verification Pending",
    },
    verified: {
      color: "bg-green-100 text-green-800 border-green-200",
      icon: <Shield className="h-4 w-4 mr-2" />,
      text: "Verified Account",
    }
  };

  const { color, icon, text } = variants[status] || variants.unverified;

  return (
    <Badge variant="outline" className={`${color} flex items-center px-3 py-1 text-xs`}>
      {icon}
      {text}
    </Badge>
  );
};

export default Profile;
