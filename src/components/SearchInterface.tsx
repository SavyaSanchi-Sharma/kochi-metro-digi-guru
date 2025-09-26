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
import AdvancedFilters, { FilterCriteria } from './AdvancedFilters';

const SearchInterface = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterCriteria>({});

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

  // Comprehensive dummy document data with diverse Malayalam documents
  const allDocuments = [
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
    },
    {
      id: '4',
      title: 'Technical Specifications - Signal System',
      titleMalayalam: 'സാങ്കേതിക സ്പെസിഫിക്കേഷൻസ് - സിഗ്നൽ സിസ്റ്റം',
      content: 'Detailed technical specifications for the metro signal system including CBTC implementation.',
      contentMalayalam: 'സിബിടിസി നടപ്പാക്കൽ ഉൾപ്പെടെയുള്ള മെട്രോ സിഗ്നൽ സിസ്റ്റത്തിന്റെ വിശദമായ സാങ്കേതിക സ്പെസിഫിക്കേഷനുകൾ.',
      type: 'Technical Document',
      date: '5 Dec 2024',
      author: 'Ravi Kumar',
      department: 'Signal & Telecom',
      tags: ['Technical', 'സാങ്കേതിക', 'Signal', 'CBTC'],
      fileSize: '3.2 MB',
      summary: 'Complete technical documentation for Communication Based Train Control system implementation and maintenance procedures.',
      summaryMalayalam: 'കമ്യൂണിക്കേഷൻ ബേസ്ഡ് ട്രെയിൻ കൺട്രോൾ സിസ്റ്റം നടപ്പാക്കലിനും അറ്റകുറ്റപ്പണി നടപടിക്രമങ്ങൾക്കുമുള്ള പൂർണ്ണമായ സാങ്കേതിക ഡോക്യുമെന്റേഷൻ.'
    },
    {
      id: '5',
      title: 'Emergency Response Procedure Manual',
      titleMalayalam: 'അടിയന്തര പ്രതികരണ നടപടിക്രമ കൈപുസ്തകം',
      content: 'Comprehensive emergency response procedures for various scenarios in metro operations.',
      contentMalayalam: 'മെട്രോ ഓപ്പറേഷനിലെ വിവിധ സാഹചര്യങ്ങൾക്കുള്ള സമഗ്ര അടിയന്തര പ്രതികരണ നടപടിക്രമങ്ങൾ.',
      type: 'Emergency Manual',
      date: '1 Dec 2024',
      author: 'Meera Nair',
      department: 'Safety & Security',
      tags: ['Emergency', 'അടിയന്തിരം', 'Safety', 'Manual'],
      fileSize: '4.1 MB',
      summary: 'Emergency protocols for fire, medical emergencies, evacuations, and security incidents in metro operations.',
      summaryMalayalam: 'മെട്രോ ഓപ്പറേഷനിലെ തീപിടുത്തം, മെഡിക്കൽ എമർജൻസി, ഒഴിപ്പിക്കൽ, സുരക്ഷാ സംഭവങ്ങൾ എന്നിവയ്ക്കുള്ള അടിയന്തര പ്രോട്ടോക്കോളുകൾ.'
    },
    {
      id: '6',
      title: 'Passenger Traffic Analysis Report',
      titleMalayalam: 'പാസഞ്ചർ ട്രാഫിക് അനാലിസിസ് റിപ്പോർട്ട്',
      content: 'Monthly passenger traffic analysis with peak hour data and capacity utilization metrics.',
      contentMalayalam: 'പീക്ക് അവർ ഡാറ്റയും കപ്പാസിറ്റി ഉപയോഗ മെട്രിക്സും ഉള്ള മാസിക പാസഞ്ചർ ട്രാഫിക് വിശകലനം.',
      type: 'Analytics Report',
      date: '20 Nov 2024',
      author: 'Sanjay Pillai',
      department: 'Operations',
      tags: ['Traffic', 'ട്രാഫിക്', 'Analytics', 'Passenger'],
      fileSize: '1.5 MB',
      summary: 'Detailed analysis of passenger movement patterns, peak usage times, and recommendations for service optimization.',
      summaryMalayalam: 'പാസഞ്ചർ ചലന പാറ്റേണുകൾ, പീക്ക് ഉപയോഗ സമയങ്ങൾ, സേവന ഒപ്റ്റിമൈസേഷനുള്ള ശുപാർശകൾ എന്നിവയുടെ വിശദമായ വിശകലനം.'
    },
    {
      id: '7',
      title: 'Power Supply System Documentation',
      titleMalayalam: 'വൈദ്യുതി വിതരണ സിസ്റ്റം ഡോക്യുമെന്റേഷൻ',
      content: 'Comprehensive documentation of the metro power supply systems and electrical infrastructure.',
      contentMalayalam: 'മെട്രോ വൈദ്യുതി വിതരണ സിസ്റ്റങ്ങളുടെയും ഇലക്ട്രിക്കൽ ഇൻഫ്രാസ്ട്രക്ചറിന്റെയും സമഗ്ര ഡോക്യുമെന്റേഷൻ.',
      type: 'Technical Document',
      date: '18 Nov 2024',
      author: 'Vinu George',
      department: 'Electrical',
      tags: ['Power', 'വൈദ്യുതി', 'Electrical', 'Infrastructure'],
      fileSize: '5.2 MB',
      summary: 'Technical documentation covering 750V DC traction power systems, substations, and backup power arrangements.',
      summaryMalayalam: '750വോൾട്ട് ഡിസി ട്രാക്ഷൻ പവർ സിസ്റ്റങ്ങൾ, സബ്സ്റ്റേഷനുകൾ, ബാക്കപ്പ് പവർ ക്രമീകരണങ്ങൾ എന്നിവ ഉൾക്കൊള്ളുന്ന സാങ്കേതിക ഡോക്യുമെന്റേഷൻ.'
    },
    {
      id: '8',
      title: 'Station Cleaning and Hygiene Protocol',
      titleMalayalam: 'സ്റ്റേഷൻ ശുചീകരണവും ശുചിത്വ പ്രോട്ടോക്കോളും',
      content: 'Standard operating procedures for station cleaning, sanitization, and hygiene maintenance.',
      contentMalayalam: 'സ്റ്റേഷൻ ശുചീകരണം, അണുനശീകരണം, ശുചിത്വ പരിപാലനം എന്നിവയ്ക്കുള്ള സ്റ്റാൻഡേർഡ് ഓപ്പറേറ്റിംഗ് പ്രൊസീജ്യറുകൾ.',
      type: 'SOP Document',
      date: '12 Nov 2024',
      author: 'Leela Devi',
      department: 'Facilities',
      tags: ['Cleaning', 'ശുചീകരണം', 'Hygiene', 'SOP'],
      fileSize: '1.2 MB',
      summary: 'Detailed procedures for daily cleaning schedules, sanitization protocols, and waste management in metro stations.',
      summaryMalayalam: 'മെട്രോ സ്റ്റേഷനുകളിലെ ദൈനംദിന ശുചീകരണ ഷെഡ്യൂൾ, അണുനശീകരണ പ്രോട്ടോക്കോളുകൾ, മാലിന്യ സംസ്കരണം എന്നിവയ്ക്കുള്ള വിശദമായ നടപടിക്രമങ്ങൾ.'
    },
    {
      id: '9',
      title: 'Train Operating Manual - Malayalam Version',
      titleMalayalam: 'ട്രെയിൻ ഓപ്പറേറ്റിംഗ് മാന്വൽ - മലയാളം പതിപ്പ്',
      content: 'Complete train operating manual translated into Malayalam for local operators.',
      contentMalayalam: 'പ്രാദേശിക ഓപ്പറേറ്റർമാർക്കായി മലയാളത്തിലേക്ക് വിവർത്തനം ചെയ്ത സമ്പൂർണ്ണ ട്രെയിൻ ഓപ്പറേറ്റിംഗ് മാന്വൽ.',
      type: 'Operating Manual',
      date: '5 Nov 2024',
      author: 'Radhika Menon',
      department: 'Training',
      tags: ['Operating', 'പ്രവർത്തനം', 'Manual', 'Malayalam'],
      fileSize: '6.8 MB',
      summary: 'Comprehensive Malayalam translation of train operating procedures, safety protocols, and emergency procedures.',
      summaryMalayalam: 'ട്രെയിൻ ഓപ്പറേറ്റിംഗ് പ്രൊസീജ്യറുകൾ, സുരക്ഷാ പ്രോട്ടോക്കോളുകൾ, അടിയന്തര നടപടിക്രമങ്ങൾ എന്നിവയുടെ സമഗ്ര മലയാളം വിവർത്തനം.'
    },
    {
      id: '10',
      title: 'Passenger Communication Guidelines',
      titleMalayalam: 'പാസഞ്ചർ കമ്യൂണിക്കേഷൻ മാർഗ്ഗനിർദ്ദേശങ്ങൾ',
      content: 'Guidelines for effective passenger communication in both English and Malayalam.',
      contentMalayalam: 'ഇംഗ്ലീഷിലും മലയാളത്തിലും ഫലപ്രദമായ പാസഞ്ചർ കമ്യൂണിക്കേഷനുള്ള മാർഗ്ഗനിർദ്ദേശങ്ങൾ.',
      type: 'Guidelines',
      date: '28 Oct 2024',
      author: 'Sindhu Raj',
      department: 'Customer Service',
      tags: ['Communication', 'ആശയവിനിമയം', 'Passenger', 'Guidelines'],
      fileSize: '950 KB',
      summary: 'Standard phrases, announcements, and communication protocols for passenger interaction in multilingual environment.',
      summaryMalayalam: 'ബഹുഭാഷാ പരിതസ്ഥിതിയിൽ യാത്രക്കാരുമായുള്ള ഇടപെടലിനുള്ള സാധാരണ വാക്യങ്ങൾ, പ്രഖ്യാപനങ്ങൾ, ആശയവിനിമയ പ്രോട്ടോക്കോളുകൾ.'
    },
    {
      id: '11',
      title: 'CCTV Surveillance System Report',
      titleMalayalam: 'സിസിടിവി നിരീക്ഷണ സിസ്റ്റം റിപ്പോർട്ട്',
      content: 'Monthly report on CCTV surveillance system performance and security monitoring.',
      contentMalayalam: 'സിസിടിവി നിരീക്ഷണ സിസ്റ്റത്തിന്റെ പ്രകടനവും സുരക്ഷാ നിരീക്ഷണവും സംബന്ധിച്ച മാസിക റിപ്പോർട്ട്.',
      type: 'Security Report',
      date: '25 Oct 2024',
      author: 'Arun Prakash',
      department: 'Security',
      tags: ['CCTV', 'നിരീക്ഷണം', 'Security', 'Surveillance'],
      fileSize: '2.1 MB',
      summary: 'Analysis of CCTV coverage, system uptime, recorded incidents, and security breach prevention measures.',
      summaryMalayalam: 'സിസിടിവി കവറേജ്, സിസ്റ്റം അപ്ടൈം, രേഖപ്പെടുത്തിയ സംഭവങ്ങൾ, സുരക്ഷാ ലംഘന തടയൽ നടപടികൾ എന്നിവയുടെ വിശകലനം.'
    },
    {
      id: '12',
      title: 'Air Conditioning System Maintenance',
      titleMalayalam: 'എയർ കണ്ടീഷനിംഗ് സിസ്റ്റം മെയിന്റനൻസ്',
      content: 'Maintenance schedule and procedures for metro air conditioning systems.',
      contentMalayalam: 'മെട്രോ എയർ കണ്ടീഷനിംഗ് സിസ്റ്റങ്ങളുടെ അറ്റകുറ്റപ്പണി ഷെഡ്യൂളും നടപടിക്രമങ്ങളും.',
      type: 'Maintenance Guide',
      date: '20 Oct 2024',
      author: 'Biju Thomas',
      department: 'HVAC',
      tags: ['HVAC', 'എയർകണ്ടീഷനിംഗ്', 'Maintenance', 'Climate'],
      fileSize: '3.5 MB',
      summary: 'Detailed maintenance procedures for train and station HVAC systems including filter replacement and system diagnostics.',
      summaryMalayalam: 'ട്രെയിനിലെയും സ്റ്റേഷനിലെയും എച്ച്വിഎസി സിസ്റ്റങ്ങളുടെ ഫിൽട്ടർ മാറ്റിസ്ഥാപിക്കലും സിസ്റ്റം ഡയഗ്നോസ്റ്റിക്സും ഉൾപ്പെടെയുള്ള വിശദമായ അറ്റകുറ്റപ്പണി നടപടിക്രമങ്ങൾ.'
    },
    {
      id: '13',
      title: 'Revenue Collection and Audit Report',
      titleMalayalam: 'വരുമാന ശേഖരണവും ഓഡിറ്റ് റിപ്പോർട്ടും',
      content: 'Monthly revenue collection analysis and financial audit report.',
      contentMalayalam: 'മാസിക വരുമാന ശേഖരണ വിശകലനവും സാമ്പത്തിക ഓഡിറ്റ് റിപ്പോർട്ടും.',
      type: 'Financial Report',
      date: '15 Oct 2024',
      author: 'Jayasree Nair',
      department: 'Finance',
      tags: ['Revenue', 'വരുമാനം', 'Audit', 'Finance'],
      fileSize: '2.8 MB',
      summary: 'Comprehensive analysis of ticket sales, digital payments, fare collection efficiency, and financial reconciliation.',
      summaryMalayalam: 'ടിക്കറ്റ് വിൽപ്പന, ഡിജിറ്റൽ പേയ്മെന്റുകൾ, യാത്രാ നിരക്ക് ശേഖരണ കാര്യക്ഷമത, സാമ്പത്തിക പൊരുത്തപ്പെടുത്തൽ എന്നിവയുടെ സമഗ്ര വിശകലനം.'
    },
    {
      id: '14',
      title: 'Fire Safety and Prevention Protocol',
      titleMalayalam: 'അഗ്നിസുരക്ഷയും പ്രതിരോധ പ്രോട്ടോക്കോളും',
      content: 'Fire safety procedures and prevention protocols for metro infrastructure.',
      contentMalayalam: 'മെട്രോ ഇൻഫ്രാസ്ട്രക്ചറിനുള്ള അഗ്നിസുരക്ഷാ നടപടിക്രമങ്ങളും പ്രതിരോധ പ്രോട്ടോക്കോളുകളും.',
      type: 'Fire Safety Manual',
      date: '10 Oct 2024',
      author: 'Captain Mohan Das',
      department: 'Fire Safety',
      tags: ['Fire Safety', 'അഗ്നിസുരക്ഷ', 'Prevention', 'Emergency'],
      fileSize: '4.3 MB',
      summary: 'Comprehensive fire prevention measures, detection systems, evacuation procedures, and firefighting protocols.',
      summaryMalayalam: 'സമഗ്ര അഗ്നി പ്രതിരോധ നടപടികൾ, കണ്ടെത്തൽ സിസ്റ്റങ്ങൾ, ഒഴിപ്പിക്കൽ നടപടിക്രമങ്ങൾ, അഗ്നിശമന പ്രോട്ടോക്കോളുകൾ.'
    },
    {
      id: '15',
      title: 'Environmental Impact Assessment',
      titleMalayalam: 'പരിസ്ഥിതി ആഘാത മൂല്യനിർണ്ണയം',
      content: 'Annual environmental impact assessment of metro operations and sustainability measures.',
      contentMalayalam: 'മെട്രോ പ്രവർത്തനങ്ങളുടെയും സുസ്ഥിരത നടപടികളുടെയും വാർഷിക പരിസ്ഥിതി ആഘാത മൂല്യനിർണ്ണയം.',
      type: 'Environmental Report',
      date: '5 Oct 2024',
      author: 'Dr. Kavitha Menon',
      department: 'Environment',
      tags: ['Environment', 'പരിസ്ഥിതി', 'Sustainability', 'Assessment'],
      fileSize: '3.7 MB',
      summary: 'Assessment of carbon footprint, energy consumption, waste management, and green initiatives in metro operations.',
      summaryMalayalam: 'മെട്രോ പ്രവർത്തനങ്ങളിലെ കാർബൺ കാൽപ്പാട്, ഊർജ്ജ ഉപഭോഗം, മാലിന്യ സംസ്കരണം, ഹരിത സംരംഭങ്ങൾ എന്നിവയുടെ മൂല്യനിർണ്ണയം.'
    }
  ];

  // Function to filter documents based on search query
  const getFilteredDocuments = (searchQuery: string) => {
    if (!searchQuery.trim()) return allDocuments;
    
    const query = searchQuery.toLowerCase();
    
    // Check if query contains Malayalam text or specific keywords
    if (query.includes('മീറ്റിംഗ്') || query.includes('meeting') || query.includes('സംഗ്രഹം') || query.includes('gist')) {
      return allDocuments.filter(doc => 
        doc.type.includes('Meeting') || 
        doc.tags.some(tag => tag.includes('മീറ്റിംഗ്') || tag.includes('Meeting'))
      );
    }
    
    if (query.includes('സാങ്കേതിക') || query.includes('technical') || query.includes('സ്പെസിഫിക്കേഷൻ') || query.includes('specification')) {
      return allDocuments.filter(doc => 
        doc.type.includes('Technical') || 
        doc.tags.some(tag => tag.includes('Technical') || tag.includes('സാങ്കേതിക'))
      );
    }
    
    if (query.includes('സുരക്ഷ') || query.includes('safety') || query.includes('അടിയന്തിരം') || query.includes('emergency')) {
      return allDocuments.filter(doc => 
        doc.type.includes('Safety') || doc.type.includes('Emergency') ||
        doc.tags.some(tag => tag.includes('Safety') || tag.includes('സുരക്ഷ') || tag.includes('Emergency'))
      );
    }
    
    if (query.includes('മെയിന്റനൻസ്') || query.includes('maintenance') || query.includes('അറ്റകുറ്റപ്പണി')) {
      return allDocuments.filter(doc => 
        doc.type.includes('Maintenance') || 
        doc.tags.some(tag => tag.includes('Maintenance') || tag.includes('മെയിന്റനൻസ്'))
      );
    }
    
    if (query.includes('ഡോക്യുമെന്റ്') || query.includes('document') || query.includes('രേഖ')) {
      return allDocuments;
    }
    
    // General search across all fields
    return allDocuments.filter(doc => 
      doc.title.toLowerCase().includes(query) ||
      doc.titleMalayalam.includes(searchQuery) ||
      doc.content.toLowerCase().includes(query) ||
      doc.contentMalayalam.includes(searchQuery) ||
      doc.tags.some(tag => tag.toLowerCase().includes(query) || tag.includes(searchQuery))
    );
  };

  const handleSearch = () => {
    if (!query.trim()) {
      toast.error('Please enter a search query');
      return;
    }
    
    setIsSearching(true);
    setHasSearched(true);
    
    // Simulate API call with intelligent filtering
    setTimeout(() => {
      const filteredResults = getFilteredDocuments(query);
      setSearchResults(filteredResults);
      setIsSearching(false);
      toast.success(`Found ${filteredResults.length} documents matching your query`);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    setIsSearching(true);
    setHasSearched(true);
    
    setTimeout(() => {
      let filteredResults = [];
      let actionQuery = '';
      
      if (action === 'Date Range Search') {
        // Filter documents from last 10 days
        filteredResults = allDocuments.filter(doc => 
          new Date(doc.date) >= new Date('2024-12-01')
        );
        actionQuery = 'Documents from December 2024';
        toast.success(`Found ${filteredResults.length} recent documents`);
      } else if (action === 'Meeting Summaries') {
        filteredResults = allDocuments.filter(doc => 
          doc.type.includes('Meeting')
        );
        actionQuery = 'Meeting summaries and minutes';
        toast.success(`Found ${filteredResults.length} meeting documents`);
      } else if (action === 'Document Export') {
        filteredResults = allDocuments.slice(0, 3);
        actionQuery = 'Documents ready for export';
        toast.success(`Prepared ${filteredResults.length} documents for export`);
      }
      
      setQuery(actionQuery);
      setSearchResults(filteredResults);
      setIsSearching(false);
    }, 1200);
  };

  const handleSampleQuery = (queryText: string) => {
    setQuery(queryText);
    // Auto-search for sample queries
    setTimeout(() => {
      const filteredResults = getFilteredDocuments(queryText);
      setSearchResults(filteredResults);
      setHasSearched(true);
      toast.success(`Found ${filteredResults.length} documents for sample query`);
    }, 500);
  };

  const handleApplyFilters = (filters: FilterCriteria) => {
    setActiveFilters(filters);
    setIsSearching(true);
    setHasSearched(true);
    
    setTimeout(() => {
      let filtered = allDocuments;
      
      if (filters.department) {
        filtered = filtered.filter(doc => doc.department === filters.department);
      }
      
      if (filters.documentType) {
        filtered = filtered.filter(doc => doc.type === filters.documentType);
      }
      
      if (filters.author) {
        filtered = filtered.filter(doc => 
          doc.author.toLowerCase().includes(filters.author!.toLowerCase())
        );
      }
      
      if (filters.tags && filters.tags.length > 0) {
        filtered = filtered.filter(doc => 
          filters.tags!.some(tag => doc.tags.includes(tag))
        );
      }
      
      if (filters.dateFrom) {
        filtered = filtered.filter(doc => new Date(doc.date) >= new Date(filters.dateFrom!));
      }
      
      if (filters.dateTo) {
        filtered = filtered.filter(doc => new Date(doc.date) <= new Date(filters.dateTo!));
      }
      
      setSearchResults(filtered);
      setIsSearching(false);
      setQuery('Advanced filter applied');
      toast.success(`Found ${filtered.length} documents with applied filters`);
    }, 1000);
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
                    onClick={() => setShowAdvancedFilters(true)}
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

      {/* Advanced Filters Modal */}
      {showAdvancedFilters && (
        <AdvancedFilters
          onApplyFilters={handleApplyFilters}
          onClose={() => setShowAdvancedFilters(false)}
        />
      )}
    </div>
  );
};

export default SearchInterface;