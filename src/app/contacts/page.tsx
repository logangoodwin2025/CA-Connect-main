
'use client';

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { mockContacts as initialContacts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, Edit, Users, XCircle, PlusCircle, Share2, Copy, ArrowLeft, Search } from "lucide-react";
import type { AppStatus, Contact, Relationship, SupportLikelihood } from "@/lib/types";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const statusIcons: Record<AppStatus, React.ReactNode> = {
  "Installed": <CheckCircle2 className="h-4 w-4 text-green-500" />,
  "Pending": <Clock className="h-4 w-4 text-yellow-500" />,
  "Not Joined": <XCircle className="h-4 w-4 text-red-500" />,
};

const supportInfo: Record<SupportLikelihood, { emoji: string; }> = {
  High: { emoji: "😊" },
  Medium: { emoji: "😐" },
  Low: { emoji: "☹️" },
  Unsure: { emoji: "❓" },
};

const allRelationships: Relationship[] = ['Family', 'Friend', 'Colleague', 'Neighbor', 'Acquaintance', 'Other'];
const allSupportLevels: SupportLikelihood[] = ['High', 'Medium', 'Low', 'Unsure'];


function ContactsPageContent() {
  const { toast } = useToast();
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [editedRelationship, setEditedRelationship] = useState<Relationship>('Friend');
  const [editedSupport, setEditedSupport] = useState<SupportLikelihood>('Unsure');

  const [searchQuery, setSearchQuery] = useState('');
  const [relationshipFilter, setRelationshipFilter] = useState<Relationship | 'all'>('all');
  const [supportFilter, setSupportFilter] = useState<SupportLikelihood | 'all'>('all');

  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'campaigner';

  const handleEditClick = (contact: Contact) => {
    setSelectedContact(contact);
    setEditedRelationship(contact.relationship);
    setEditedSupport(contact.support);
    setIsEditDialogOpen(true);
  };

  const handleSaveChanges = () => {
    if (selectedContact) {
      setContacts(contacts.map(c => 
        c.id === selectedContact.id 
          ? { ...c, relationship: editedRelationship, support: editedSupport } 
          : c
      ));
      setIsEditDialogOpen(false);
      setSelectedContact(null);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const relationshipMatch = relationshipFilter === 'all' || contact.relationship === relationshipFilter;
    const supportMatch = supportFilter === 'all' || contact.support === supportFilter;
    const searchMatch = !searchQuery || 
                        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        contact.memberId.toLowerCase().includes(searchQuery.toLowerCase());
    return relationshipMatch && supportMatch && searchMatch;
  });

  const inviteCode = "C4-CONNECT-2024";
  const downloadLink = "https://private-app-store.com/ca-connect";

  const handleCopy = (textToCopy: string, toastMessage: string) => {
    navigator.clipboard.writeText(textToCopy);
    toast({
      title: "Copied to clipboard!",
      description: toastMessage,
    });
  };

  return (
    <AppLayout pageTitle="My Network">
      <div className="space-y-4">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-2">
            <Select value={relationshipFilter} onValueChange={(value) => setRelationshipFilter(value as Relationship | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="All Relationships" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Relationships</SelectItem>
                {allRelationships.map(rel => <SelectItem key={rel} value={rel}>{rel}</SelectItem>)}
              </SelectContent>
            </Select>

            <Select value={supportFilter} onValueChange={(value) => setSupportFilter(value as SupportLikelihood | 'all')}>
              <SelectTrigger>
                <SelectValue placeholder="All Support Levels" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Support Levels</SelectItem>
                {allSupportLevels.map(sup => <SelectItem key={sup} value={sup}>{sup}</SelectItem>)}
              </SelectContent>
            </Select>

            {role === 'candidate' && (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Invite
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Share Invite</DialogTitle>
                    <DialogDescription>
                      Share this code and download link with contacts you want to invite to your network.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="invite-code">Your Invite Code</Label>
                      <div className="flex items-center gap-2">
                        <Input id="invite-code" value={inviteCode} readOnly/>
                        <Button size="icon" variant="outline" onClick={() => handleCopy(inviteCode, "Invite code copied.")}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="download-link">App Download Link</Label>
                      <div className="flex items-center gap-2">
                        <Input id="download-link" value={downloadLink} readOnly />
                        <Button size="icon" variant="outline" onClick={() => handleCopy(downloadLink, "Download link copied.")}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-between gap-2">
                    <DialogClose asChild>
                      <Button type="button" variant="outline" className="w-full sm:w-auto">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back
                      </Button>
                    </DialogClose>
                    <Button type="button" className="w-full sm:w-auto">
                      <Share2 className="mr-2 h-4 w-4" /> Share via WhatsApp
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            <Link href={`/contacts/add?role=${role}`} className="w-full sm:w-auto">
              <Button className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Contact
              </Button>
            </Link>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-primary" />
            <Input 
              placeholder="Search by name or member ID..." 
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <Card>
            <CardContent className="p-0">
                <div className="space-y-2">
                    {filteredContacts.map((contact) => (
                        <div key={contact.id} className="flex items-center p-4 border-t">
                            <div className="flex-grow">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <span className="text-lg">{supportInfo[contact.support].emoji}</span>
                                    <p className="font-semibold">{contact.name}</p>
                                    <Badge variant="outline">{contact.relationship}</Badge>
                                    <Badge variant="secondary">{contact.support}</Badge>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                        {statusIcons[contact.appStatus]}
                                        <span>{contact.appStatus}</span>
                                    </div>
                                    {contact.appStatus === 'Installed' && (
                                       <div className="flex items-center gap-1">
                                        <Users className="h-3 w-3"/>
                                        <span>{contact.networkSize}</span>
                                      </div>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-2 ml-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0" onClick={() => handleEditClick(contact)}>
                                    <Edit className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                     {filteredContacts.length === 0 && (
                      <div className="text-center p-8 text-muted-foreground">
                        <p>No contacts found.</p>
                        {searchQuery && <p className="text-sm">Try adjusting your search or filters.</p>}
                      </div>
                    )}
                </div>
            </CardContent>
        </Card>

        <div className="flex justify-center mt-4">
            <Button size="lg">Invite All Pending</Button>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Contact: {selectedContact?.name}</DialogTitle>
            <DialogDescription>
              Update the relationship and support likelihood for this contact.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="relationship" className="text-right">
                Relationship
              </Label>
              <Select value={editedRelationship} onValueChange={(value) => setEditedRelationship(value as Relationship)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a relationship" />
                </SelectTrigger>
                <SelectContent>
                  {allRelationships.map(rel => <SelectItem key={rel} value={rel}>{rel}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="support" className="text-right">
                Support
              </Label>
              <Select value={editedSupport} onValueChange={(value) => setEditedSupport(value as SupportLikelihood)}>
                 <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select support likelihood" />
                </SelectTrigger>
                <SelectContent>
                  {allSupportLevels.map(sup => <SelectItem key={sup} value={sup}>{sup}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={handleSaveChanges}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}

export default function ContactsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactsPageContent />
    </Suspense>
  );
}
