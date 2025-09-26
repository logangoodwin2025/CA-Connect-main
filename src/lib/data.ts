
import type { Contact, MessageTemplate, User, PromotionRequest } from '@/lib/types';

export const mockUser: User = {
  name: 'Sunil',
  level: 1,
};

// In a real app, this would be fetched from a database
export const secondLevelNetworks: Record<string, Contact[]> = {
    '1': [ // Priya Sharma's network
        { id: '1-1', name: 'Friend 1 of Priya', memberId: 'CA-F1', relationship: 'Friend', support: 'High', canInfluence: true, appStatus: 'Installed', networkSize: 2, pollingStatus: 'Voted' } as Contact,
        { id: '1-2', name: 'Colleague 1 of Priya', memberId: 'CA-C1', relationship: 'Colleague', support: 'Medium', appStatus: 'Pending', networkSize: 0, pollingStatus: 'Not Voted Yet' } as Contact,
    ],
    '3': [ // Sara Ali's network
        { id: '3-1', name: 'Family 1 of Sara', memberId: 'CA-F2', relationship: 'Family', support: 'High', canInfluence: false, appStatus: 'Installed', networkSize: 3, pollingStatus: 'Voted' } as Contact,
    ],
    '7': [ // Sunita Gupta's network
        { id: '7-1', name: 'Neighbor 1 of Sunita', memberId: 'CA-N1', relationship: 'Neighbor', support: 'Medium', canInfluence: true, appStatus: 'Not Joined', networkSize: 0, pollingStatus: 'Not Voted Yet' } as Contact,
    ],
     '8': [ // Vikram Singh's network
        { id: '8-1', name: 'Friend 2 of Vikram', memberId: 'CA-F3', relationship: 'Friend', support: 'High', canInfluence: false, appStatus: 'Installed', networkSize: 1, pollingStatus: 'Voted' } as Contact,
    ]
};

export const mockContacts: Contact[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    memberId: 'CA234567',
    relationship: 'Family',
    support: 'High',
    canInfluence: true,
    appStatus: 'Installed',
    networkSize: (secondLevelNetworks['1'] || []).length,
    pollingStatus: 'Not Voted Yet',
    lastSeen: '10 min ago'
  },
  {
    id: '2',
    name: 'Amit Patel',
    memberId: 'CA345678',
    relationship: 'Friend',
    support: 'High',
    canInfluence: false,
    appStatus: 'Pending',
    networkSize: (secondLevelNetworks['2'] || []).length,
    pollingStatus: 'Not Voted Yet',
    lastSeen: '1 hour ago'
  },
  {
    id: '3',
    name: 'Sara Ali',
    memberId: 'CA456789',
    relationship: 'Colleague',
    support: 'Medium',
    canInfluence: true,
    appStatus: 'Installed',
    networkSize: (secondLevelNetworks['3'] || []).length,
    pollingStatus: 'Voted',
  },
  {
    id: '4',
    name: 'Raj Kumar',
    memberId: 'CA567890',
    relationship: 'Neighbor',
    support: 'Medium',
    canInfluence: false,
    appStatus: 'Not Joined',
    networkSize: (secondLevelNetworks['4'] || []).length,
    pollingStatus: 'Voted',
  },
  {
    id: '5',
    name: 'Deepak Shah',
    memberId: 'CA678901',
    relationship: 'Friend',
    support: 'Low',
    canInfluence: false,
    appStatus: 'Pending',
    networkSize: (secondLevelNetworks['5'] || []).length,
    pollingStatus: 'Not Voted Yet',
  },
    {
    id: '6',
    name: 'Rohan Verma',
    memberId: 'CA789012',
    relationship: 'Acquaintance',
    support: 'Unsure',
    canInfluence: false,
    appStatus: 'Not Joined',
    networkSize: (secondLevelNetworks['6'] || []).length,
    pollingStatus: 'Not Voted Yet',
  },
  {
    id: '7',
    name: 'Sunita Gupta',
    memberId: 'CA890123',
    relationship: 'Family',
    support: 'High',
    canInfluence: true,
    appStatus: 'Installed',
    networkSize: (secondLevelNetworks['7'] || []).length,
    pollingStatus: 'Voted',
  },
   {
    id: '8',
    name: 'Vikram Singh',
    memberId: 'CA901234',
    relationship: 'Friend',
    support: 'High',
    canInfluence: true,
    appStatus: 'Installed',
    networkSize: (secondLevelNetworks['8'] || []).length,
    pollingStatus: 'Voted',
  },
];

export const mockMessages: MessageTemplate[] = [
    {
        id: 'msg1',
        title: 'IMPORTANT: Community Town Hall',
        from: 'Central Office',
        received: '2 min ago',
        content: "Join us for a community town hall tomorrow at the Grand Auditorium. Your participation is valuable for discussing key issues. We look forward to your presence.",
        type: 'Urgent',
    },
    {
        id: 'msg2',
        title: 'Reminder: Election Day',
        from: 'Central Office',
        received: '1 day ago',
        content: "This is a reminder that the election is on [Date]. Your participation is important. Your designated polling station is [Polling Station].",
        type: 'Scheduled',
    },
    {
        id: 'msg3',
        title: 'Thank You for Your Contribution',
        from: 'Central Office',
        received: '3 days ago',
        content: "We appreciate your continued engagement and contribution. Please continue to share information with your network and encourage their participation.",
        type: 'Urgent',
    }
];

export const mockPromotionRequests: PromotionRequest[] = [
    {
        id: 'req1',
        contactId: '1',
        contactName: 'Priya Sharma',
        requestedBy: 'Campaigner User',
        reason: 'Has built a strong network of 15+ contacts and shows excellent leadership potential',
        status: 'Pending',
        requestedAt: '2 days ago'
    },
    {
        id: 'req2',
        contactId: '3',
        contactName: 'Sara Ali',
        requestedBy: 'Campaigner User',
        reason: 'Highly influential in their community and has recruited 8 new supporters',
        status: 'Pending',
        requestedAt: '1 day ago'
    },
    {
        id: 'req3',
        contactId: '7',
        contactName: 'Sunita Gupta',
        requestedBy: 'Campaigner User',
        reason: 'Demonstrates strong organizational skills and community engagement',
        status: 'Approved',
        requestedAt: '3 days ago'
    }
];
