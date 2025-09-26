
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CampaignLogo } from "@/components/icons";
import { ArrowRight } from "lucide-react";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 glass-subtle">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4">
              <CampaignLogo className="h-20 w-20 text-primary" />
            </div>
            <CardTitle className="text-3xl">CA Connect</CardTitle>
            <CardDescription>
              Select your role to continue to the portal.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard?role=candidate" className="w-full">
              <Button className="w-full h-12 text-base font-medium" variant="default">
                Login as Candidate
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/dashboard?role=campaigner" className="w-full">
               <Button className="w-full h-12 text-base font-medium" variant="secondary">
                 Login as Campaigner
                 <ArrowRight className="ml-2 h-5 w-5" />
               </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
