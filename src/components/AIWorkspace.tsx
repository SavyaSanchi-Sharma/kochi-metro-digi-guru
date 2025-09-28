import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { Document as SourceDocument, documents as allDocuments } from '@/lib/documents';
import SearchResults from './SearchResults';

// Interface matching SearchResults component
interface SearchDocument {
  id: string;
  title: string;
  titleMalayalam: string;
  content: string;
  contentMalayalam: string;
  type: string;
  date: string;
  author: string;
  department: string;
  tags: string[];
  fileSize: string;
  summary: string;
  summaryMalayalam: string;
  fileName: string;
}

const AIWorkspace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchDocument[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const sampleQueries = [
    'സുരക്ഷാ നിയമങ്ങൾ സംഗ്രഹിക്കുക',
    'Metro station guidelines',
    'Crowd management procedures',
    'Emergency protocols',
    'Platform safety rules'
  ];

  const convertDocumentToSearchResult = (doc: SourceDocument): SearchDocument => {
    // Clean up the file path to ensure proper format
    const fileName = doc.filePath.startsWith('/') ? doc.filePath.substring(1) : doc.filePath;
    
    return {
      id: doc.id,
      title: doc.title,
      titleMalayalam: doc.language === 'ml' ? doc.title : '',  // Only use Malayalam title if document is in Malayalam
      content: doc.description,
      contentMalayalam: doc.language === 'ml' ? doc.description : '', // Only use Malayalam content if document is in Malayalam
      type: doc.type,
      date: doc.dateAdded,
      author: 'System',  // Default value
      department: 'General',  // Default value
      tags: [doc.type, doc.language === 'ml' ? 'Malayalam' : 'English'],
      fileSize: '1 MB',  // Default value
      summary: doc.description,
      summaryMalayalam: doc.language === 'ml' ? doc.description : '', // Only use Malayalam summary if document is in Malayalam
      fileName: fileName
    }
  };

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error('Please enter a search query');
      return;
    }
    
    setIsSearching(true);
    
    // Simulate API call with intelligent filtering and language detection
    setTimeout(() => {
      // Check if the query contains Malayalam characters (basic check)
      const containsMalayalam = /[\u0D00-\u0D7F]/.test(searchQuery);
      
      const results = allDocuments
        .filter(doc => {
          const searchLower = searchQuery.toLowerCase();
          const titleLower = doc.title.toLowerCase();
          const descLower = doc.description.toLowerCase();
          
          // If searching in Malayalam, prioritize Malayalam documents
          if (containsMalayalam && doc.language === 'ml') {
            return true; // Include all Malayalam documents for Malayalam queries
          }
          
          // For English queries or as fallback, check both title and description
          return titleLower.includes(searchLower) || descLower.includes(searchLower);
        })
        // Sort Malayalam documents first for Malayalam queries
        .sort((a, b) => {
          if (containsMalayalam) {
            if (a.language === 'ml' && b.language !== 'ml') return -1;
            if (a.language !== 'ml' && b.language === 'ml') return 1;
          }
          return 0;
        })
        .map(convertDocumentToSearchResult);

      setSearchResults(results);
      setIsSearching(false);
      toast.success(`Found ${results.length} documents matching your query`);
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Metro Document Search</h1>
        <p className="text-muted-foreground mb-8">
          Search through Kochi Metro's documents using AI-powered search
        </p>
        <div className="flex max-w-3xl mx-auto gap-2">
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            className="flex-1"
          />
          <Button 
            className="bg-metro-primary hover:bg-metro-primary/90"
            onClick={handleSearch}
            disabled={isSearching || !searchQuery.trim()}
          >
            {isSearching ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 mr-2" />
                Search
              </>
            )}
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {sampleQueries.map((query, index) => (
            <Button
              key={index}
              variant="ghost"
              className="text-sm hover:bg-accent"
              onClick={() => {
                setSearchQuery(query);
                setTimeout(() => handleSearch(), 100);
              }}
            >
              {query}
            </Button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      <SearchResults 
        query={searchQuery}
        results={searchResults}
        isLoading={isSearching}
      />
    </div>
  );
};

export default AIWorkspace;