"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "../ui/sidebar";
import {
  Activity,
  Building,
  ChevronRight,
  Database,
  Home,
  Inbox,
  Settings,
  User,
  Wrench,
  XIcon,
} from "lucide-react";

export function SidebarApp() {
  const { open } = useSidebar();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
      child: [
        {
          title: "Dashboard",
          icon: Database,
          desc: "Project overview and activity",
        },
        {
          title: "Activity",
          icon: Activity,
          desc: "Recent commit and changes",
        },
      ],
    },
    { title: "Inbox", url: "#", icon: Inbox, child: [] },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
      child: [
        {
          title: "Profile",
          icon: User,
          desc: "Personalize your profile",
        },
        {
          title: "Theme",
          icon: Wrench,
          desc: "Change to your fav theme",
        },
      ],
    },
  ];

  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  return (
    <Sidebar collapsible="icon" className="relative">
      <SidebarHeader className="p-4">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-center">
            {open ? "Teams" : <Building size={18} />}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <hr />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>

          <SidebarMenu>
            {items.map((item, index) => (
              <SidebarMenuItem
                key={item.title}
                onClick={() => setSelectedIndex(index)}
                className={`${
                  selectedIndex === index ? "bg-gray-200" : ""
                } rounded-lg`}
              >
                <SidebarMenuButton asChild>
                  <a href={item.url} className="flex items-center">
                    <>
                      <item.icon size={18} />
                      <span>{item.title}</span>
                    </>
                    {item.child.length > 0 ? (
                      <span className="items-end ml-auto">
                        <ChevronRight size={18} />
                      </span>
                    ) : null}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <div
        className={`absolute w-64 left-0 h-full bg-gray-50 -z-10 transition-all duration-300 ${selectedItem && selectedItem.child.length > 0 ? "left-64" : ""}`}
      >
        {selectedItem && selectedItem.child.length > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between p-4 items-center border-b">
              <span>Overview</span>
              <span
                onClick={() => setSelectedIndex(null)}
                className="cursor-pointer"
              >
                <XIcon />
              </span>
            </div>
            <div className="p-2 space-y-2">
              {selectedItem.child.map((child) => (
                <div
                  key={child.title}
                  className="flex items-center gap-2 text-sm p-2 rounded-md hover:bg-muted cursor-pointer"
                >
                  <child.icon size={16} />
                  <div>
                    <div className="font-medium">{child.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {child.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Sidebar>
  );
}
