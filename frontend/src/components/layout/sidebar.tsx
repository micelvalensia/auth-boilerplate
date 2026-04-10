"use client";

import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
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
  ChevronDown,
  ChevronRight,
  Database,
  Home,
  Inbox,
  LogOutIcon,
  Settings,
  User,
  Wrench,
  XIcon,
} from "lucide-react";
import { useAuth } from "@/domain/auth/hooks/useAuth";
import { Avatar, AvatarFallback } from "../ui/avatar";

export function SidebarApp() {
  const { open, setOpen } = useSidebar();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { user, logout } = useAuth();

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
                onClick={() => {
                  if (!open) {
                    setOpen(true);
                  }
                  setSelectedIndex(index);
                }}
                className={`${
                  selectedIndex === index ? "bg-gray-200" : ""
                } rounded-lg`}
              >
                <SidebarMenuButton asChild>
                  <a href={item.url} className="flex items-center">
                    <item.icon size={18} />
                    <span>{item.title}</span>
                    {item.child.length > 0 ? (
                      <span className="items-end ml-auto transition-all duration-300 ease-in-out">
                        <ChevronRight
                          size={18}
                          className={`transition-transform duration-300 ${
                            selectedIndex === index ? "rotate-90" : "rotate-0"
                          }`}
                        />
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
        className={`absolute w-64 -left-50 h-full bg-gray-50 -z-10 transition-all duration-300 ${selectedItem && selectedItem.child.length > 0 ? "left-64 opacity-100" : "opacity-0"}`}
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="w-full h-12 px-3">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <Avatar className="h-8 w-8 rounded-full">
                  <AvatarFallback className="rounded-full">
                    {user?.data?.username[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left min-w-0">
                  <div className="text-sm font-medium truncate">
                    {user?.data?.username}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">
                    {user?.data?.email}
                  </div>
                </div>
              </div>
              <LogOutIcon size={18} onClick={logout} />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
