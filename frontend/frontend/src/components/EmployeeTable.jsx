
import { Eye, Pencil, ChevronLeft, ChevronRight } from "lucide-react";

function initials(name) {
  return name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase();
}

export default function EmployeeTable({
  employees,
  onView,
  onEdit,
  onStatusChange,
  page,
  setPage,
  pageSize = 5,
}) {
  const pageCount = Math.max(1, Math.ceil(employees.length / pageSize));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * pageSize;
  const visibleEmployees = employees.slice(start, start + pageSize);

  const statusStyle = {
    Active: "bg-emerald-400/10 text-emerald-300",
    Pending: "bg-amber-400/10 text-amber-300",
    Inactive: "bg-rose-400/10 text-rose-300",
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[780px] text-left">
          <thead>
            <tr className="border-y border-[#29293d] bg-white/[0.015] text-[11px] uppercase tracking-wider text-[#9290a9]">
              <th className="px-5 py-4 font-medium">Employee</th>
              <th className="px-5 py-4 font-medium">Department</th>
              <th className="px-5 py-4 font-medium">Job title</th>
              <th className="px-5 py-4 font-medium">Joining date</th>
              <th className="px-5 py-4 font-medium">Status</th>
              <th className="px-5 py-4 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visibleEmployees.map((employee) => (
              <tr key={employee.id} className="border-b border-[#252538] last:border-0 hover:bg-white/[0.02]">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/30 to-indigo-500/20 text-xs font-bold text-violet-200">
                      {initials(employee.name)}
                    </div>
                    <div>
                      <p className="font-medium text-[#f4f3ff]">{employee.name}</p>
                      <p className="mt-1 text-xs text-[#9290a9]">{employee.email}</p>
                      <p className="mt-1 text-[10px] text-[#77758c]">{employee.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4 text-sm text-[#c6c4d8]">{employee.department}</td>
                <td className="px-5 py-4 text-sm text-[#c6c4d8]">{employee.jobTitle}</td>
                <td className="px-5 py-4 text-sm text-[#aaa8c0]">
                  {employee.joiningDate
                    ? new Date(`${employee.joiningDate}T00:00:00`).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "—"}
                </td>
                <td className="px-5 py-4">
                  <select
                    value={employee.status}
                    onChange={(event) => onStatusChange(employee.id, event.target.value)}
                    aria-label={`Change status for ${employee.name}`}
                    className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none ${statusStyle[employee.status] || statusStyle.Pending}`}
                  >
                    <option value="Active">Active</option>
                    <option value="Pending">Pending</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end gap-1">
                    <button onClick={() => onView(employee)} title="View employee" aria-label={`View ${employee.name}`} className="rounded-lg p-2 text-[#aaa8c0] hover:bg-violet-400/10 hover:text-violet-300">
                      <Eye size={17} />
                    </button>
                    <button onClick={() => onEdit(employee)} title="Edit employee" aria-label={`Edit ${employee.name}`} className="rounded-lg p-2 text-[#aaa8c0] hover:bg-violet-400/10 hover:text-violet-300">
                      <Pencil size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visibleEmployees.length === 0 && (
          <div className="px-6 py-14 text-center">
            <p className="font-medium">No employees found</p>
            <p className="mt-1 text-sm text-[#9290a9]">Try another search or add an employee.</p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#252538] px-5 py-4">
        <p className="text-xs text-[#9290a9]">
          {employees.length === 0
            ? "No records"
            : `Showing ${start + 1}–${Math.min(start + pageSize, employees.length)} of ${employees.length} employees`}
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="secondary-btn !p-2 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="px-2 text-xs text-[#c6c4d8]">Page {currentPage} of {pageCount}</span>
          <button
            onClick={() => setPage(Math.min(pageCount, currentPage + 1))}
            disabled={currentPage === pageCount}
            className="secondary-btn !p-2 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
