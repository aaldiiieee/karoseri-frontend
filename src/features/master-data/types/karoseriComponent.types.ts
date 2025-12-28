export interface Component {
  id: string;
  componentCode: string;
  componentName: string;
  category: string;
  description: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ComponentCreate {
  componentCode: string;
  componentName: string;
  category: string;
  description?: string;
  isActive?: boolean;
}

export interface ComponentUpdate {
  componentCode?: string;
  componentName?: string;
  category?: string;
  description?: string;
  isActive?: boolean;
}

export interface ComponentList {
  items: Component[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface ComponentFilters {
  page?: number;
  size?: number;
  category?: string;
  isActive?: boolean;
  search?: string;
}
