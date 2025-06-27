"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function DonorDashboard() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            console.log("Donor Session Data:", session);
        }
    }, [session, status]);

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-600 text-lg">
                Loading your donor dashboard...
            </div>
        );
    }

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-screen text-red-600 text-lg">
                You are not signed in.
            </div>
        );
    }

    const decoded = (session as any).decodedIdToken as {
        given_name?: string;
        family_name?: string;
        birthdate?: string;
        email?: string;
        roles?: string[];
    };

    const name = `${decoded.given_name ?? ""} ${decoded.family_name ?? ""}`.trim();
    const birthdate = decoded.birthdate ?? "N/A";
    const email = decoded.email ?? "N/A";
    const role = decoded.roles?.[0] ?? "N/A";

    return (
        <div className="min-h-screen bg-gradient-to-br from-white to-red-50 flex items-center justify-center px-4 py-8">
            <div className="bg-white/80 backdrop-blur-md shadow-lg rounded-xl p-6 w-full max-w-sm border border-gray-200">
                <h1 className="text-xl font-semibold text-red-600 mb-4 text-center">
                    Donor Dashboard
                </h1>
                <div className="space-y-3 text-gray-700 text-sm">
                    <div>
                        <span className="font-medium text-gray-900">Name: </span>
                        {name || "N/A"}
                    </div>
                    <div>
                        <span className="font-medium text-gray-900">Birthday: </span>
                        {birthdate}
                    </div>
                    <div>
                        <span className="font-medium text-gray-900">Email: </span>
                        {email}
                    </div>
                    <div>
                        <span className="font-medium text-gray-900">Role: </span>
                        {role}
                    </div>
                </div>
            </div>
        </div>
    );
}
