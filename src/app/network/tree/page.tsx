
'use client';

import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, Users, XCircle, Award, Star } from "lucide-react";
import { mockUser, mockContacts, secondLevelNetworks } from "@/lib/data";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import type { Contact } from "@/lib/types";
import { Badge } from "@/components/ui/badge";

const supportEmojis = { High: "😊", Medium: "😐", Low: "☹️", Unsure: "❓" };

interface TreeNodeData {
    id: string;
    name: string;
    description: string;
    contact?: Contact;
    children: TreeNodeData[];
}

const TreeNode = ({ name, description, children, contact, isRoot }: { name:string, description: string, children: TreeNodeData[], contact?: Contact, isRoot?: boolean }) => {
  const [isOpen, setIsOpen] = useState(isRoot);
  
  const status = contact?.appStatus || "Installed";
  const support = contact?.support;
  const networkSize = contact?.networkSize ?? 0;
  const canInfluence = contact?.canInfluence;

  const isActive = status === 'Installed';
  const isPending = status === 'Pending';
  const isNotJoined = status === 'Not Joined';

  const canExpand = children && children.length > 0;
  
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="space-y-1">
      <div className="flex items-center gap-2 w-full text-left p-2 rounded-lg hover:bg-muted/50">
        <div className={`flex-grow flex items-center gap-1 sm:gap-3 ${isRoot ? '' : 'ml-4 sm:ml-8'}`}>
          {canExpand ? (
            <CollapsibleTrigger asChild>
                <button>
                    <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}/>
                </button>
            </CollapsibleTrigger>
          ) : (
             <span className="w-4 h-4" /> // Placeholder for alignment
          )}
          <div className="flex-grow">
            <div className="flex items-center gap-2">
                <p className="font-semibold text-sm sm:text-base">{name}</p>
                {support && <span className="text-xs">{supportEmojis[support]}</span>}
                {canInfluence && <Star className="h-3 w-3 text-amber-500 fill-amber-500" />}
            </div>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground mr-2">
            <Users className="h-3 w-3"/>
            <span>{networkSize}</span>
        </div>
        <div className="hidden sm:flex items-center justify-center gap-1 text-xs w-28 text-muted-foreground">
            {isActive && <CheckCircle2 className="h-3 w-3 text-green-500" />}
            {isPending && <Clock className="h-3 w-3 text-yellow-500" />}
            {isNotJoined && <XCircle className="h-3 w-3 text-red-500" />}
            <span>{isActive ? 'Active' : isPending ? 'Invite Sent' : 'Not Joined'}</span>
        </div>
      </div>
      <CollapsibleContent>
          <div className="pl-4 sm:pl-8 border-l border-dashed ml-6 sm:ml-12">
            {children.map((childNode) => (
                <TreeNode key={childNode.id} {...childNode} contact={childNode.contact}/>
            ))}
          </div>
      </CollapsibleContent>
    </Collapsible>
  );
};


const buildTree = (contacts: Contact[]): TreeNodeData[] => {
    return contacts.map(contact => {
        const children = (secondLevelNetworks[contact.id] || []).map(childContact => ({
            id: childContact.id,
            name: childContact.name,
            description: childContact.relationship,
            contact: childContact,
            children: [] // Level 2 nodes have no children shown
        }));
        
        return {
            id: contact.id,
            name: contact.name,
            description: contact.relationship,
            contact: {
                ...contact,
                networkSize: children.length
            },
            children: children
        };
    });
}


export default function NetworkTreePage() {
    const treeData = buildTree(mockContacts);

    const directContacts = mockContacts.length;
    
    // Consistent metrics with Candidate Dashboard
    const totalNetworkReach = 4387;
    const activeMembers = 639;
    const highVoters = 1245;
    const medVoters = 2378;

  return (
    <AppLayout pageTitle="Network Tree">
      <div className="flex flex-col items-center space-y-8">
        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>Your Network Reach</CardTitle>
                <CardDescription>A visual representation of your direct network and their reach.</CardDescription>
            </CardHeader>
            <CardContent className="p-2">
               <TreeNode name={mockUser.name} description="You" children={treeData} isRoot={true} contact={{networkSize: directContacts, support: 'High', appStatus: 'Installed'} as Contact} />
            </CardContent>
        </Card>

        <Card className="w-full max-w-4xl">
            <CardHeader>
                <CardTitle>Network Summary</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                    <p className="text-xl sm:text-2xl font-bold">{totalNetworkReach.toLocaleString()}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Total Network Reach</p>
                </div>
                 <div>
                    <p className="text-xl sm:text-2xl font-bold">{activeMembers.toLocaleString()}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Active Members</p>
                </div>
                 <div>
                    <p className="text-xl sm:text-2xl font-bold">{highVoters.toLocaleString()}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Likely High Support</p>
                </div>
                 <div>
                    <p className="text-xl sm:text-2xl font-bold">{medVoters.toLocaleString()}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Likely Medium Support</p>
                </div>
            </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
