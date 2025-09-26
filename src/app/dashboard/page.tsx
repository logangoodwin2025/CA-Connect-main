
'use client';

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { mockUser, mockContacts, mockMessages, secondLevelNetworks } from "@/lib/data";
import { PlusCircle, MessageSquare, AlertTriangle, Users, Send, CheckCircle, UserPlus, Gem, HelpCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import * as RechartsPrimitive from "recharts";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Line } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { Contact, Relationship } from "@/lib/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";


function CampaignerDashboard() {
    const latestContacts = mockContacts.slice(0, 3);
    const latestMessage = mockMessages[0];
    const totalContacts = mockContacts.length;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome!</CardTitle>
                    <CardDescription>You have {totalContacts} contacts in your network.</CardDescription>
                </CardHeader>
            </Card>

            <section>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" />
                                My Network
                            </CardTitle>
                            <Link href="/contacts?role=campaigner">
                                <Button variant="outline" size="sm">View All</Button>
                            </Link>
                            </div>
                            <CardDescription>Your most recently added contacts.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-3">
                            {latestContacts.map(contact => (
                            <div key={contact.id} className="flex items-center gap-3">
                                <Avatar className="h-9 w-9">
                                <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                <p className="font-semibold text-sm">{contact.name}</p>
                                <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                                </div>
                                <Badge variant={contact.support === 'High' ? 'default' : 'secondary'}>{contact.support}</Badge>
                            </div>
                            ))}
                        </CardContent>
                        <CardFooter>
                            <Link href="/contacts/add?role=campaigner" className="w-full">
                            <Button className="w-full">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add a Contact
                            </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                    
                    <Card className="flex flex-col">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <MessageSquare className="h-5 w-5" />
                                    Message Center
                                </CardTitle>
                                <Link href="/messages?role=campaigner">
                                    <Button variant="outline" size="sm">View All</Button>
                                </Link>
                            </div>
                            <CardDescription>The latest message template available for you to send.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow space-y-2">
                            <p className="font-semibold text-sm">{latestMessage.title}</p>
                            <p className="text-xs text-muted-foreground">From: {latestMessage.from} • {latestMessage.received}</p>
                            <p className="text-sm text-muted-foreground line-clamp-3">{latestMessage.content}</p>
                        </CardContent>
                        <CardFooter>
                            <Link href="/messages?role=campaigner" className="w-full">
                            <Button className="w-full">
                                <Send className="mr-2 h-4 w-4" />
                                Send a Message
                            </Button>
                            </Link>
                        </CardFooter>
                    </Card>
                </div>
            </section>

            <Alert className="bg-accent/20 border-accent/50 text-accent-foreground">
                <AlertTriangle className="h-4 w-4 !text-accent-foreground" />
                <AlertTitle>Polling Day Alert!</AlertTitle>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <AlertDescription className="flex-grow">
                    Starts in 5 days. Prepare your network.
                    </AlertDescription>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">Set Reminder</Button>
                </div>
            </Alert>
        </div>
    );
};

