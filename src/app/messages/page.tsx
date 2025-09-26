
"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockMessages, mockContacts } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Forward, MessageSquare, Send, Mail, BotMessageSquare, RefreshCw, ChevronDown } from "lucide-react";
import type { MessageTemplate, Contact } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";

// Mock data for recipient statuses for a given message
const getRecipientStatuses = (messageId: string, allContacts: Contact[]) => {
    // In a real app, this would be fetched based on the message
    const sent = new Set(allContacts.slice(0, Math.floor(allContacts.length / 2)).map(c => c.id));
    const failed = new Set(allContacts.slice(Math.floor(allContacts.length / 2), Math.floor(allContacts.length / 2) + 1).map(c => c.id));
    
    return {
        sent: allContacts.filter(c => sent.has(c.id)),
        failed: allContacts.filter(c => failed.has(c.id)),
        notSent: allContacts.filter(c => !sent.has(c.id) && !failed.has(c.id)),
    };
};

const MessageCampaignCard = ({ message, allContacts }: { message: MessageTemplate; allContacts: Contact[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedContacts, setSelectedContacts] = useState<Set<string>>(new Set());
    const { toast } = useToast();
    
    const recipientStatuses = getRecipientStatuses(message.id, allContacts);
    const totalSent = recipientStatuses.sent.length + recipientStatuses.failed.length;
    
    const handleContactToggle = (contactId: string) => {
        const newSelection = new Set(selectedContacts);
        if (newSelection.has(contactId)) {
            newSelection.delete(contactId);
        } else {
            newSelection.add(contactId);
        }
        setSelectedContacts(newSelection);
    };

    const handleSelectAllNotSent = () => {
        const allNotSentIds = new Set(recipientStatuses.notSent.map(c => c.id));
        setSelectedContacts(allNotSentIds);
    };
    
    const handleSend = () => {
        if (selectedContacts.size === 0) {
            toast({
                title: "Selection required",
                description: "Please select at least one recipient.",
                variant: "destructive",
            });
            return;
        }
        // Logic to send message would go here
        console.log(`Sending "${message.title}" to ${selectedContacts.size} contacts.`);
        toast({
            title: "Message Sent!",
            description: `Your message has been queued for delivery to ${selectedContacts.size} contacts.`,
        });
        setSelectedContacts(new Set()); // Clear selection after sending
    };

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} asChild>
            <Card>
                <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                        <div className="flex-grow">
                            <p className="font-semibold">{message.title}</p>
                            <p className="text-sm text-muted-foreground">From: {message.from} • Sent to {totalSent} of {allContacts.length} contacts</p>
                        </div>
                        <Button variant="ghost" size="sm" className="w-9 p-0">
                            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                            <span className="sr-only">Toggle details</span>
                        </Button>
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <Separator />
                    <CardContent className="p-4 md:p-6">
                        <p className="text-sm text-muted-foreground mb-4">{message.content}</p>
                        <Tabs defaultValue="not-sent">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="not-sent">Not Sent ({recipientStatuses.notSent.length})</TabsTrigger>
                                <TabsTrigger value="status">Sent & Failed ({recipientStatuses.sent.length + recipientStatuses.failed.length})</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="not-sent" className="mt-4">
                                <div className="flex justify-between items-center py-2">
                                    <p className="font-semibold text-sm">Select Recipients ({selectedContacts.size} selected)</p>
                                    <Button variant="link" onClick={handleSelectAllNotSent} disabled={recipientStatuses.notSent.length === 0}>Select All</Button>
                                </div>
                                <ScrollArea className="h-48 border rounded-md">
                                    <div className="p-4 space-y-3">
                                        {recipientStatuses.notSent.length > 0 ? recipientStatuses.notSent.map(contact => (
                                            <div key={contact.id} className="flex items-center justify-between">
                                                <Label htmlFor={`contact-${contact.id}-${message.id}`} className="flex items-center gap-3 cursor-pointer">
                                                    <Checkbox 
                                                        id={`contact-${contact.id}-${message.id}`}
                                                        checked={selectedContacts.has(contact.id)}
                                                        onCheckedChange={() => handleContactToggle(contact.id)}
                                                    />
                                                    <div>
                                                        <p>{contact.name}</p>
                                                        <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                                                    </div>
                                                </Label>
                                            </div>
                                        )) : <p className="text-sm text-muted-foreground text-center p-4">All your contacts have received this message.</p>}
                                    </div>
                                </ScrollArea>
                                <div className="space-y-3 pt-4">
                                    <p className="font-semibold text-sm">Select Channel</p>
                                    <div className="flex flex-col sm:flex-row justify-around gap-2">
                                        <Button variant="outline" className="flex-1"><BotMessageSquare className="mr-2 h-5 w-5"/> WhatsApp</Button>
                                        <Button variant="outline" className="flex-1"><Mail className="mr-2 h-5 w-5"/> Email</Button>
                                        <Button variant="outline" className="flex-1"><MessageSquare className="mr-2 h-5 w-5"/> SMS</Button>
                                    </div>
                                </div>
                                <div className="pt-4 flex justify-end">
                                    <Button onClick={handleSend} disabled={selectedContacts.size === 0}>
                                        <Send className="mr-2 h-4 w-4" /> Send to {selectedContacts.size} contacts
                                    </Button>
                                </div>
                            </TabsContent>

                            <TabsContent value="status" className="mt-4">
                                <ScrollArea className="h-64 border rounded-md">
                                    <div className="p-4 space-y-3">
                                        {recipientStatuses.failed.map(contact => (
                                            <div key={contact.id} className="flex items-center justify-between p-2 border border-destructive/50 rounded-md">
                                                <div>
                                                    <p className="font-semibold text-sm">{contact.name}</p>
                                                    <p className="text-xs text-destructive">Delivery failed</p>
                                                </div>
                                                <Button variant="ghost" size="sm" onClick={() => { /* Resend logic */ }}>
                                                    <RefreshCw className="mr-2 h-3 w-3" /> Resend
                                                </Button>
                                            </div>
                                        ))}
                                        {recipientStatuses.sent.map(contact => (
                                            <div key={contact.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                                                <div>
                                                    <p className="font-semibold text-sm">{contact.name}</p>
                                                    <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                                                </div>
                                                <p className="text-xs text-green-600">Sent</p>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </CollapsibleContent>
            </Card>
        </Collapsible>
    );
};

export default function MessagesPage() {
    return (
        <AppLayout pageTitle="Message Campaigns">
            <div className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Campaign Messages</CardTitle>
                        <CardDescription>
                            Here are the official messages from the campaign office. Expand a message to send it to your network.
                        </CardDescription>
                    </CardHeader>
                </Card>
                {mockMessages.map(msg => (
                    <MessageCampaignCard key={msg.id} message={msg} allContacts={mockContacts} />
                ))}
            </div>
        </AppLayout>
    );
}
