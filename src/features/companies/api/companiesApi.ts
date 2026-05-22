import type { CompaniesResponseDto } from "../../../entities/transcribe/types";
import { requestJson } from "../../../shared/api/httpClient";
import { env } from "../../../shared/config/env";

function mapCompanyDtoToName(item: { company_name?: string; SK?: string }): string {
  const fromName = String(item.company_name ?? "").trim();
  if (fromName) {
    return fromName;
  }

  const sk = String(item.SK ?? "").trim();
  return sk.startsWith("CompanyName#") ? sk.split("#", 2)[1] || "" : "";
}

export async function fetchCompanies(token: string | null): Promise<string[]> {
  const data = await requestJson<CompaniesResponseDto>(`${env.apiBaseUrl}/edit/companies`, { token });
  const results = Array.isArray(data.results) ? data.results : [];

  const names = results.map(mapCompanyDtoToName).filter(Boolean);

  return [...new Set(names)].sort();
}
