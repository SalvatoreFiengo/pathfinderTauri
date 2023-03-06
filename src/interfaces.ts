export type Action = {
  id: string;
  actions: number;
  category: string;
  description: string;
  name: string
  requirements: string;
  rules: [];
  traits: string[];
  type: string;
}

export type Deities = {
  id: string;
  description: string;
  name: string
}

export type Traits = {
  id: string;
  description: string;
  isHidden: number;
  isImportant: number;
  name: string;
}

export type Rules = {
  actions?: Action[];
  deities?: Deities[];
  traits?: Traits[];
}