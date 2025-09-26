
export type Relationship = 'Family' | 'Friend' | 'Colleague' | 'Neighbor' | 'Acquaintance' | 'Other';
export type SupportLikelihood = 'High' | 'Medium' | 'Low' | 'Unsure';
export type AppStatus = 'Installed' | 'Pending' | 'Not Joined';
export type PollingStatus = 'Voted' | 'Not Voted Yet' | 'Unknown';
export type UrgencyLevel = 'Critical' | 'Important' | 'Gentle';

export interface Contact {
  id: string;
  name: string;
  memberId: string;
  relationship: Relationship;
  support: SupportLikelihood;
  canInfluence: boolean;
  appStatus: AppStatus;
  networkSize: number;
  pollingStatus: PollingStatus;
  lastSeen?: string;
}

export interface MessageTemplate {
  id: string;
  title: string;
  from: string;
  received: string;
  content: string;
  type: 'Urgent' | 'Scheduled';
}

export interface User {
  name: string;
  level?: number;
}
