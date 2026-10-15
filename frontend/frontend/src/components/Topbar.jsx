
import { Bell, Menu, Search, Plus } from "lucide-react";

export default function Topbar({ search, setSearch, onAdd, onMenu }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#252538] px-4 py-4 sm:px-7 lg:px-9">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <button onClick={onMenu} className="text-[#aaa8c0] lg:hidden" aria-label="Open menu">
          <Menu size={22} />
        </button>
        <div className="relative w-full max-w-[360px]">
          <Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#77758c]" />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="field !pl-11 text-sm"
            placeholder="Search employees..."
            aria-label="Search employees"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="relative rounded-xl border border-[#34344a] p-2.5 text-[#aaa8c0] hover:bg-white/5"
          aria-label="Notifications"
          title="Notifications"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-400" />
        </button>
        <button onClick={onAdd} className="primary-btn text-sm">
          <Plus size={17} />
          <span className="hidden sm:inline">Add employee</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </header>
  );
}
