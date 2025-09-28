import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, Eye, X, ZoomIn, ZoomOut } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: 'active' | 'archived' | 'under_review';
  preview?: string;
}

const DocumentViewer = () => {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [zoom, setZoom] = useState(100);

  const documents: Document[] = [
    {
      id: '1',
      name: 'Metro Operations Manual',
      type: 'PDF',
      size: '2.4 MB',
      uploadDate: '2024-01-15',
      status: 'active',
      preview: 'Sample preview of Metro Operations Manual content...'
    },
    {
      id: '2',
      name: 'Safety Guidelines Malayalam',
      type: 'PDF',
      size: '1.8 MB',
      uploadDate: '2024-01-14',
      status: 'active',
      preview: 'സുരക്ഷാ മാർഗനിർദേശങ്ങൾ - മെട്രോ റെയിൽ സംവിധാനത്തിനായുള്ള...'
    },
    {
      id: '3',
      name: 'Monthly Report Jan 2024',
      type: 'DOCX',
      size: '956 KB',
      uploadDate: '2024-01-13',
      status: 'under_review',
      preview: 'Monthly operational report covering ridership statistics...'
    },
    {
      id: '4',
      name: 'Technical Specifications',
      type: 'PDF',
      size: '3.2 MB',
      uploadDate: '2024-01-12',
      status: 'active',
      preview: 'Detailed technical specifications for metro rail systems...'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'under_review': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const DocumentPreview = ({ doc }: { doc: Document }) => (
    <div className="space-y-4">
      <div className="bg-metro-light p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-metro-primary" />
            <span className="font-medium">{doc.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(Math.max(50, zoom - 25))}
              disabled={zoom <= 50}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="text-sm text-gray-600">{zoom}%</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setZoom(Math.min(200, zoom + 25))}
              disabled={zoom >= 200}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div 
          className="bg-white border border-metro-primary/20 rounded p-4 min-h-[400px]"
          style={{ fontSize: `${zoom}%` }}
        >
          <div className="text-gray-700 leading-relaxed">
            {doc.preview}
            <div className="mt-4 p-4 bg-gray-50 rounded">
              <p className="text-sm text-gray-600 italic">
                [This is a preview. The actual document viewer would display the full PDF/DOC content here]
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <Button className="bg-metro-primary hover:bg-metro-accent text-white">
          <Download className="h-4 w-4 mr-2" />
          Download
        </Button>
        <Button variant="outline" className="border-metro-primary text-metro-primary">
          <Eye className="h-4 w-4 mr-2" />
          Full Screen
        </Button>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-metro-dark mb-2">Document Library</h2>
        <p className="text-gray-600">Browse and view your documents with built-in viewers</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <Card key={doc.id} className="hover:shadow-lg transition-shadow border-metro-primary/20">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-metro-primary" />
                  <div>
                    <CardTitle className="text-sm font-medium truncate">{doc.name}</CardTitle>
                    <p className="text-xs text-gray-500 mt-1">{doc.type} • {doc.size}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(doc.status)}`}>
                  {doc.status.replace('_', ' ')}
                </span>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{doc.preview}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                <span>Uploaded: {doc.uploadDate}</span>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="w-full bg-metro-primary hover:bg-metro-accent text-white"
                    onClick={() => setSelectedDoc(doc)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View Document
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-metro-dark">Document Viewer</DialogTitle>
                  </DialogHeader>
                  {selectedDoc && <DocumentPreview doc={selectedDoc} />}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DocumentViewer;