import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { FileText, Brain, MessageSquare, Sparkles, Trash2, Save, RefreshCw } from 'lucide-react';

interface WorkspaceSession {
  id: string;
  title: string;
  documents: string[];
  query: string;
  response: string;
  timestamp: Date;
}

const AIWorkspace = () => {
  const [sessions, setSessions] = useState<WorkspaceSession[]>([
    {
      id: '1',
      title: 'Safety Protocol Analysis',
      documents: ['Metro Safety Guidelines Malayalam', 'Emergency Procedures'],
      query: 'Summarize the key safety protocols for platform operations',
      response: 'Based on the safety guidelines, key platform protocols include:\n\n1. മെട്രോ പ്ലാറ്റ്ഫോമിൽ യെല്ലോ ലൈനിന് പിന്നിൽ നിൽക്കുക\n2. Train arrival announcements must be clearly audible\n3. Emergency stop procedures for platform incidents\n4. Crowd management during peak hours\n\nThese protocols ensure passenger safety and smooth operations.',
      timestamp: new Date(Date.now() - 3600000)
    }
  ]);

  const [currentQuery, setCurrentQuery] = useState('');
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeSession, setActiveSession] = useState<string | null>(null);

  const availableDocuments = [
    'Metro Operations Manual',
    'Safety Guidelines Malayalam',
    'Technical Specifications',
    'Monthly Report Jan 2024',
    'Emergency Procedures',
    'Maintenance Protocols',
    'Staff Training Guide',
    'Customer Service Standards'
  ];

  const sampleQueries = [
    'സുരക്ഷാ നിയമങ്ങൾ സംഗ്രഹിക്കുക',
    'Compare operational procedures across documents',
    'Extract maintenance schedules and timelines',
    'Identify policy changes between versions',
    'Generate training checklist from documents',
    'Find compliance requirements mentioned'
  ];

  const handleProcessQuery = () => {
    if (!currentQuery.trim() || selectedDocs.length === 0) return;

    setIsProcessing(true);
    
    setTimeout(() => {
      const newSession: WorkspaceSession = {
        id: Date.now().toString(),
        title: currentQuery.slice(0, 50) + (currentQuery.length > 50 ? '...' : ''),
        documents: [...selectedDocs],
        query: currentQuery,
        response: generateSampleResponse(currentQuery, selectedDocs),
        timestamp: new Date()
      };

      setSessions([newSession, ...sessions]);
      setActiveSession(newSession.id);
      setCurrentQuery('');
      setIsProcessing(false);
    }, 2000);
  };

  const generateSampleResponse = (query: string, docs: string[]) => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('സുരക്ഷാ') || lowerQuery.includes('safety')) {
      return `AI Analysis of Safety Documents:\n\n📋 Documents Analyzed: ${docs.join(', ')}\n\n🔍 Key Findings:\n• Platform safety protocols clearly defined\n• മെട്രോ സ്റ്റേഷനിൽ സുരക്ഷാ നടപടികൾ\n• Emergency evacuation procedures updated\n• Staff safety training requirements outlined\n\n💡 Recommendations:\n- Review safety protocols quarterly\n- Ensure Malayalam translations are current\n- Conduct regular safety drills`;
    }
    
    if (lowerQuery.includes('maintenance') || lowerQuery.includes('technical')) {
      return `Technical Analysis Report:\n\n📋 Documents Processed: ${docs.join(', ')}\n\n🔧 Maintenance Insights:\n• Scheduled maintenance intervals identified\n• Critical system checkpoints mapped\n• Resource allocation requirements\n• Compliance standards verification\n\n📊 Summary Statistics:\n- 15 maintenance procedures found\n- 8 critical safety checks\n- 3 emergency protocols\n\n⚠️ Action Items:\n- Update technical specifications\n- Schedule preventive maintenance`;
    }
    
    return `AI Analysis Complete:\n\n📋 Documents Analyzed: ${docs.join(', ')}\n\n🎯 Query Results:\n${query}\n\n📝 Analysis Summary:\nBased on the selected documents, I've extracted relevant information and cross-referenced key points. The analysis includes multilingual content processing for both English and Malayalam text.\n\n🔍 Key Insights:\n• Document consistency verified\n• Policy alignment confirmed\n• Procedural gaps identified\n• Compliance requirements met\n\n💭 Next Steps:\nConsider implementing the suggested improvements and schedule regular document reviews.`;
  };

  const deleteSession = (sessionId: string) => {
    setSessions(sessions.filter(s => s.id !== sessionId));
    if (activeSession === sessionId) {
      setActiveSession(null);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-metro-dark mb-2">AI Workspace</h2>
        <p className="text-gray-600">Temporary space for AI-powered document analysis and insights</p>
      </div>

      <Tabs defaultValue="new-analysis" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new-analysis">New Analysis</TabsTrigger>
          <TabsTrigger value="sessions">Analysis History</TabsTrigger>
        </TabsList>

        <TabsContent value="new-analysis" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Document Selection */}
            <Card className="border-metro-primary/20">
              <CardHeader>
                <CardTitle className="text-metro-dark flex items-center gap-2">
                  <FileText className="h-5 w-5 text-metro-primary" />
                  Select Documents
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {availableDocuments.map((doc) => (
                    <div key={doc} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={doc}
                        checked={selectedDocs.includes(doc)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedDocs([...selectedDocs, doc]);
                          } else {
                            setSelectedDocs(selectedDocs.filter(d => d !== doc));
                          }
                        }}
                        className="rounded border-metro-primary/30"
                      />
                      <label htmlFor={doc} className="text-sm text-metro-dark cursor-pointer">
                        {doc}
                      </label>
                    </div>
                  ))}
                </div>
                
                {selectedDocs.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-metro-primary/20">
                    <p className="text-sm font-medium text-metro-dark mb-2">Selected Documents:</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedDocs.map((doc) => (
                        <Badge key={doc} variant="secondary" className="bg-metro-secondary text-metro-dark">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Query Input */}
            <Card className="border-metro-primary/20">
              <CardHeader>
                <CardTitle className="text-metro-dark flex items-center gap-2">
                  <Brain className="h-5 w-5 text-metro-primary" />
                  AI Analysis Query
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Ask AI to analyze your documents... (English or Malayalam)"
                  value={currentQuery}
                  onChange={(e) => setCurrentQuery(e.target.value)}
                  rows={4}
                  className="border-metro-primary/30"
                />
                
                <div>
                  <p className="text-sm font-medium text-metro-dark mb-2">Sample Queries:</p>
                  <div className="space-y-1">
                    {sampleQueries.map((query, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        size="sm"
                        className="text-left justify-start h-auto p-2 text-xs hover:bg-metro-secondary"
                        onClick={() => setCurrentQuery(query)}
                      >
                        {query}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleProcessQuery}
                  disabled={!currentQuery.trim() || selectedDocs.length === 0 || isProcessing}
                  className="w-full bg-metro-primary hover:bg-metro-accent text-white"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Analyze Documents
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sessions">
          <div className="space-y-4">
            {sessions.length === 0 ? (
              <Card className="border-metro-primary/20">
                <CardContent className="p-8 text-center">
                  <Brain className="h-12 w-12 text-metro-primary mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-metro-dark mb-2">No Analysis Sessions</h3>
                  <p className="text-gray-600">Start a new analysis to see your session history here</p>
                </CardContent>
              </Card>
            ) : (
              sessions.map((session) => (
                <Card key={session.id} className="border-metro-primary/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-metro-dark text-lg">{session.title}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {session.timestamp.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-metro-primary text-metro-primary"
                        >
                          <Save className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSession(session.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium text-metro-dark mb-2">Documents Analyzed:</p>
                        <div className="flex flex-wrap gap-1">
                          {session.documents.map((doc) => (
                            <Badge key={doc} variant="secondary" className="bg-metro-secondary text-metro-dark">
                              {doc}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div>
                        <p className="text-sm font-medium text-metro-dark mb-2">Query:</p>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded">{session.query}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-metro-dark mb-2">AI Response:</p>
                        <div className="text-sm text-gray-700 bg-metro-light p-4 rounded whitespace-pre-line">
                          {session.response}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIWorkspace;