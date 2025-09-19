import React from 'react';
import { FileText, Calendar, Download, ExternalLink, User, Clock, Tag } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Document {
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
}

interface SearchResultsProps {
  query: string;
  results: Document[];
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query, results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3 mb-6">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full" />
            <h3 className="text-xl font-semibold text-foreground">Searching documents...</h3>
          </div>
          
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="p-6 gradient-surface border-white/10 shadow-card">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-muted/30 rounded w-3/4"></div>
                  <div className="h-4 bg-muted/30 rounded w-1/2"></div>
                  <div className="h-20 bg-muted/20 rounded"></div>
                  <div className="flex space-x-2">
                    <div className="h-6 bg-muted/20 rounded w-16"></div>
                    <div className="h-6 bg-muted/20 rounded w-20"></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">No documents found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search terms or explore our document categories
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Search Results</h3>
            <p className="text-muted-foreground">
              Found {results.length} documents for "{query}"
            </p>
          </div>
          <Button variant="outline" className="border-white/20">
            <Download className="h-4 w-4 mr-2" />
            Export Results
          </Button>
        </div>

        <div className="space-y-6">
          {results.map((doc) => (
            <Card key={doc.id} className="p-6 gradient-surface border-white/10 shadow-card hover:shadow-glow transition-all duration-300 group">
              {/* Document Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {doc.title}
                  </h4>
                  <p className="text-sm text-primary/80 mb-2">{doc.titleMalayalam}</p>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{doc.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{doc.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="h-4 w-4" />
                      <span>{doc.fileSize}</span>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {doc.type}
                </Badge>
              </div>

              {/* Content Preview */}
              <div className="space-y-3 mb-4">
                <p className="text-foreground leading-relaxed">{doc.summary}</p>
                <p className="text-primary/90 text-sm leading-relaxed">{doc.summaryMalayalam}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {doc.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="border-white/20 text-foreground">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Department: {doc.department}</span>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="border-white/20">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="border-white/20">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <Button variant="outline" className="border-white/20">
            Load More Results
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;