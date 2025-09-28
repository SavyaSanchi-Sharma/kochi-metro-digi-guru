import React, { useState } from 'react';
import { Calendar, Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface AdvancedFiltersProps {
  onApplyFilters: (filters: FilterCriteria) => void;
  onClose: () => void;
}

export interface FilterCriteria {
  dateFrom?: string;
  dateTo?: string;
  department?: string;
  documentType?: string;
  author?: string;
  tags?: string[];
}

const AdvancedFilters: React.FC<AdvancedFiltersProps> = ({ onApplyFilters, onClose }) => {
  const [filters, setFilters] = useState<FilterCriteria>({});
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const departments = [
    'Rolling Stock / റോളിംഗ് സ്റ്റോക്ക്',
    'Operations / ഓപ്പറേഷൻസ്', 
    'Engineering / എഞ്ചിനീയറിംഗ്',
    'Signal & Telecom / സിഗ്നൽ & ടെലികോം',
    'Safety & Security / സുരക്ഷ & സെക്യൂരിറ്റി'
  ];

  const documentTypes = [
    'Maintenance Report / അറ്റകുറ്റപ്പണി റിപ്പോർട്ട്',
    'Safety Document / സുരക്ഷാ രേഖ',
    'Meeting Minutes / മീറ്റിംഗ് മിനിറ്റ്സ്',
    'Technical Document / സാങ്കേതിക രേഖ',
    'Emergency Manual / അടിയന്തിര മാനുവൽ',
    'Analytics Report / അനലിറ്റിക്സ് റിപ്പോർട്ട്'
  ];

  const availableTags = [
    'Maintenance', 'മെയിന്റനൻസ്',
    'Safety', 'സുരക്ഷ',
    'Technical', 'സാങ്കേതിക',
    'Meeting', 'മീറ്റിംഗ്',
    'Emergency', 'അടിയന്തിരം'
  ];

  const handleTagToggle = (tag: string) => {
    const newTags = selectedTags.includes(tag) 
      ? selectedTags.filter(t => t !== tag)
      : [...selectedTags, tag];
    setSelectedTags(newTags);
    setFilters(prev => ({ ...prev, tags: newTags }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({});
    setSelectedTags([]);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl mx-4 p-6 gradient-surface border-white/10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Advanced Filters</h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4">
          {/* Date Range */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">From Date</label>
              <Input
                type="date"
                value={filters.dateFrom || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                className="bg-card/50 border-white/20"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">To Date</label>
              <Input
                type="date"
                value={filters.dateTo || ''}
                onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                className="bg-card/50 border-white/20"
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Department</label>
            <Select value={filters.department || ''} onValueChange={(value) => setFilters(prev => ({ ...prev, department: value }))}>
              <SelectTrigger className="bg-card/50 border-white/20">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Document Type */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Document Type</label>
            <Select value={filters.documentType || ''} onValueChange={(value) => setFilters(prev => ({ ...prev, documentType: value }))}>
              <SelectTrigger className="bg-card/50 border-white/20">
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {documentTypes.map(type => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Author */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Author</label>
            <Input
              placeholder="Enter author name..."
              value={filters.author || ''}
              onChange={(e) => setFilters(prev => ({ ...prev, author: e.target.value }))}
              className="bg-card/50 border-white/20"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Tags</label>
            <div className="flex flex-wrap gap-2">
              {availableTags.map(tag => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-all ${
                    selectedTags.includes(tag) 
                      ? 'bg-primary text-primary-foreground' 
                      : 'border-white/20 text-foreground hover:bg-primary/10'
                  }`}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6 pt-4 border-t border-white/10">
          <Button variant="outline" onClick={handleReset} className="border-white/20">
            Reset All
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} className="border-white/20">
              Cancel
            </Button>
            <Button onClick={handleApply} className="gradient-primary">
              Apply Filters
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdvancedFilters;