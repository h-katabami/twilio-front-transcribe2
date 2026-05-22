import { useMemo } from "react";
import { useAuth } from "../features/auth/AuthContext";
import { useTranscribeData } from "../features/logs/hooks/useTranscribeData";

function formatDateTime(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "-";
  }
  return date.toLocaleString("ja-JP");
}

function formatNumber(value: number): string {
  if (!Number.isFinite(value)) {
    return "-";
  }
  return value.toLocaleString("ja-JP");
}

function formatPointTime(value: string | number | undefined): string {
  if (value === undefined || value === null || value === "") {
    return "-";
  }

  const num = typeof value === "number" ? value : Number(value);
  if (Number.isFinite(num)) {
    return `${num.toFixed(2)}s`;
  }

  return String(value);
}

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
    setCompany,
    filters,
    setFilters,
    onSearch,
    selectedCallSid,
    setSelectedCallSid,
  } = useTranscribeData();

  const hasError = Boolean(companiesQuery.error || logsQuery.error || detailQuery.error);

  const selectedDetailPoints = useMemo(() => {
    if (!detail) return [];
    return Array.isArray(detail.history.inputPoints) ? detail.history.inputPoints : [];
  }, [detail]);

  return (
    <main className="page-layout transcribe-shell">
      <header className="page-header page-hero">
        <div>
          <h1>AIC 書き起こし管理</h1>
        </div>
        <button type="button" onClick={() => void signOut()}>サインアウト</button>
      </header>

      {hasError ? <p className="error-text">エラーが発生しました</p> : null}

      <section className="content-grid">
        <article className="panel">
          <h2>通話ログ検索</h2>
          <section className="filters">
            <label>
              企業
              <select value={company} onChange={(e) => { setCompany(e.target.value); setSelectedCallSid(""); }}>
                {companies.map((name) => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </label>

            <label>
              開始日
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters((prev) => ({ ...prev, startDate: e.target.value }))}
              />
            </label>

            <label>
              終了日
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters((prev) => ({ ...prev, endDate: e.target.value }))}
              />
            </label>

            <button className="search-button" type="button" onClick={onSearch}>検索</button>
          </section>

          <h2>ログ一覧 <span className="log-count">{logs.length}件</span></h2>
          {logsQuery.isFetching ? <p>読み込み中...</p> : null}
          {!logsQuery.isFetching && logs.length === 0 ? <p>対象データがありません。</p> : null}
          <ul className="log-list">
            {logs.map((log) => (
              <li key={log.callSid}>
                <button
                  type="button"
                  className={selectedCallSid === log.callSid ? "is-active" : ""}
                  onClick={() => setSelectedCallSid(log.callSid)}
                >
                  <strong>{formatDateTime(log.startedAt)}</strong>
                  <span className="log-row-meta">{log.status || "-"}</span>
                  <span className="log-row-meta">発信元: {log.callFrom || "-"}</span>
                  <span className="log-row-meta">通話時間: {formatNumber(log.minutes)} 分</span>
                </button>
              </li>
            ))}
          </ul>
        </article>

        <article className="panel">
          <h2>ログ詳細</h2>
          {!selectedCallSid ? <p>一覧からログを選択してください。</p> : null}
          {detailQuery.isFetching ? <p>読み込み中...</p> : null}
          {!detailQuery.isFetching && selectedCallSid && !detail ? <p>詳細データがありません。</p> : null}
          {detail ? (
            <div className="detail-wrap">
              <div className="detail-grid">
                <p><strong>Call SID:</strong> {detail.callSid}</p>
                <p><strong>開始:</strong> {formatDateTime(detail.history.startedAt)}</p>
                <p><strong>発信元:</strong> {detail.history.callFrom || "-"}</p>
                <p><strong>着信先:</strong> {detail.history.callTo || "-"}</p>
                <p><strong>ステータス:</strong> {detail.history.status || "-"}</p>
                <p><strong>ユーザー状態:</strong> {detail.history.userStatus || "-"}</p>
                <p><strong>通話時間:</strong> {formatNumber(detail.history.minutes)} 分</p>
                <p><strong>録音:</strong> {detail.history.recordingUrls.length > 0 ? "あり" : "なし"}</p>
              </div>

              {detail.history.recordingUrls.length > 0 ? (
                <p>
                  <a href={detail.history.recordingUrls[0]} target="_blank" rel="noreferrer">録音URLを開く</a>
                </p>
              ) : null}

              <h3>入力ポイント</h3>
              <ul className="point-list">
                {selectedDetailPoints.map((point, index) => (
                  <li key={`${point.questionId}-${index}`} className="point-item">
                    <p><strong>{point.questionId}</strong></p>
                    <p>入力: {point.input || "-"}</p>
                    <p>区間: {formatPointTime(point.startTime)} - {formatPointTime(point.endTime)}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>
      </section>
    </main>
  );
}
