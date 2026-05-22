import { useAuth } from "../features/auth/useAuth";
import { TranscribeDetailPanel } from "../features/logs/components/TranscribeDetailPanel";
import { TranscribeFiltersPanel } from "../features/logs/components/TranscribeFiltersPanel";
import { TranscribeLogList } from "../features/logs/components/TranscribeLogList";
import { useTranscribeData } from "../features/logs/hooks/useTranscribeData";
import { QueryErrorNotice } from "../shared/components/QueryErrorNotice";

export function TranscribePage() {
  const { signOut } = useAuth();
  const {
    companies,
    companiesQuery,
    logs,
    logsQuery,
    detail,
    detailQuery,
    company,
    onCompanyChange,
    filters,
    setFilters,
    onSearch,
    selectedCallSid,
    setSelectedCallSid,
  } = useTranscribeData();

  return (
    <main className="page-layout transcribe-shell">
      <header className="page-header page-hero">
        <div>
          <h1>AIC 書き起こし管理</h1>
        </div>
        <button type="button" onClick={() => void signOut()}>サインアウト</button>
      </header>

      <QueryErrorNotice errors={[companiesQuery.error, logsQuery.error, detailQuery.error]} />

      <section className="content-grid">
        <article className="panel">
          <TranscribeFiltersPanel
            companies={companies}
            company={company}
            filters={filters}
            onCompanyChange={onCompanyChange}
            onFiltersChange={setFilters}
            onSearch={onSearch}
          />
          <TranscribeLogList
            logs={logs}
            isLoading={logsQuery.isLoading}
            isFetching={logsQuery.isFetching}
            selectedCallSid={selectedCallSid}
            onSelectCallSid={setSelectedCallSid}
          />
        </article>

        <article className="panel">
          <TranscribeDetailPanel
            selectedCallSid={selectedCallSid}
            detail={detail}
            isLoading={detailQuery.isLoading}
            isFetching={detailQuery.isFetching}
          />
        </article>
      </section>
    </main>
  );
}
