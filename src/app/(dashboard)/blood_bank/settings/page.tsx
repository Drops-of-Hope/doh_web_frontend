import React from "react";
import { HelpCircle, Users, Droplet, Folder, Pencil, KeyRound, User, Headset, Bug, NotebookText } from "lucide-react";

const settingsSections = [
  {
    title: "User Management",
    tasks: [
      { title: "Add New User", icon: <User className="w-6 h-6 text-white" /> },
      { title: "Assign User Roles", icon: <Users className="w-6 h-6 text-white" /> },
      { title: "Edit or Deactivate Users", icon: <Pencil className="w-6 h-6 text-white" /> },
      { title: "View Login History", icon: <KeyRound className="w-6 h-6 text-white" /> },
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
    ],
  },
  {
    title: "Help & Support",
    tasks: [
      { title: "Contact Support", icon: <Headset className="w-6 h-6 text-white" /> },
      { title: "Report Bug", icon: <Bug className="w-6 h-6 text-white" /> },
      { title: "FAQ", icon: <HelpCircle className="w-6 h-6 text-white" /> },
      { title: "User Guide / Onboarding Tour", icon: <NotebookText className="w-6 h-6 text-white" /> },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="p-6">
      {settingsSections.map((section, idx) => (
        <div key={idx} className="mb-10 bg-white p-6 rounded-2xl shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 font-Helvetica">{section.title}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
            {section.tasks.map((task, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-sm hover:bg-slate-100 transition-shadow p-8 flex items-center gap-4"
              >
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    section.title === "Blood Unit Configuration" 
                      ? "bg-[#CE121A]" 
                      : section.title === "User Management"
                      ? "bg-blue-400"
                      : section.title === "Help & Support"
                      ? "bg-gray-400"
                      : "bg-[#FB7373]"
                  }`}
                >
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