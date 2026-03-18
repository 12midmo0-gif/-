export interface Experience {
  id: string;
  title: string;
  organization: string;
  period: string;
  roles: string[];
  achievements: string[];
  hrConnection: string;
}

export interface Competency {
  id: string;
  title: string;
  items: string[];
  hrConnection: string;
}

export interface GrowthPlan {
  shortTerm: string;
  midTerm: string;
  longTerm: string;
}

export interface PortfolioData {
  name: string;
  contact: string;
  aboutMe: {
    title: string;
    points: string[];
    summary: string;
  };
  competencies: Competency[];
  experiences: Experience[];
  jobFit: {
    title: string;
    points: string[];
    itContext: string;
  };
  growthPlan: GrowthPlan;
  closing: string;
}
