import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { FileText, TrendingUp, Users, Clock, CheckCircle, AlertTriangle, Eye, Download } from 'lucide-react';

const Metrics = () => {
  const stats = [
    {
      title: 'Total Documents',
      value: '1,247',
      change: '+12%',
      changeType: 'positive' as const,
      icon: FileText
    },
    {
      title: 'Active Users',
      value: '89',
      change: '+5%',
      changeType: 'positive' as const,
      icon: Users
    },
    {
      title: 'Documents Processed',
      value: '156',
      change: '+23%',
      changeType: 'positive' as const,
      icon: CheckCircle
    },
    {
      title: 'Avg. Processing Time',
      value: '2.4h',
      change: '-15%',
      changeType: 'positive' as const,
      icon: Clock
    }
  ];

  const documentStates = [
    { status: 'Active', count: 892, percentage: 71.6, color: 'bg-green-500' },
    { status: 'Under Review', count: 203, percentage: 16.3, color: 'bg-yellow-500' },
    { status: 'Archived', count: 152, percentage: 12.1, color: 'bg-gray-500' }
  ];

  const recentActivity = [
    {
      id: '1',
      action: 'Document Uploaded',
      document: 'Metro Safety Guidelines Malayalam',
      user: 'രാജേഷ് കുമാർ',
      timestamp: '2 minutes ago',
      type: 'upload'
    },
    {
      id: '2',
      action: 'Document Approved',
      document: 'Monthly Operations Report',
      user: 'Sarah Johnson',
      timestamp: '15 minutes ago',
      type: 'approved'
    },
    {
      id: '3',
      action: 'Document Viewed',
      document: 'Technical Specifications',
      user: 'മുഹമ്മദ് അലി',
      timestamp: '1 hour ago',
      type: 'viewed'
    },
    {
      id: '4',
      action: 'Document Downloaded',
      document: 'Emergency Procedures',
      user: 'Priya Nair',
      timestamp: '2 hours ago',
      type: 'downloaded'
    },
    {
      id: '5',
      action: 'Document Rejected',
      document: 'Maintenance Schedule Draft',
      user: 'System Admin',
      timestamp: '3 hours ago',
      type: 'rejected'
    }
  ];

  const departmentUsage = [
    { name: 'Operations', documents: 345, usage: 85 },
    { name: 'Safety & Security', documents: 234, usage: 72 },
    { name: 'Maintenance', documents: 198, usage: 68 },
    { name: 'Administration', documents: 156, usage: 45 },
    { name: 'Training', documents: 134, usage: 38 }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'upload': return <FileText className="h-4 w-4 text-metro-primary" />;
      case 'approved': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'viewed': return <Eye className="h-4 w-4 text-blue-600" />;
      case 'downloaded': return <Download className="h-4 w-4 text-purple-600" />;
      case 'rejected': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <FileText className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityBadgeColor = (type: string) => {
    switch (type) {
      case 'upload': return 'bg-metro-primary text-white';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'viewed': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'downloaded': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-metro-dark mb-2">Analytics & Metrics</h2>
        <p className="text-gray-600">Monitor document activity and system performance</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <Card key={index} className="border-metro-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-metro-dark">{stat.value}</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="h-3 w-3 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">{stat.change}</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-metro-secondary rounded-lg flex items-center justify-center">
                  <stat.icon className="h-6 w-6 text-metro-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Document States */}
        <Card className="border-metro-primary/20">
          <CardHeader>
            <CardTitle className="text-metro-dark">Document States</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {documentStates.map((state, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-metro-dark">{state.status}</span>
                    <span className="text-sm text-gray-600">{state.count} docs</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${state.color}`}
                      style={{ width: `${state.percentage}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500">{state.percentage}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Department Usage */}
        <Card className="border-metro-primary/20">
          <CardHeader>
            <CardTitle className="text-metro-dark">Department Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {departmentUsage.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-metro-dark">{dept.name}</span>
                    <span className="text-sm text-gray-600">{dept.documents} docs</span>
                  </div>
                  <Progress value={dept.usage} className="h-2" />
                  <div className="text-xs text-gray-500">{dept.usage}% capacity</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-metro-primary/20">
        <CardHeader>
          <CardTitle className="text-metro-dark">Recent Activity & Audit Trail</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 bg-metro-light rounded-lg hover:bg-metro-secondary/50 transition-colors">
                <div className="flex-shrink-0">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`text-xs ${getActivityBadgeColor(activity.type)}`}>
                      {activity.action}
                    </Badge>
                  </div>
                  <p className="text-sm font-medium text-metro-dark truncate">{activity.document}</p>
                  <p className="text-xs text-gray-600">by {activity.user}</p>
                </div>
                <div className="flex-shrink-0 text-xs text-gray-500">
                  {activity.timestamp}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Metrics;