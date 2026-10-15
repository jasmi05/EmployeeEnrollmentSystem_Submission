
import { X, Pencil, Mail, Phone, MapPin, Briefcase, CalendarDays, UserRound } from "lucide-react";

function Detail({ icon: Icon, label, value }) {
  return (
    <div className="flex gap-3 rounded-xl border border-[#29293d] bg-white/[0.02] p-3">
      <div className="mt-0.5 text-violet-300"><Icon size={17} /></div>
      <div className="min-w-0">
        <p className="text-xs text-[#9290a9]">{label}</p>
        <p className="mt-1 break-words text-sm text-[#eeecfb]">{value || "Not provided"}</p>
      </div>
    </div>
  );
}

export default function EmployeeDetails({ employee, onClose, onEdit }) {
  if (!employee) return null;

  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <section
        role="dialog"
        aria-modal="true"
        aria-label="Employee details"
        onClick={(event) => event.stopPropagation()}
        className="h-full w-full max-w-lg overflow-y-auto border-l border-[#34344a] bg-[#11111e] shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-[#29293d] p-5">
          <p className="font-semibold">Employee profile</p>
          <button onClick={onClose} className="rounded-lg p-2 text-[#9290a9] hover:bg-white/5" aria-label="Close profile">
            <X size={20} />
          </button>
        </div>

        <div className="p-5 sm:p-7">
          <div className="rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/15 via-[#171529] to-[#11111e] p-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-400/20 text-2xl font-bold text-violet-200">
              {employee.name.split(" ").map((part) => part[0]).slice(0, 2).join("").toUpperCase()}
            </div>
            <h2 className="mt-4 text-2xl font-semibold">{employee.name}</h2>
            <p className="mt-1 text-sm text-[#aaa8c0]">{employee.jobTitle}</p>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-white/5 px-3 py-1.5 text-xs text-[#c6c4d8]">{employee.id}</span>
              <span className="rounded-lg bg-violet-400/10 px-3 py-1.5 text-xs text-violet-200">{employee.status}</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold">Personal information</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <Detail icon={Mail} label="Email address" value={employee.email} />
              <Detail icon={Phone} label="Phone number" value={employee.phone} />
              <Detail icon={CalendarDays} label="Date of birth" value={employee.dob} />
              <Detail icon={MapPin} label="Address" value={employee.address} />
              <Detail icon={Phone} label="Emergency contact" value={employee.emergencyContact} />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold">Employment information</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <Detail icon={Briefcase} label="Department" value={employee.department} />
              <Detail icon={UserRound} label="Employment type" value={employee.employmentType} />
              <Detail icon={CalendarDays} label="Joining date" value={employee.joiningDate} />
            </div>
          </div>

          <button onClick={() => onEdit(employee)} className="primary-btn mt-6 w-full">
            <Pencil size={16} /> Edit employee details
          </button>
        </div>
      </section>
    </div>
  );
}
