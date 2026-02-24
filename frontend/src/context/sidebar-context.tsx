import { createContext, PropsWithChildren, useState } from "react";

type SidebarContextType = {
  isOpen: boolean;
  toggleOpen: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  return (
    <SidebarContext.Provider value={{ isOpen, toggleOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
