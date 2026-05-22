import type { LogFilters } from "../../types/transcribe/domain.ts";

type TranscribeFiltersPanelProps = {
  companies: string[];
  company: string;
  filters: LogFilters;
  onCompanyChange: (nextCompany: string) => void;
  onFiltersChange: (nextFilters: LogFilters) => void;
  onSearch: () => void;
};

export function TranscribeFiltersPanel(props: TranscribeFiltersPanelProps) {
  return (
    <>
      <h2>通話ログ検索</h2>
      <section className="filters" aria-label="通話ログ検索条件">
        <div className="filter-block">
          <label>
            企業
            <select value={props.company} onChange={(event) => props.onCompanyChange(event.target.value)}>
              {props.companies.map((name) => (
                <option key={name} value={name}>{name}</option>
              ))}
            </select>
          </label>

          <div className="filter-date-grid">
            <label>
              開始日
              <input
                type="date"
                value={props.filters.startDate}
                onChange={(event) =>
                  props.onFiltersChange({
                    ...props.filters,
                    startDate: event.target.value,
                  })
                }
              />
            </label>

            <label>
              終了日
              <input
                type="date"
                value={props.filters.endDate}
                onChange={(event) =>
                  props.onFiltersChange({
                    ...props.filters,
                    endDate: event.target.value,
                  })
                }
              />
            </label>
          </div>
          <button className="search-button" type="button" onClick={props.onSearch}>検索</button>
        </div>
      </section>
    </>
  );
}
