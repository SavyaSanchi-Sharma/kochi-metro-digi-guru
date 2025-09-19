import React from 'react';
import { User, Building, Mail, Phone, Calendar, Badge as BadgeIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface UserProfileProps {
  user: {
    name: string;
    role: string;
    department: string;
    email: string;
    phone: string;
    employeeId: string;
    joinDate: string;
    permissions: string[];
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center space-x-4 cursor-pointer hover:bg-white/5 rounded-lg p-2 transition-colors">
          <div className="text-right">
            <p className="text-sm font-medium text-foreground">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.role}</p>
          </div>
          <Avatar className="h-10 w-10 ring-2 ring-primary/20">
            <AvatarImage src="/placeholder-avatar.jpg" />
            <AvatarFallback className="gradient-primary text-white font-medium">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-md gradient-surface border-white/20">
        <DialogHeader>
          <DialogTitle className="text-foreground">User Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16 ring-2 ring-primary/20">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="gradient-primary text-white font-medium text-lg">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{user.name}</h3>
              <p className="text-primary font-medium">{user.role}</p>
              <p className="text-sm text-muted-foreground">{user.department}</p>
            </div>
          </div>

          {/* Contact Information */}
          <Card className="p-4 gradient-surface border-white/10">
            <h4 className="font-medium text-foreground mb-3 flex items-center">
              <User className="h-4 w-4 mr-2" />
              Contact Information
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">{user.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <BadgeIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">ID: {user.employeeId}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-foreground">Joined: {user.joinDate}</span>
              </div>
            </div>
          </Card>

          {/* Department */}
          <Card className="p-4 gradient-surface border-white/10">
            <h4 className="font-medium text-foreground mb-3 flex items-center">
              <Building className="h-4 w-4 mr-2" />
              Department
            </h4>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {user.department}
            </Badge>
          </Card>

          {/* Permissions */}
          <Card className="p-4 gradient-surface border-white/10">
            <h4 className="font-medium text-foreground mb-3">Access Permissions</h4>
            <div className="flex flex-wrap gap-2">
              {user.permissions.map((permission, index) => (
                <Badge key={index} variant="outline" className="border-white/20 text-foreground">
                  {permission}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Actions */}
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" className="flex-1 border-white/20">
              Edit Profile
            </Button>
            <Button variant="outline" size="sm" className="flex-1 border-white/20">
              Settings
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserProfile;