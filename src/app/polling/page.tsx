
'use client';
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { mockContacts } from "@/lib/data";
import { Phone, MessageCircle, RefreshCw, AlertOctagon, Users, UserCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Contact } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

const ContactActionCard = ({ contact }: { contact: Contact }) => (
    <div className="border rounded-lg p-3 hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between mb-2">
            <div>
                <p className="font-semibold text-sm">{contact.name}</p>
                <p className="text-xs text-muted-foreground">{contact.relationship}</p>
            </div>
             {contact.support === 'High' && <Badge variant="destructive" className="text-xs">HIGH PRIORITY</Badge>}
            {contact.support === 'Medium' && <Badge className="bg-amber-500 text-black hover:bg-amber-500/90 text-xs">MEDIUM PRIORITY</Badge>}
        </div>
        <div className="flex gap-2 mt-2">
            <Button variant="outline" size="sm" className="w-full text-xs h-8"><Phone className="mr-1.5 h-3 w-3" />Call</Button>
            <Button size="sm" className="w-full text-xs h-8"><MessageCircle className="mr-1.5 h-3 w-3" />Message</Button>
        </div>
    </div>
);

const PriorityTabContent = ({ contacts }: { contacts: Contact[] }) => {
    if (contacts.length === 0) {
        return (
            <div className="flex items-center justify-center h-40 text-muted-foreground bg-muted/50 rounded-lg">
                <p>No contacts in this category.</p>
            </div>
        )
    }
    return (
        <ScrollArea className="h-60">
            <div className="space-y-2 p-1">
                {contacts.map(contact => <ContactActionCard key={contact.id} contact={contact} />)}
            </div>
        </ScrollArea>
    );
};

const KpiCard = ({ title, value, description, icon }: { title: string, value: string, description: string, icon: React.ReactNode }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            {icon}
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
);


export default function PollingPage() {
  // Overall constituency data (mock)
  const overallTotalVoters = 150000;
  const overallVotedCount = 67500;
  const overallTurnout = (overallVotedCount / overallTotalVoters) * 100;
  
  // Network data
  const networkTotal = mockContacts.length;
  const networkVotedCount = mockContacts.filter(c => c.pollingStatus === 'Voted').length;
  const networkTurnout = (networkVotedCount / networkTotal) * 100;
  const networkNotVoted = mockContacts.filter(c => c.pollingStatus === 'Not Voted Yet');
  
  const highPriorityNotVoted = networkNotVoted.filter(c => c.support === 'High');
  const mediumPriorityNotVoted = networkNotVoted.filter(c => c.support === 'Medium');
  const lowPriorityNotVoted = networkNotVoted.filter(c => ['Low', 'Unsure'].includes(c.support));


  return (
    <AppLayout pageTitle="Polling Day - LIVE">
        <div className="space-y-6">
            <Alert className="bg-accent/20 border-accent/50 text-accent-foreground">
                <AlertOctagon className="h-4 w-4 !text-accent-foreground" />
                <AlertTitle className="text-accent-foreground/90">Live Polling Day Tracker</AlertTitle>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <AlertDescription className="flex-grow">Data refreshes periodically to show real-time status.</AlertDescription>
                    <Button variant="ghost" size="sm" className="w-full sm:w-auto self-start sm:self-center"><RefreshCw className="mr-2 h-4 w-4"/>Refresh Now</Button>
                </div>
            </Alert>
            
            <div className="grid gap-4 md:grid-cols-2">
               <KpiCard 
                    title="Overall Turnout"
                    value={`${overallTurnout.toFixed(1)}%`}
                    description={`${overallVotedCount.toLocaleString()} / ${overallTotalVoters.toLocaleString()} voted`}
                    icon={<Users className="h-4 w-4 text-muted-foreground" />}
               />
               <KpiCard 
                    title="Network Turnout"
                    value={`${networkTurnout.toFixed(1)}%`}
                    description={`${networkVotedCount} / ${networkTotal} voted`}
                    icon={<UserCheck className="h-4 w-4 text-muted-foreground" />}
               />
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Action Center: Get Out The Vote</CardTitle>
                    <CardDescription>Contact members of your network who haven't voted yet. Start with High Priority.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="high">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="high" className="text-destructive font-bold">High ({highPriorityNotVoted.length})</TabsTrigger>
                            <TabsTrigger value="medium">Medium ({mediumPriorityNotVoted.length})</TabsTrigger>
                            <TabsTrigger value="low">Low ({lowPriorityNotVoted.length})</TabsTrigger>
                        </TabsList>
                        <TabsContent value="high" className="mt-4">
                            <PriorityTabContent contacts={highPriorityNotVoted} />
                        </TabsContent>
                        <TabsContent value="medium" className="mt-4">
                            <PriorityTabContent contacts={mediumPriorityNotVoted} />
                        </TabsContent>
                        <TabsContent value="low" className="mt-4">
                            <PriorityTabContent contacts={lowPriorityNotVoted} />
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
  );
}
