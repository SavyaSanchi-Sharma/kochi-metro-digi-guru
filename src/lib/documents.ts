export interface Document {
  id: string;
  title: string;
  description: string;
  filePath: string;
  language: 'en' | 'ml';
  type: 'government-order' | 'manual' | 'guideline';
  dateAdded: string;
}

export const documents: Document[] = [
  {
    id: 'gov-order-1',
    title: 'Government Order - Metro Operations',
    description: 'Official order regarding metro operations and safety guidelines',
    filePath: 'pdfs/govtorder2609202518_40_12.pdf',
    language: 'en',
    type: 'government-order',
    dateAdded: '2025-09-26'
  },
  {
    id: 'gov-order-2',
    title: 'Government Order - Station Management',
    description: 'Guidelines for station management and crowd control',
    filePath: 'pdfs/govtorder2709202515_06_35.pdf',
    language: 'en',
    type: 'government-order',
    dateAdded: '2025-09-27'
  },
  {
    id: 'manual-ml',
    title: 'Kochi Metro Safety Guidelines (Malayalam)',
    description: 'Comprehensive safety guidelines and procedures in Malayalam',
    filePath: 'pdfs/MALAYALAM_II.pdf',
    language: 'ml',
    type: 'manual',
    dateAdded: '2025-09-28'
  }
];