export type CompanyDto = {
  company_name?: string;
  SK?: string;
};

export type CompaniesResponseDto = {
  results?: CompanyDto[];
};

export type LogSummaryDto = {
  callSid: string;
  company: string;
  startedAt: string;
  callFrom: string;
  minutes: number;
  status: string;
  memo?: string;
  inputPreview: string;
};

export type LogsResponseDto = {
  items?: LogSummaryDto[];
};

export type UserInputDto = {
  question_id: string;
  input: string;
  created_time: string;
};

export type InputPointDto = {
  question_id: string;
  created_time?: string;
  start_time?: number | string;
  end_time?: number | string;
  input?: string;
  success?: boolean;
};

export type LogHistoryDto = {
  call_sid: string;
  company: string;
  start_time: string;
  call_from: string;
  call_to: string;
  duration: string;
  minutes: number;
  status: string;
  user_status: string;
  memo: string;
  recording_url: string[];
  user_inputs: UserInputDto[];
  inputs_point: InputPointDto[];
  inputs_point_confirmed?: InputPointDto[];
};

export type LogDetailDto = {
  callSid: string;
  history: LogHistoryDto;
};

export type UserInput = {
  questionId: string;
  input: string;
  createdAt: string;
};

export type InputPoint = {
  questionId: string;
  createdAt?: string;
  startTime?: number | string;
  endTime?: number | string;
  input?: string;
  success?: boolean;
};

export type LogHistory = {
  callSid: string;
  company: string;
  startedAt: string;
  callFrom: string;
  callTo: string;
  duration: string;
  minutes: number;
  status: string;
  userStatus: string;
  memo: string;
  recordingUrls: string[];
  userInputs: UserInput[];
  inputPoints: InputPoint[];
};

export type LogSummary = {
  callSid: string;
  company: string;
  startedAt: string;
  callFrom: string;
  minutes: number;
  status: string;
  memo: string;
  inputPreview: string;
};

export type LogDetail = {
  callSid: string;
  history: LogHistory;
};

export type LogFilters = {
  startDate: string;
  endDate: string;
};
