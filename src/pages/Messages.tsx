
import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Send, Search } from "lucide-react";
import VerifiedBadge from "@/components/VerifiedBadge";
import { 
  getConversationsForUser,
  getMessagesForConversation,
  getUserById
} from "@/services/mockData";

const Messages = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef(null);

  // Load conversations
  useEffect(() => {
    if (user) {
      const userConversations = getConversationsForUser(user.id);
      setConversations(userConversations);
      
      // Set active conversation to first one if available
      if (userConversations.length > 0 && !activeConversation) {
        setActiveConversation(userConversations[0]);
      }
    }
  }, [user]);
  
  // Load messages when active conversation changes
  useEffect(() => {
    if (activeConversation) {
      const conversationMessages = getMessagesForConversation(activeConversation.id);
      setMessages(conversationMessages);
    }
  }, [activeConversation]);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !activeConversation) return;
    
    // Create a new message
    const newMsg = {
      id: `new-${Date.now()}`,
      conversationId: activeConversation.id,
      senderId: user.id,
      receiverId: activeConversation.participants.find(id => id !== user.id),
      content: newMessage,
      timestamp: new Date(),
      read: true
    };
    
    // Update the messages list
    setMessages([...messages, newMsg]);
    
    // Update the active conversation's last message
    const updatedConversation = {
      ...activeConversation,
      lastMessage: newMsg,
      unreadCount: 0
    };
    
    setActiveConversation(updatedConversation);
    
    // Update the conversations list
    const updatedConversations = conversations.map(conv => 
      conv.id === activeConversation.id ? updatedConversation : conv
    );
    
    setConversations(updatedConversations);
    
    // Clear the input
    setNewMessage("");
  };

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery) return true;
    
    const otherPartyId = conv.participants.find(id => id !== user.id);
    const otherParty = getUserById(otherPartyId);
    
    return otherParty.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <Layout>
      <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Messages</h1>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
          <div className="flex h-[calc(80vh-120px)]">
            {/* Sidebar */}
            <div className="w-full max-w-xs border-r flex flex-col">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search conversations"
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <Tabs defaultValue="all" className="px-4 pt-4">
                <TabsList className="grid grid-cols-2">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                </TabsList>
              </Tabs>
              
              <div className="flex-1 overflow-y-auto py-2">
                {filteredConversations.length > 0 ? (
                  filteredConversations.map(conversation => {
                    const otherPartyId = conversation.participants.find(id => id !== user.id);
                    const otherParty = getUserById(otherPartyId);
                    
                    return (
                      <div 
                        key={conversation.id}
                        className={`px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${
                          activeConversation?.id === conversation.id ? 'bg-gray-50' : ''
                        }`}
                        onClick={() => setActiveConversation(conversation)}
                      >
                        <div className="flex items-start">
                          <div className="relative">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={otherParty?.avatar} alt={otherParty?.name} />
                              <AvatarFallback>{otherParty?.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {otherParty?.isVerified && (
                              <span className="absolute -bottom-1 -right-1 block h-4 w-4">
                                <VerifiedBadge size="sm" withTooltip={false} />
                              </span>
                            )}
                          </div>
                          <div className="ml-3 flex-1 min-w-0">
                            <div className="flex justify-between items-baseline">
                              <h3 className="text-sm font-medium">{otherParty?.name}</h3>
                              <span className="text-xs text-gray-500">
                                {formatMessageTime(conversation.lastMessage.timestamp)}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500 truncate">
                              {conversation.lastMessage.content}
                            </p>
                          </div>
                          {conversation.unreadCount > 0 && (
                            <span className="bg-verisponsor-blue text-white text-xs font-medium rounded-full h-5 min-w-5 flex items-center justify-center ml-2">
                              {conversation.unreadCount}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500 text-sm">No conversations found</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Main content */}
            <div className="flex-1 flex flex-col">
              {activeConversation ? (
                <>
                  {/* Conversation header */}
                  <div className="p-4 border-b flex items-center">
                    <div className="flex items-center">
                      {(() => {
                        const otherPartyId = activeConversation.participants.find(id => id !== user.id);
                        const otherParty = getUserById(otherPartyId);
                        
                        return (
                          <>
                            <div className="relative">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={otherParty?.avatar} alt={otherParty?.name} />
                                <AvatarFallback>{otherParty?.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              {otherParty?.isVerified && (
                                <span className="absolute -bottom-1 -right-1 block h-4 w-4">
                                  <VerifiedBadge size="sm" withTooltip={false} />
                                </span>
                              )}
                            </div>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium flex items-center">
                                {otherParty?.name}
                              </h3>
                              <p className="text-xs text-gray-500">
                                {otherParty?.role === "youtuber" ? "YouTube Creator" : "Brand Sponsor"}
                              </p>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    <div className="space-y-4">
                      {messages.map((message) => {
                        const isUser = message.senderId === user.id;
                        const sender = getUserById(message.senderId);
                        
                        return (
                          <div 
                            key={message.id} 
                            className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className="flex items-end">
                              {!isUser && (
                                <Avatar className="h-8 w-8 mr-2">
                                  <AvatarImage src={sender?.avatar} alt={sender?.name} />
                                  <AvatarFallback>{sender?.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                              )}
                              <div 
                                className={`max-w-md rounded-lg px-4 py-2 ${
                                  isUser 
                                    ? 'bg-verisponsor-blue text-white rounded-br-none' 
                                    : 'bg-white border rounded-bl-none'
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <p 
                                  className={`text-xs mt-1 ${
                                    isUser ? 'text-blue-100' : 'text-gray-500'
                                  }`}
                                >
                                  {formatTime(message.timestamp)}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                  
                  {/* Message input */}
                  <div className="p-4 border-t">
                    <form onSubmit={handleSendMessage} className="flex items-center">
                      <Input
                        placeholder="Type a message..."
                        className="flex-1"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <Button type="submit" className="ml-2" size="icon">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8">
                  <div className="bg-gray-100 p-8 rounded-full mb-4">
                    <MessageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Your Messages</h3>
                  <p className="text-gray-500 text-center max-w-md mb-6">
                    {conversations.length > 0 
                      ? "Select a conversation to start messaging" 
                      : "You don't have any messages yet. Start a conversation with a sponsor or creator."
                    }
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Helper components
const MessageIcon = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24" 
    strokeWidth={1.5} 
    stroke="currentColor" 
    className={className}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" 
    />
  </svg>
);

// Helper functions
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

const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export default Messages;
