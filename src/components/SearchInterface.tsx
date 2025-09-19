import React, { useState } from 'react';
import { Search, Calendar, FileText, Users, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import heroImage from '@/assets/kochi-metro-hero.jpg';

const SearchInterface = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate search delay
    setTimeout(() => setIsSearching(false), 2000);
  };

  const sampleQueries = [
    "ഈ തീയതി മുതൽ ആവശ്യമായ ഡോക്യുമെന്റുകൾ എനിക്ക് കൊണ്ടുവരൂ",
    "മീറ്റിംഗിന്റെ സംഗ്രഹം നൽകൂ",
    "എല്ലാ റഫറൻസുകളും ഡോക്യുമെന്റുകളും അയയ്ക്കൂ",
    "സാങ്കേതിക സ്പെസിഫിക്കേഷനുകൾ കണ്ടെത്തൂ"
  ];

  return (
    <div className="min-h-screen gradient-hero">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <FileText className="h-4 w-4 text-white" />
                </div>
                <h1 className="text-xl font-bold text-foreground">
                  കൊച്ചി മെട്രോ ഡോക്യുമെന്റ് സെർച്ച്
                </h1>
              </div>
            </div>
            
            {/* User Profile */}
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">Rajesh Kumar</p>
                <p className="text-xs text-muted-foreground">Mechanical Engineer</p>
              </div>
              <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="gradient-primary text-white font-medium">RK</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="relative container mx-auto px-6 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              <span>AI-Powered Document Search</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Find Metro Documents
              <span className="block text-primary">Instantly</span>
            </h2>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Search through Malayalam documents, meeting minutes, technical specs, and official records with AI assistance
            </p>

            {/* Search Box */}
            <div className="relative max-w-2xl mx-auto mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Ask me anything about Kochi Metro documents..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg bg-card/50 backdrop-blur-sm border-white/20 rounded-2xl shadow-card focus:shadow-glow transition-all duration-300"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button
                  onClick={handleSearch}
                  disabled={isSearching || !query.trim()}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-xl px-6 gradient-primary hover:shadow-glow transition-all duration-300"
                >
                  {isSearching ? (
                    <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    'Search'
                  )}
                </Button>
              </div>
            </div>

            {/* Sample Queries */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {sampleQueries.map((queryText, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  size="sm"
                  onClick={() => setQuery(queryText)}
                  className="rounded-full bg-card/30 backdrop-blur-sm border-white/10 hover:bg-card/50 transition-all duration-300"
                >
                  {queryText}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Quick Actions</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 gradient-surface border-white/10 shadow-card hover:shadow-glow transition-all duration-300 group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Date Range Search</h4>
                  <p className="text-sm text-muted-foreground">Filter documents by date</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Search for documents within specific time periods
              </p>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                തീയതി അനുസരിച്ച് തിരയുക
              </Badge>
            </Card>

            <Card className="p-6 gradient-surface border-white/10 shadow-card hover:shadow-glow transition-all duration-300 group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Meeting Summaries</h4>
                  <p className="text-sm text-muted-foreground">AI-generated summaries</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Get concise summaries of meeting minutes and discussions
              </p>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                മീറ്റിംഗ് സംഗ്രഹം
              </Badge>
            </Card>

            <Card className="p-6 gradient-surface border-white/10 shadow-card hover:shadow-glow transition-all duration-300 group">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Download className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Document Export</h4>
                  <p className="text-sm text-muted-foreground">Download and share</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Export search results and documents in various formats
              </p>
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                ഡോക്യുമെന്റ് ഡൗൺലോഡ്
              </Badge>
            </Card>
          </div>
        </div>
      </div>

      {/* Search Results Area */}
      {isSearching && (
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center space-x-3 mb-6">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
              <h3 className="text-xl font-semibold text-foreground">Searching documents...</h3>
            </div>
            
            <Card className="p-8 gradient-surface border-white/10 shadow-card">
              <div className="space-y-4">
                <div className="animate-pulse">
                  <div className="h-4 bg-muted/30 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-muted/30 rounded w-1/2 mb-4"></div>
                  <div className="h-20 bg-muted/20 rounded mb-4"></div>
                </div>
                <div className="animate-pulse delay-100">
                  <div className="h-4 bg-muted/30 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-muted/30 rounded w-3/4 mb-4"></div>
                  <div className="h-20 bg-muted/20 rounded"></div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchInterface;