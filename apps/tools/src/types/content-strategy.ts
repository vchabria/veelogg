export type StrategyFlowId = "workbook" | "content-therapy" | "quarterly-reset";

export interface StrategySession {
  id: string;
  user_id: string;
  flow: StrategyFlowId;
  status: "in_progress" | "completed";
  responses: Record<string, unknown>;
  current_step: number;
  summary: string | null;
  created_at: string;
  updated_at: string;
}

export interface ContentPillar {
  name: string;
  goal: string;
  style: string;
  hook: string;
}

export interface WorkbookData {
  barriers: {
    current: string;
  };
  mission: {
    longTermGoals: string;
    targetAudience: string;
    problemsYouSolve: string;
    audienceTraits: string;
    missionStatement: string;
    creatorName: string;
    platform: string;
    contentAbout: string;
    helpsWho: string;
    helpsWithProblems: string;
  };
  brand: {
    reputation: string;
    audienceFeeling: string;
    uniqueIdentifiers: string;
    oneLiners: string;
  };
  strategy: {
    contentGoals: string[];
    customGoals: string;
    pillars: [ContentPillar, ContentPillar, ContentPillar];
    platforms: string[];
    postingStrategy: string;
    otherStrategies: string;
  };
  audit: {
    strengths: string;
    opportunities: string;
  };
}

export interface StrategyQuestion {
  id: string;
  partIndex: number;
  partLabel: string;
  text: string;
  placeholder: string;
}

export interface StrategyFlow {
  id: StrategyFlowId;
  name: string;
  tagline: string;
  description: string;
  parts: string[];
  questions: StrategyQuestion[];
}
