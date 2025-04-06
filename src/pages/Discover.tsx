
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { useAuth, YouTuberProfile, SponsorProfile } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, MessageSquare, Users, Star } from "lucide-react";
import VerifiedBadge from "@/components/VerifiedBadge";

// Helper function to format large numbers
const formatNumber = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num;
  }
};

const Discover = () => {
  const { user, getAllYouTubers, getAllSponsors, getYouTuberProfileByUserId, getSponsorProfileByUserId } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [subscriberRange, setSubscriberRange] = useState([0, 2000000]);
  const [sort, setSort] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch profiles based on user role
  useEffect(() => {
    const fetchProfiles = async () => {
      if (!user) return;
      
      setLoading(true);
      try {
        const fetchedProfiles = user.role === "sponsor" 
          ? await getAllYouTubers() 
          : await getAllSponsors();
        setProfiles(fetchedProfiles);
      } catch (error) {
        console.error("Error fetching profiles:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfiles();
  }, [user, getAllYouTubers, getAllSponsors]);

  // Apply filters and search
  const filteredProfiles = profiles.filter(profile => {
    // Simple search in name
    if (searchQuery && !profile.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // For now, we'll skip additional filtering since we don't have the extended profile data yet
    // In a real implementation, we would fetch the extended profiles and filter based on them
    
    return true;
  });
  
  // Sort profiles based on selection
  const sortedProfiles = [...filteredProfiles].sort((a, b) => {
    if (sort === "verified") {
      // Sort by verification status
      return (b.isVerified ? 1 : 0) - (a.isVerified ? 1 : 0);
    }
    // Add more sorting options as needed
    return 0;
  });

  // Categories for filtering
  const categories = user?.role === "sponsor" 
    ? ["Gaming", "Technology", "Beauty", "Cooking", "Travel", "Fitness", "Fashion", "Education"] 
    : ["Technology", "Beauty", "Fashion", "Fitness", "Food", "Travel", "Gaming"];

  return (
    <Layout>
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Discover {user?.role === "sponsor" ? "YouTubers" : "Sponsors"}
            </h1>
            <p className="text-gray-500 mt-1">
              Find and connect with verified {user?.role === "sponsor" ? "creators" : "brands"}
            </p>
          </div>
        </div>

        {/* Search and filter section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder={`Search ${user?.role === "sponsor" ? "YouTubers" : "Sponsors"}...`}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="verified">Verified First</SelectItem>
                {user?.role === "sponsor" && (
                  <>
                    <SelectItem value="subscribers">Subscribers</SelectItem>
                    <SelectItem value="engagement">Engagement</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Advanced filters */}
          {showFilters && (
            <div className="mt-4 p-4 border rounded-md bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {user?.role === "sponsor" ? "Content Category" : "Industry"}
                  </label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {user?.role === "sponsor" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subscriber Range
                    </label>
                    <div className="pt-6 px-2">
                      <Slider
                        defaultValue={[0, 2000000]}
                        max={2000000}
                        step={10000}
                        value={subscriberRange}
                        onValueChange={setSubscriberRange}
                      />
                      <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>{formatNumber(subscriberRange[0])}</span>
                        <span>{formatNumber(subscriberRange[1])}</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="md:text-right self-end">
                  <Button 
                    variant="outline" 
                    className="mr-2"
                    onClick={() => {
                      setSearchQuery("");
                      setCategory("all");
                      setSubscriberRange([0, 2000000]);
                      setSort("relevance");
                    }}
                  >
                    Reset
                  </Button>
                  <Button onClick={() => setShowFilters(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results count */}
        <div className="mb-6 flex items-center text-gray-500">
          <Users className="mr-2 h-4 w-4" />
          <span>{sortedProfiles.length} results found</span>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-verisponsor-blue"></div>
          </div>
        )}

        {/* Results grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProfiles.map((profile) => {
              return (
                <Card key={profile.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div className="flex items-start space-x-4">
                        <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden">
                          <img src={profile.avatar} alt={profile.name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                          <CardTitle className="text-lg flex items-center">
                            {profile.name}
                            {profile.isVerified && <VerifiedBadge size="sm" className="ml-1" />}
                          </CardTitle>
                          <CardDescription>
                            {user?.role === "sponsor" ? "YouTube Creator" : "Brand Sponsor"}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-gray-500 mb-4">
                      Profile information will be available once extended profile data is implemented
                    </div>
                  </CardContent>
                  <CardFooter className="bg-gray-50 border-t flex justify-between">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-500">
                            <Star className="h-4 w-4 mr-1" />
                            Save
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Save to favorites</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    <Button className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}

            {sortedProfiles.length === 0 && !loading && (
              <div className="col-span-full py-16 text-center">
                <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No results found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setCategory("all");
                    setSubscriberRange([0, 2000000]);
                    setSort("relevance");
                    setShowFilters(false);
                  }}
                >
                  Reset all filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Discover;
