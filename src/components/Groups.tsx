import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, MessageCircle, Hash, Plus, Settings, Bell } from 'lucide-react';

interface Group {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  unreadCount: number;
  lastActivity: string;
  type: 'department' | 'project' | 'general';
  isActive: boolean;
}

interface Channel {
  id: string;
  name: string;
  groupId: string;
  unreadCount: number;
  type: 'text' | 'announcement';
}

const Groups = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>('1');
  const [searchTerm, setSearchTerm] = useState('');

  const groups: Group[] = [
    {
      id: '1',
      name: 'Operations Team',
      description: 'Daily operations and coordination',
      memberCount: 24,
      unreadCount: 3,
      lastActivity: '2 min ago',
      type: 'department',
      isActive: true
    },
    {
      id: '2',
      name: 'Safety & Security',
      description: 'സുരക്ഷാ വിഭാഗം - Safety protocols and incidents',
      memberCount: 18,
      unreadCount: 0,
      lastActivity: '1 hour ago',
      type: 'department',
      isActive: true
    },
    {
      id: '3',
      name: 'Maintenance Team',
      description: 'Technical maintenance and repairs',
      memberCount: 31,
      unreadCount: 7,
      lastActivity: '15 min ago',
      type: 'department',
      isActive: true
    },
    {
      id: '4',
      name: 'Document Review',
      description: 'Document approval and review process',
      memberCount: 12,
      unreadCount: 2,
      lastActivity: '3 hours ago',
      type: 'project',
      isActive: false
    },
    {
      id: '5',
      name: 'Training & Development',
      description: 'Staff training and development programs',
      memberCount: 45,
      unreadCount: 0,
      lastActivity: '1 day ago',
      type: 'general',
      isActive: true
    }
  ];

  const channels: Channel[] = [
    { id: '1', name: 'general', groupId: '1', unreadCount: 2, type: 'text' },
    { id: '2', name: 'announcements', groupId: '1', unreadCount: 1, type: 'announcement' },
    { id: '3', name: 'daily-reports', groupId: '1', unreadCount: 0, type: 'text' },
    { id: '4', name: 'incidents', groupId: '2', unreadCount: 0, type: 'text' },
    { id: '5', name: 'safety-updates', groupId: '2', unreadCount: 0, type: 'announcement' },
    { id: '6', name: 'work-orders', groupId: '3', unreadCount: 5, type: 'text' },
    { id: '7', name: 'equipment-status', groupId: '3', unreadCount: 2, type: 'text' }
  ];

  const getGroupTypeColor = (type: string) => {
    switch (type) {
      case 'department': return 'bg-metro-primary text-white';
      case 'project': return 'bg-yellow-500 text-white';
      case 'general': return 'bg-gray-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedGroupChannels = channels.filter(channel => 
    channel.groupId === selectedGroup
  );

  return (
    <div className="flex h-[calc(100vh-73px)]">
      {/* Groups Sidebar */}
      <div className="w-80 border-r border-metro-primary/20 bg-metro-light">
        <div className="p-4 border-b border-metro-primary/20">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-metro-dark">Groups</h2>
            <Button size="sm" className="bg-metro-primary hover:bg-metro-accent text-white">
              <Plus className="h-4 w-4 mr-1" />
              New
            </Button>
          </div>
          <Input
            placeholder="Search groups..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-metro-primary/30"
          />
        </div>

        <div className="overflow-y-auto">
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              className={`p-4 border-b border-metro-primary/10 cursor-pointer hover:bg-metro-secondary/50 transition-colors ${
                selectedGroup === group.id ? 'bg-metro-secondary border-l-4 border-l-metro-primary' : ''
              }`}
              onClick={() => setSelectedGroup(group.id)}
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-medium text-metro-dark truncate">{group.name}</h3>
                <div className="flex items-center gap-1 flex-shrink-0">
                  {group.unreadCount > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      {group.unreadCount}
                    </Badge>
                  )}
                  <Badge className={`text-xs ${getGroupTypeColor(group.type)}`}>
                    {group.type}
                  </Badge>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{group.description}</p>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{group.memberCount} members</span>
                </div>
                <span>{group.lastActivity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {selectedGroup ? (
          <>
            {/* Group Header */}
            <div className="p-4 border-b border-metro-primary/20 bg-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-metro-dark">
                    {groups.find(g => g.id === selectedGroup)?.name}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {groups.find(g => g.id === selectedGroup)?.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-metro-primary text-metro-primary">
                    <Bell className="h-4 w-4 mr-1" />
                    Notifications
                  </Button>
                  <Button variant="outline" size="sm" className="border-metro-primary text-metro-primary">
                    <Settings className="h-4 w-4 mr-1" />
                    Settings
                  </Button>
                </div>
              </div>
            </div>

            {/* Channels */}
            <div className="flex-1 flex">
              <div className="w-64 border-r border-metro-primary/20 bg-white">
                <div className="p-3 border-b border-metro-primary/10">
                  <h3 className="font-medium text-metro-dark text-sm">Channels</h3>
                </div>
                <div className="p-2">
                  {selectedGroupChannels.map((channel) => (
                    <div
                      key={channel.id}
                      className="flex items-center gap-2 p-2 rounded hover:bg-metro-secondary/50 cursor-pointer text-sm"
                    >
                      <Hash className="h-4 w-4 text-gray-500" />
                      <span className="flex-1">{channel.name}</span>
                      {channel.unreadCount > 0 && (
                        <Badge variant="secondary" className="text-xs bg-metro-primary text-white">
                          {channel.unreadCount}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Area */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 p-4 bg-gray-50">
                  <Card className="h-full border-metro-primary/20">
                    <CardContent className="p-6 flex items-center justify-center h-full">
                      <div className="text-center">
                        <MessageCircle className="h-12 w-12 text-metro-primary mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-metro-dark mb-2">
                          Welcome to {groups.find(g => g.id === selectedGroup)?.name}
                        </h3>
                        <p className="text-gray-600 mb-4">
                          This is where your team communicates and collaborates on documents and projects.
                        </p>
                        <p className="text-sm text-gray-500">
                          To enable full chat functionality, connect your project to Supabase using the green button in the top right.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-metro-primary/20 bg-white">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      className="flex-1 border-metro-primary/30"
                      disabled
                    />
                    <Button className="bg-metro-primary hover:bg-metro-accent text-white" disabled>
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <Users className="h-16 w-16 text-metro-primary mx-auto mb-4" />
              <h3 className="text-xl font-medium text-metro-dark mb-2">Select a Group</h3>
              <p className="text-gray-600">Choose a group from the sidebar to start collaborating</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Groups;