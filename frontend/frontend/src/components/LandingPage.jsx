
import { ArrowRight, ClipboardCheck, Users, ShieldCheck } from "lucide-react";

export default function LandingPage({ onEnter }) {
  return (
    <div className="min-h-screen bg-[#101114] text-[#f1f0ed]">
      <header className="flex h-[76px] items-center justify-between border-b border-white/[0.08] px-5 sm:px-10 lg:px-16">
        <a href="#" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7666d8] text-sm font-bold text-white">
            E
          </div>
          <span className="font-semibold tracking-tight">
            Employee <span className="text-[#a79bed]">Enrollment</span>
          </span>
        </a>

        <button
          onClick={onEnter}
          className="rounded-lg border border-white/15 px-4 py-2.5 text-sm text-[#e4e1ef] transition hover:border-[#a79bed]/60 hover:bg-white/[0.04]"
        >
          Open workspace <ArrowRight className="ml-2 inline" size={15} />
        </button>
      </header>

      <main className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
        <section className="grid min-h-[570px] items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
          <div>
            <p className="mb-6 flex items-center gap-2 text-sm text-[#b4a9f2]">
              <span className="h-2 w-2 rounded-full bg-[#9c8de9]" />
              PEOPLE OPERATIONS
            </p>

            <h1 className="max-w-2xl text-4xl font-semibold leading-[1.13] tracking-tight sm:text-5xl lg:text-6xl">
              Good teams start with
              <span className="block text-[#a79bed]">organized people.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-[#aaa9b2]">
              One place to register employee details, keep records up to date,
              and review enrollment information without the paperwork getting
              in the way.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <button onClick={onEnter} className="rounded-lg bg-[#7666d8] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#8979e8]">
                Go to workspace <ArrowRight className="ml-2 inline" size={16} />
              </button>
              <a href="#about" className="rounded-lg border border-white/15 px-5 py-3 text-sm text-[#e4e1ef] transition hover:bg-white/[0.04]">
                About the system
              </a>
            </div>

            <p className="mt-8 text-xs text-[#777780]">
              Employee records · Enrollment · Status review
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-3xl bg-[#7666d8]/[0.06] blur-2xl" />
            <div className="relative rounded-2xl border border-white/10 bg-[#17181d] p-5 sm:p-7">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-5">
                <div>
                  <p className="text-sm font-medium">Employee records</p>
                  <p className="mt-1 text-xs text-[#85858f]">A simple view of your team</p>
                </div>
                <Users size={21} className="text-[#a79bed]" />
              </div>

              <div className="mt-5 space-y-3">
                {[
                  { initials: "AS", name: "Employee information", detail: "Personal and contact details" },
                  { initials: "EN", name: "Enrollment details", detail: "Department and job information" },
                  { initials: "RV", name: "Review and update", detail: "Keep employee records current" },
                ].map((item) => (
                  <div key={item.name} className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#1d1e24] p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#7666d8]/15 text-xs font-semibold text-[#b9afff]">
                      {item.initials}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="mt-1 text-xs text-[#92919b]">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-start gap-3 border-t border-white/[0.08] pt-5">
                <ShieldCheck size={18} className="mt-0.5 shrink-0 text-[#a79bed]" />
                <p className="text-xs leading-5 text-[#92919b]">
                  Designed around clear employee information and consistent record keeping.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="grid gap-5 border-t border-white/[0.08] py-12 sm:grid-cols-3">
          <div className="py-2">
            <ClipboardCheck className="mb-4 text-[#a79bed]" size={21} />
            <h2 className="text-sm font-semibold">Employee enrollment</h2>
            <p className="mt-2 text-sm leading-6 text-[#92919b]">
              Collect the essential details needed to create an employee record.
            </p>
          </div>
          <div className="py-2">
            <Users className="mb-4 text-[#a79bed]" size={21} />
            <h2 className="text-sm font-semibold">Organized records</h2>
            <p className="mt-2 text-sm leading-6 text-[#92919b]">
              Find employees by name, department, or employee ID.
            </p>
          </div>
          <div className="py-2">
            <ShieldCheck className="mb-4 text-[#a79bed]" size={21} />
            <h2 className="text-sm font-semibold">Review and maintain</h2>
            <p className="mt-2 text-sm leading-6 text-[#92919b]">
              View employee information and maintain enrollment status.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/[0.08] px-5 py-5 text-center text-xs text-[#777780]">
        Employee Enrollment System
      </footer>
    </div>
  );
}
