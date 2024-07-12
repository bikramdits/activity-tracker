export interface FormValues {
  projectName: string;
  projectKey: string;
  department: string;
  client: string;
  description: string;
  budgetHours: number | null;
  startDate: string | null;
  endDate: string | null;
}
export interface DataItem {
  Name: string;
  'Key/Code': string;
  Client: string;
  'Created Date': string;
}

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  onSave: (formData: {
    organizationName?: string;
    clientCode?: string;
  }) => void;
  clientFormData?: {
    organizationName?: string | undefined;
    clientCode?: string | undefined;
  } | null;
}

export interface optionsData {
  value: string;
  label: string;
}

export interface UserData {
  id: number;
  Name: string;
  'Key/Code': string;
  Client: string;
  'Created Date': string;
}

export interface ClientFormData {
  organizationName: string;
  clientCode: string;
}


