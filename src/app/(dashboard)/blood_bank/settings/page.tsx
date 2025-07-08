import React from "react";
import { HelpCircle, Users, Droplet, Folder } from "lucide-react";

const settingsSections = [
  {
    title: "User Management",
    tasks: [
      { title: "Add New User", icon: <Users className="w-6 h-6 text-white" /> },
      { title: "Assign User Roles", icon: <Users className="w-6 h-6 text-white" /> },
      { title: "Edit or Deactivate Users", icon: <Users className="w-6 h-6 text-white" /> },
      { title: "View Login History", icon: <Users className="w-6 h-6 text-white" /> },
    ],
  },
  {
    title: "Blood Unit Configuration",
    tasks: [
      { title: "Expiry Policy", icon: <Droplet className="w-6 h-6 text-white" /> },
    ],
  },
  {
    title: "Data Management",
    tasks: [
      { title: "Import/Export Data", icon: <Folder className="w-6 h-6 text-white" /> },
      { title: "Auto-deletion Settings", icon: <Folder className="w-6 h-6 text-white" /> },
    ],
  },
  {
    title: "Help & Support",
    tasks: [
      { title: "Contact Support", icon: <HelpCircle className="w-6 h-6 text-white" /> },
      { title: "Report Bug", icon: <HelpCircle className="w-6 h-6 text-white" /> },
      { title: "FAQ", icon: <HelpCircle className="w-6 h-6 text-white" /> },
      { title: "User Guide / Onboarding Tour", icon: <HelpCircle className="w-6 h-6 text-white" /> },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-8 text-black">Settings</h1>

      {settingsSections.map((section, idx) => (
        <div key={idx} className="mb-10 bg-gray-100 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 font-Helvetica">{section.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {section.tasks.map((task, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-8 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[#FB7373] flex items-center justify-center">
                  {task.icon}
                </div>
                <span className="text-base font-medium text-gray-800">
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
