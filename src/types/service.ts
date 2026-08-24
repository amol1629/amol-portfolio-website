export interface Service {
  id: string;
  title: string;
  description: string;
  outcomes?: string[];
  icon: string;
}

export interface EngagementStep {
  step: number;
  title: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}
