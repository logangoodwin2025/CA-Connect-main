
"use client";

import { Suspense } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import type { Relationship, SupportLikelihood } from "@/lib/types";
import { Check, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const relationships: Relationship[] = ['Family', 'Friend', 'Colleague', 'Neighbor', 'Acquaintance', 'Other'];
const supportLevels: { level: SupportLikelihood, emoji: string }[] = [
    { level: 'High', emoji: '😊' },
    { level: 'Medium', emoji: '😐' },
    { level: 'Low', emoji: '☹️' },
    { level: 'Unsure', emoji: '❓' }
];

function AddContactPageContent() {
    const [searchResult, setSearchResult] = useState<boolean>(false);
    const [selectedRelationship, setSelectedRelationship] = useState<Relationship | null>(null);
    const [selectedSupport, setSelectedSupport] = useState<SupportLikelihood | null>(null);
    const searchParams = useSearchParams();
    const role = searchParams.get('role') || 'campaigner';

    const handleSearch = () => {
        // Simulate finding a user
        setSearchResult(true);
    };

    return (
        <AppLayout pageTitle="Add Your Contacts">
            <div className="max-w-2xl mx-auto space-y-6">
                <Link href={`/contacts?role=${role}`} className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to My Network
                </Link>

                <Card>
                    <CardHeader>
                        <CardTitle>Search Member Database</CardTitle>
                        <CardDescription>Search for a member by their phone number or membership ID.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="search-contact">Phone Number or Member ID</Label>
                            <Input id="search-contact" placeholder="Search by phone number or member ID" />
                        </div>
                        <Button className="w-full" onClick={handleSearch}>Search</Button>
                    </CardContent>
                </Card>

                {searchResult && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Tag This Contact</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <h3 className="text-sm font-medium mb-2 text-muted-foreground">Search Result</h3>
                                <div className="flex items-center p-3 border rounded-md bg-muted/50">
                                    <Check className="h-5 w-5 mr-3 text-green-600" />
                                    <div>
                                        <p className="font-semibold">Rajesh Kumar</p>
                                        <p className="text-sm text-muted-foreground">CA123456 • Mumbai, Maharashtra</p>
                                    </div>
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-2">
                                <Label htmlFor="organization">Organization Name</Label>
                                <Input id="organization" placeholder="Enter organization name" />
                            </div>

                            <div>
                                <h3 className="text-sm font-medium mb-2">Relationship (Required)</h3>
                                <div className="flex flex-wrap gap-2">
                                    {relationships.map(rel => (
                                        <Button key={rel} variant={selectedRelationship === rel ? 'default' : 'outline'} onClick={() => setSelectedRelationship(rel)}>{rel}</Button>

                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium mb-2">Support Likelihood (Required)</h3>
                                <div className="flex flex-wrap gap-2">
                                    {supportLevels.map(sup => (
                                        <Button key={sup.level} variant={selectedSupport === sup.level ? 'default' : 'outline'} onClick={() => setSelectedSupport(sup.level)}>
                                            {sup.emoji} {sup.level}
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium mb-2">Can Influence Others?</h3>
                                <div className="flex flex-wrap gap-2">
                                    <Button variant='outline'>Yes</Button>
                                    <Button variant='outline'>No</Button>
                                    <Button variant='outline'>Maybe</Button>
                                </div>
                            </div>

                            <Separator />
                            <Link href={`/contacts?role=${role}`} className="w-full">
                                <Button className="w-full" size="lg">Add to My Network</Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}

export default function AddContactPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AddContactPageContent />
        </Suspense>
    );
}
