
import { LayoutDashboard, Users, UserPlus, ClipboardList, X } from "lucide-react";

const links = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Employees", icon: Users },
  { label: "Enroll employee", icon: UserPlus },
  { label: "Enrollment review", icon: ClipboardList },
];

export default function Sidebar({ active, onNavigate, mobileOpen, onClose }) {
  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close navigation"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
        />
      )}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[240px] flex-col border-r border-white/[0.08] bg-[#15161a] p-5 transition-transform lg:translate-x-0 ${
        mobileOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-6">
          <div>
            <p className="font-semibold tracking-tight">
              Employee <span className="text-[#a79bed]">Enrollment</span>
            </p>
            <p className="mt-1 text-xs text-[#85858f]">People operations</p>
          </div>
          <button onClick={onClose} className="text-[#85858f] lg:hidden" aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <p className="mb-3 mt-7 px-2 text-xs text-[#85858f]">WORKSPACE</p>

        <nav className="space-y-1">
          {links.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => onNavigate(label)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm transition ${
                active === label
                  ? "bg-[#7666d8]/15 text-[#c5bbff]"
                  : "text-[#b1afb9] hover:bg-white/[0.04] hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/[0.08] pt-4">
          <p className="text-xs text-[#85858f]">Employee Enrollment System</p>
          <p className="mt-1 text-xs text-[#696973]">Workspace</p>
        </div>
      </aside>
    </>
  );
}