function CandidateDashboard() {
    const directContacts = mockContacts;
    const indirectContacts = Object.values(secondLevelNetworks).flat();
    const allContacts = [...directContacts, ...indirectContacts];
    
    const totalNetworkReach = 4387;
    const activeMembers = 639;
    const highSupport = 1245;
    const mediumSupport = 2378;
    const lowSupport = allContacts.filter(c => c.support === 'Low').length;
    const unsureSupport = allContacts.filter(c => c.support === 'Unsure').length;

    const supportScore = (highSupport * 4) + (mediumSupport * 3) + (lowSupport * 1);

    const supportData = [
        { level: 'High', value: highSupport, fill: "hsl(var(--chart-1))" },
        { level: 'Medium', value: mediumSupport, fill: "hsl(var(--chart-2))" },
        { level: 'Low', value: lowSupport, fill: "hsl(var(--chart-3))" },
        { level: 'Unsure', value: unsureSupport, fill: "hsl(var(--chart-4))" },
    ];
    
    const relationshipData = (['Family', 'Friend', 'Colleague', 'Neighbor', 'Acquaintance', 'Other'] as Relationship[]).map((rel, i) => ({
        relationship: rel,
        value: allContacts.filter(c => c.relationship === rel).length * (Math.floor(Math.random() * 20) + 5), // Make numbers more interesting
        fill: `hsl(var(--chart-${(i % 5) + 1}))`
    }));

    const supportScoreTrendData = [
        { date: 'Sep 20', score: 4000 },
        { date: 'Sep 21', score: 5400 },
        { date: 'Sep 22', score: 6200 },
        { date: 'Sep 23', score: 6500 },
        { date: 'Sep 24', score: 9700 },
        { date: 'Sep 25', score: 12115 },
    ];


    const supportChartConfig = {
        value: { label: 'Contacts' },
        level: { label: 'Support Level' },
    };
    
    const relationshipChartConfig = {
        value: { label: 'Contacts' },
        relationship: { label: 'Relationship' },
    };

    const supportScoreTrendConfig = {
        score: { label: "Support Score", color: "hsl(var(--chart-1))" },
    };

    return (
        <TooltipProvider>
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Welcome {mockUser.name}!</CardTitle>
                    <CardDescription>Here is the performance overview of your entire network.</CardDescription>
                </CardHeader>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Network Reach</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalNetworkReach.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Direct & Indirect Contacts</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Members</CardTitle>
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{activeMembers.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">Members who joined the app</p>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
                 <Card>
                    <CardHeader>
                         <CardTitle className="text-sm font-medium flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Gem className="h-4 w-4 text-primary" />
                                Support Score
                            </div>
                             <Tooltip delayDuration={100}>
                                <TooltipTrigger asChild>
                                    <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                                </TooltipTrigger>
                                <TooltipContent className="max-w-xs text-sm p-3 bg-card border-border shadow-lg">
                                    <div className="font-bold mb-2">How is this calculated?</div>
                                    <p>
                                        This score represents the overall support strength of your network, weighted by likelihood:
                                    </p>
                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li><span className="font-semibold">High Support:</span> 4 points each</li>
                                        <li><span className="font-semibold">Medium Support:</span> 3 points each</li>
                                        <li><span className="font-semibold">Low Support:</span> 1 point each</li>
                                    </ul>
                                </TooltipContent>
                            </Tooltip>
                        </CardTitle>
                        <div className="text-3xl font-bold text-primary pt-2">{supportScore.toLocaleString()}</div>
                    </CardHeader>
                    <CardContent className="-mt-4">
                        <ChartContainer config={supportScoreTrendConfig} className="min-h-[160px] w-full">
                            <ResponsiveContainer width="100%" height={160}>
                                <RechartsPrimitive.LineChart data={supportScoreTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
                                     <YAxis hide={true} domain={['dataMin - 1000', 'dataMax + 1000']} />
                                    <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                    <Line
                                        dataKey="score"
                                        type="monotone"
                                        stroke="hsl(var(--primary))"
                                        strokeWidth={2}
                                        dot={{ r: 4, fill: 'hsl(var(--primary))' }}
                                        activeDot={{ r: 6 }}
                                    />
                                </RechartsPrimitive.LineChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Support Likelihood</CardTitle>
                        <CardDescription>Breakdown of support across your entire network.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={supportChartConfig} className="min-h-[200px] w-full">
                            <ResponsiveContainer width="100%" height={200}>
                                <BarChart accessibilityLayer data={supportData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                                    <XAxis dataKey="level" tickLine={false} tickMargin={10} axisLine={false} />
                                    <YAxis tickFormatter={(value) => new Intl.NumberFormat('en-US', { notation: 'compact' }).format(value as number)} />
                                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                                    <Bar dataKey="value" radius={8} />
                                </BarChart>
                            </ResponsiveContainer>
                        </ChartContainer>
                    </CardContent>
                </Card>
            </div>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="h-5 w-5" />
                    Recent Direct Contacts
                  </CardTitle>
                  <Link href="/contacts?role=candidate">
                    <Button variant="outline" size="sm">View All</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockContacts.slice(0, 3).map(contact => (
                  <div key={contact.id} className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                      <p className="font-semibold text-sm">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">{contact.relationship}</p>
                    </div>
                    <Badge variant={contact.support === 'High' ? 'default' : 'secondary'}>{contact.support}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

        </div>
        </TooltipProvider>
    );
};


function DashboardPageContent() {
    const searchParams = useSearchParams();
    const role = searchParams.get('role') || 'campaigner';
    const isCandidate = role === 'candidate';

    return (
        <AppLayout pageTitle={isCandidate ? "Candidate Dashboard" : "Home"}>
            {isCandidate ? <CandidateDashboard /> : <CampaignerDashboard />}
        </AppLayout>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardPageContent />
        </Suspense>
    );
}

    

    
