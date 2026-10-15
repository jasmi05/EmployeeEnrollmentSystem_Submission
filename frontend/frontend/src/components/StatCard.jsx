
export default function StatCard({ title, value, note, icon: Icon, accent }) {
  const accents = {
    violet: "bg-violet-400/10 text-violet-300",
    emerald: "bg-emerald-400/10 text-emerald-300",
    amber: "bg-amber-400/10 text-amber-300",
    blue: "bg-sky-400/10 text-sky-300",
  };

  return (
    <div className="panel p-5 transition duration-200 hover:-translate-y-1 hover:border-violet-400/30">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-[#9290a9]">{title}</p>
          <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
        </div>
        <div className={`rounded-xl p-3 ${accents[accent] || accents.violet}`}>
          <Icon size={21} />
        </div>
      </div>
      <p className="mt-4 text-xs text-[#9290a9]">{note}</p>
    </div>
  );
}
