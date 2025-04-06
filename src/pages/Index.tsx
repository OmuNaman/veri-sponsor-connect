
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, MessageSquare, Search, Check, ArrowRight } from "lucide-react";
import VerifiedBadge from "@/components/VerifiedBadge";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="hero-gradient absolute inset-0 opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-verisponsor-blue to-verisponsor-purple bg-clip-text text-transparent">
              YouTube Sponsorships, Verified.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              VeriSponsor connects trusted YouTubers with verified sponsors for authentic, reliable partnerships.
              No more scams, just genuine collaborations.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" onClick={handleGetStarted} className="flex items-center gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/discover")}>
                Explore Platform
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <div className="flex items-center text-sm text-gray-500">
                <VerifiedBadge size="sm" withTooltip={false} />
                <span className="ml-1">Verified Profiles</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Check className="h-4 w-4 text-verisponsor-green" />
                <span className="ml-1">Secure Payments</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Check className="h-4 w-4 text-verisponsor-green" />
                <span className="ml-1">Direct Communication</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How VeriSponsor Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform streamlines the sponsorship process from discovery to completion,
              ensuring trust and efficiency every step of the way.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center text-center">
              <div className="bg-blue-50 p-3 rounded-full mb-6">
                <Shield className="h-8 w-8 text-verisponsor-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Verified Profiles</h3>
              <p className="text-gray-600">
                We verify both sponsors and YouTubers to ensure authenticity and prevent scams,
                creating a trusted ecosystem for partnerships.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center text-center">
              <div className="bg-purple-50 p-3 rounded-full mb-6">
                <MessageSquare className="h-8 w-8 text-verisponsor-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Direct Chat</h3>
              <p className="text-gray-600">
                Streamlined communication allows for efficient negotiation and clear expectations
                between sponsors and creators.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 flex flex-col items-center text-center">
              <div className="bg-green-50 p-3 rounded-full mb-6">
                <Search className="h-8 w-8 text-verisponsor-green" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Targeted Matching</h3>
              <p className="text-gray-600">
                Our intelligent matching system helps sponsors discover relevant creators that
                align with their brand values and target audience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Trusted by Creators & Brands</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Hear from our community of verified YouTubers and sponsors who have found success on VeriSponsor.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <img src="https://i.pravatar.cc/150?img=23" alt="YouTuber" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold flex items-center">
                    Sarah J. 
                    <VerifiedBadge size="sm" className="ml-2" />
                  </h4>
                  <p className="text-sm text-gray-500">Tech Reviewer, 1.2M subscribers</p>
                </div>
              </div>
              <p className="text-gray-600">
                "VeriSponsor transformed how I approach brand deals. The verification process gives me confidence
                that I'm working with legitimate companies, and I've secured partnerships that truly align with my content."
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-8 border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden mr-4">
                  <img src="https://i.pravatar.cc/150?img=32" alt="Sponsor" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h4 className="font-semibold flex items-center">
                    Mark T.
                    <VerifiedBadge size="sm" className="ml-2" />
                  </h4>
                  <p className="text-sm text-gray-500">Marketing Director, Global Tech Brand</p>
                </div>
              </div>
              <p className="text-gray-600">
                "Finding the right creators for our campaigns used to be time-consuming and risky. VeriSponsor's
                targeted matching and verification has streamlined our process and improved our ROI significantly."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-verisponsor-blue py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Sponsorships?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Join our community of verified YouTubers and sponsors and take your collaborations to the next level.
          </p>
          <Button 
            size="lg" 
            onClick={handleGetStarted}
            variant="secondary"
            className="bg-white text-verisponsor-blue hover:bg-gray-100 transition-colors"
          >
            Get Started Now
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
