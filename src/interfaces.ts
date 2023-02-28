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
export type Rules = {
  actions: Action[];
  deities: any[];
  traits: any[];
}