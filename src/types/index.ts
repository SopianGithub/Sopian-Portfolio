export interface Project {
  id: string;
  title: string;
  type: string;
  description: string;
  category: string;
  icon: string;
  iconBg: string;
  isFeatured: boolean;
  metrics: Metric[];
  features: Feature[];
  techStack: string[];
  actions: {
    primary: Action;
    secondary: Action;
  };
}

export interface Metric {
  number: string;
  label: string;
}

export interface Feature {
  text: string;
}

export interface Action {
  href: string;
  label: string;
} 