import React, { useState } from 'react';
import { Search, Calendar, FileText, Users, Download, Sparkles, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import heroImage from '@/assets/kochi-metro-hero.jpg';
import UserProfile from './UserProfile';
import SearchResults from './SearchResults';

const SearchInterface = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Dummy user data
  const currentUser = {
    name: 'Rajesh Kumar',
    role: 'Mechanical Engineer',
    department: 'Rolling Stock Maintenance',
    email: 'rajesh.kumar@kochimetro.org',
    phone: '+91 98470 12345',
    employeeId: 'KM2023001',
    joinDate: 'March 2023',
    permissions: ['Document Access', 'Technical Reports', 'Maintenance Records', 'Safety Protocols']
  };

  // Dummy Malayalam document data
  const dummyDocuments = [
    {
      id: '1',
      title: 'Monthly Maintenance Report - Rolling Stock',
      titleMalayalam: 'മാസിക അറ്റകുറ്റപ്പണി റിപ്പോർട്ട് - റോളിംഗ് സ്റ്റോക്ക്',
      content: 'Comprehensive maintenance report for metro trains including inspection results and repair recommendations.',
      contentMalayalam: 'പരിശോധന ഫലങ്ങളും അറ്റകുറ്റപ്പണി ശുപാർശകളും ഉൾപ്പെടുന്ന മെട്രോ ട്രെയിനുകളുടെ സമഗ്ര അറ്റകുറ്റപ്പണി റിപ്പോർട്ട്.',
      type: 'Maintenance Report',
      date: '15 Dec 2024',
      author: 'Suresh Nair',
      department: 'Rolling Stock',
      tags: ['Maintenance', 'മെയിന്റനൻസ്', 'Technical', 'Monthly'],
      fileSize: '2.4 MB',
      summary: 'This report covers the monthly maintenance activities for all metro trains, including brake system checks, electrical diagnostics, and safety inspections.',
      summaryMalayalam: 'ബ്രേക്ക് സിസ്റ്റം പരിശോധനകൾ, ഇലക്ട്രിക്കൽ ഡയഗ്നോസ്റ്റിക്സ്, സുരക്ഷാ പരിശോധനകൾ എന്നിവ ഉൾപ്പെടെ എല്ലാ മെട്രോ ട്രെയിനുകളുടെയും മാസിക അറ്റകുറ്റപ്പണി പ്രവർത്തനങ്ങൾ ഈ റിപ്പോർട്ട് ഉൾക്കൊള്ളുന്നു.'
    },
    {
      id: '2',
      title: 'Safety Protocol Update - Platform Operations',
      titleMalayalam: 'സുരക്ഷാ പ്രോട്ടോക്കോൾ അപ്ഡേറ്റ് - പ്ലാറ്റ്ഫോം ഓപ്പറേഷൻസ്',
      content: 'Updated safety protocols for platform operations and passenger management during peak hours.',
      contentMalayalam: 'തിരക്കേറിയ സമയങ്ങളിൽ പ്ലാറ്റ്ഫോം ഓപ്പറേഷനുകൾക്കും യാത്രക്കാരുടെ മാനേജ്മെന്റിനുമുള്ള പുതുക്കിയ സുരക്ഷാ പ്രോട്ടോക്കോളുകൾ.',
      type: 'Safety Document',
      date: '10 Dec 2024',
      author: 'Priya Menon',
      department: 'Operations',
      tags: ['Safety', 'സുരക്ഷ', 'Platform', 'Operations'],
      fileSize: '1.8 MB',
      summary: 'New safety guidelines for platform staff including emergency procedures, crowd control measures, and communication protocols.',
      summaryMalayalam: 'അടിയന്തര നടപടിക്രമങ്ങൾ, ജനക്കൂട്ടം നിയന്ത്രണ നടപടികൾ, ആശയവിനിമയ പ്രോട്ടോക്കോളുകൾ എന്നിവയുൾപ്പെടെ പ്ലാറ്റ്ഫോം സ്റ്റാഫിനുള്ള പുതിയ സുരക്ഷാ മാർഗ്ഗനിർദ്ദേശങ്ങൾ.'
    },
    {
      id: '3',
      title: 'Engineering Meeting Minutes - Track Maintenance',
      titleMalayalam: 'എഞ്ചിനീയറിംഗ് മീറ്റിംഗ് മിനിറ്റ്സ് - ട്രാക്ക് മെയിന്റനൻസ്',
      content: 'Meeting minutes from the weekly engineering review covering track maintenance schedules and upcoming projects.',
      contentMalayalam: 'ട്രാക്ക് അറ്റകുറ്റപ്പണി ഷെഡ്യൂളുകളും വരാനിരിക്കുന്ന പ്രോജക്ടുകളും ഉൾക്കൊള്ളുന്ന പ്രാപ്തിക എഞ്ചിനീയറിംഗ് അവലോകനത്തിൽ നിന്നുള്ള മീറ്റിംഗ് മിനിറ്റ്സ്.',
      type: 'Meeting Minutes',
      date: '8 Dec 2024',
      author: 'Anand Krishnan',
      department: 'Engineering',
      tags: ['Meeting', 'മീറ്റിംഗ്', 'Track', 'Engineering'],
      fileSize: '856 KB',
      summary: 'Weekly engineering meeting discussing track inspection results, maintenance scheduling, and resource allocation for upcoming projects.',
      summaryMalayalam: 'ട്രാക്ക് പരിശോധന ഫലങ്ങൾ, അറ്റകുറ്റപ്പണി ഷെഡ്യൂളിംഗ്, വരാനിരിക്കുന്ന പ്രോജക്ടുകൾക്കുള്ള റിസോഴ്സ് അലോക്കേഷൻ എന്നിവ ചർച്ച ചെയ്യുന്ന പ്രാപ്തിക എഞ്ചിനീയറിംഗ് മീറ്റിംഗ്.'
    }
  ];

  const handleSearch = () => {
    if (!query.trim()) {
      toast.error('Please enter a search query');
      return;
    }
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API call with dummy data
    setTimeout(() => {
      setSearchResults(dummyDocuments);
      setIsSearching(false);
      toast.success(`Found ${dummyDocuments.length} documents`);
    }, 2000);
  };

  const handleQuickAction = (action: string) => {
    toast.info(`${action} feature coming soon!`);
  };

  const handleSampleQuery = (queryText: string) => {
    setQuery(queryText);
    toast.info('Sample query selected. Click Search to see results.');
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
            <UserProfile user={currentUser} />
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
                  className="pl-12 pr-20 py-6 text-lg bg-card/50 backdrop-blur-sm border-white/20 rounded-2xl shadow-card focus:shadow-glow transition-all duration-300"
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuickAction('Advanced Filter')}
                    className="rounded-lg hover:bg-white/10"
                  >
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Button
                    onClick={handleSearch}
                    disabled={isSearching || !query.trim()}
                    className="rounded-xl px-6 gradient-primary hover:shadow-glow transition-all duration-300"
                  >
                    {isSearching ? (
                      <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    ) : (
                      'Search'
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Sample Queries */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {sampleQueries.map((queryText, index) => (
                <Button
                  key={index}
                  variant="secondary"
                  size="sm"
                  onClick={() => handleSampleQuery(queryText)}
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
            <Card 
              className="p-6 gradient-surface border-white/10 shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer"
              onClick={() => handleQuickAction('Date Range Search')}
            >
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

            <Card 
              className="p-6 gradient-surface border-white/10 shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer"
              onClick={() => handleQuickAction('Meeting Summaries')}
            >
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

            <Card 
              className="p-6 gradient-surface border-white/10 shadow-card hover:shadow-glow transition-all duration-300 group cursor-pointer"
              onClick={() => handleQuickAction('Document Export')}
            >
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

      {/* Search Results */}
      {hasSearched && (
        <SearchResults 
          query={query} 
          results={searchResults} 
          isLoading={isSearching} 
        />
      )}
    </div>
  );
};

export default SearchInterface;