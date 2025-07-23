"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function AuthCallbackPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            // Safely extract roles from session
            const roles = (session.user as { roles?: string[] }).roles ?? [];

            console.log("User roles:", roles);

            const rolePriority = ["Blood Bank", "Hospital", "IT Support", "donor", "selfsignup"] as const;
            const roleToPath: Record<typeof rolePriority[number], string> = {
                "Blood Bank": "/blood_bank",
                "Hospital": "/hospital",
                "IT Support": "/it_support",
                "donor": "/donor",
                "selfsignup" : "/donor"
            };

            for (const role of rolePriority) {
                if (roles.includes(role)) {
                    console.log("Redirecting to:", roleToPath[role]);
                    router.replace(roleToPath[role]);
                    return;
                }
            }

            // Fallback if no matching role
            router.replace("/");
        }
    }, [status, session, router]);

    return (
        <div className="flex flex-col items-center justify-center h-screen text-red-600 text-lg bg-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mb-4"></div>
            Redirecting you to your dashboard...
        </div>
    );
}
