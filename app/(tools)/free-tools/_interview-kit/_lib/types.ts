export type InterviewKitInput = {
  job_title: string;
  job_description: string;

  // Optional fields for additional information
  seniority_level: string | null;
  departement_or_team: string | null;
  must_have_skills: string | null;
  interview_type: string | null;
  number_of_questions: number | null;
  difficulty_level: string | null;

  include_screening_questions: boolean; // defaults to true
  include_scoring_scorecard: boolean; // defaults to true
  include_red_flags?: boolean; // defaults to true
};




export type RoleSummary = {
  role_title: string;
  seniority: string;
  interview_type: string;
  assumptions: string[];
  core_competencies: string[];
};



export type ScreeningQuestion = {
  question: string;
  intent: string;
  strong_signal: string;
  follow_up: string;
};

export type InterviewQuestion = {
  competency: string;
  question: string;
  why_ask: string;
  strong_answer_signals: string[];
  follow_up_probe: string;
};

export type ScorecardItem = {
  criterion: string;
  weight_percent: number;
  what_to_look_for: string;
  score_1: string;
  score_5: string;
};



export type RecommendedInterviewFlowItem = {
  stage: string;
  duration_minutes: number;
  instructions: string;
};

export type InterviewKit = {
  role_summary: RoleSummary;
  screening_questions: ScreeningQuestion[];
  interview_questions: InterviewQuestion[];
  scorecard: ScorecardItem[];
  recommended_interview_flow: RecommendedInterviewFlowItem[];
  compliance_notes: string[];
  copyable_summary: string;
};