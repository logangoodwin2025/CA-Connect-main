
'use client';
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { mockUser } from "@/lib/data";


export default function SettingsPage() {
    
  return (
    <AppLayout pageTitle="Settings">
        <div className="max-w-4xl mx-auto space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>My Profile</CardTitle>
                    <CardDescription>Manage your personal information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" defaultValue={mockUser.name} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" defaultValue="+91 98765 43210" disabled />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="member-id">CA Member ID</Label>
                        <Input id="member-id" defaultValue="CA123456" disabled />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Control how you receive alerts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="new-message" className="flex flex-col space-y-1">
                            <span>New Message Alerts</span>
                            <span className="font-normal leading-snug text-muted-foreground">
                                Get notified when a new campaign message is available.
                            </span>
                        </Label>
                        <Switch id="new-message" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between space-x-2">
                        <Label htmlFor="polling-alert" className="flex flex-col space-y-1">
                            <span>Polling Day Alerts</span>
                             <span className="font-normal leading-snug text-muted-foreground">
                                Receive urgent reminders on polling day.
                            </span>
                        </Label>
                        <Switch id="polling-alert" defaultChecked />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Account</CardTitle>
                    <CardDescription>Manage your account settings.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button variant="destructive">Logout</Button>
                </CardContent>
            </Card>
        </div>
    </AppLayout>
  );
}
