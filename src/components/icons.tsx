import type { SVGProps } from "react";

export function CampaignLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10" />
      <path d="m14.5 12.5-4-4" />
      <path d="m10.5 16.5-4-4" />
      <path d="m18.5 8.5-4-4" />
    </svg>
  );
}
