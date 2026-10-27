import Link from "next/link";
import { etb, when } from "@/lib/format";

function getSortHref(sort, page = 1) {
  return `/orders?sort=${sort}&page=${page}`;
}

export default function OrderTable({ rows, sort, page, totalPages, totalRows }) {
  const sortOptions = [
    { value: "date-desc", label: "Newest first" },
    { value: "date-asc", label: "Oldest first" },
    { value: "amount-desc", label: "Highest total" },
    { value: "amount-asc", label: "Lowest total" },
  ];

  return (
    <section className="table-panel">
      <div className="orders-toolbar">
        <div className="orders-toolbar-group">
          <strong>Sort by</strong>
          {sortOptions.map((option) => (
            <Link
              key={option.value}
              href={getSortHref(option.value, 1)}
              className={option.value === sort ? "sort-link is-active" : "sort-link"}
            >
              {option.label}
            </Link>
          ))}
        </div>

        <span className="rows-meta">
          {totalRows} rows
        </span>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Location</th>
              <th>Status</th>
              <th>Total</th>
              <th>Placed</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty-cell">
                  No orders match the current filter.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id}>
                  <td>
                    <div className="order-id-wrap">
                      <span className="order-id">#{row.id.slice(0, 8)}</span>
                    </div>
                  </td>
                  <td>{row.customer}</td>
                  <td>{row.city}</td>
                  <td>
                    <span className="status-pill">{row.status}</span>
                  </td>
                  <td>{etb(row.total)}</td>
                  <td><time dateTime={row.date}>{when(row.date, { dateStyle: "medium", timeStyle: undefined })}</time></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pager" aria-label="Table pagination">
        <Link
          href={getSortHref(sort, Math.max(1, page - 1))}
          className={page === 1 ? "pager-btn disabled" : "pager-btn"}
          aria-disabled={page === 1}
        >
          Previous
        </Link>

        <span className="pager-meta">
          Page {page} of {totalPages}
        </span>

        <Link
          href={getSortHref(sort, Math.min(totalPages, page + 1))}
          className={page === totalPages ? "pager-btn disabled" : "pager-btn"}
          aria-disabled={page === totalPages}
        >
          Next
        </Link>
      </div>
    </section>
  );
}
