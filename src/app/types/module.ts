export interface Module {
    id: number;
    isVisible: boolean;
    moduleName: string;
    path: string;
    icon: string;
    registerDate?: string;
    moduleProfiles?: string[];
    selected?: boolean;
  }
  