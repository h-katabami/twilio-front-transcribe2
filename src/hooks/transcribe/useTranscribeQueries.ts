import { useQuery } from "@tanstack/react-query";
import type { LogFilters } from "../../types/transcribe/domain.ts";
import { useApi } from "../useApi";
import { useProxyApi } from "../useProxyApi";

type UseTranscribeQueriesParams = {
  getToken: () => Promise<string | null>;
  appliedCompany: string;
  appliedFilters: LogFilters;
  selectedCallSid: string;
};

export function useCompaniesQuery(getToken: () => Promise<string | null>) {
  const { fetchCompanies } = useApi();

  return useQuery({
    queryKey: ["companies"] as const,
    queryFn: async () => fetchCompanies(await getToken()),
    staleTime: 5 * 60 * 1000,
  });
}

export function useTranscribeQueries(params: UseTranscribeQueriesParams) {
  const { fetchLogs, fetchLogDetail } = useProxyApi();
  const { getToken, appliedCompany, appliedFilters, selectedCallSid } = params;
  const hasAppliedCompany = Boolean(appliedCompany);
  const hasSelectedCallSid = Boolean(selectedCallSid);

  const logsQuery = useQuery({
    queryKey: ["logs", appliedCompany, appliedFilters.startDate, appliedFilters.endDate] as const,
    queryFn: async () => fetchLogs(await getToken(), appliedCompany, appliedFilters),
    enabled: hasAppliedCompany,
  });

  const detailQuery = useQuery({
    queryKey: ["logDetail", appliedCompany, selectedCallSid] as const,
    queryFn: async () => fetchLogDetail(await getToken(), appliedCompany, selectedCallSid),
    enabled: hasAppliedCompany && hasSelectedCallSid,
  });

  return {
    logsQuery,
    detailQuery,
    logs: logsQuery.data ?? [],
    detail: detailQuery.data,
  };
}