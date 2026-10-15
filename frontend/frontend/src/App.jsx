
import {useEffect, useMemo, useState } from "react";
import { Users, UserCheck, Clock3, Plus, Download, ArrowLeft } from "lucide-react";
import LoginPage from "./components/LoginPage.jsx";
import LandingPage from "./components/LandingPage.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Topbar from "./components/Topbar.jsx";
import StatCard from "./components/StatCard.jsx";
import EmployeeTable from "./components/EmployeeTable.jsx";
import EmployeeForm from "./components/EmployeeForm.jsx";
import EmployeeDetails from "./components/EmployeeDetails.jsx";

import {getEmployees,
  createEmployee,
  updateEmployee,
} from "./api/employeeApi.js";

export default function App() {
  const [showWorkspace, setShowWorkspace] = useState(false);
 const [employees, setEmployees] = useState([]);
const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [active, setActive] = useState("Overview");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [viewing, setViewing] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  
 useEffect(() => {
  if (!showWorkspace) return;

  async function loadEmployees() {
    setLoadingEmployees(true);

    try {
      const data = await getEmployees();
      console.log("API data:", data);
console.log("API record count:", data.length);
      console.log("Employees loaded:", data);
      setEmployees(data);
    } catch (error) {
  console.error("Loading error:", error);
  setNotice(`Could not load employees: ${error.message}`);
  alert("Employee loading failed: " + error.message);
} finally {
      setLoadingEmployees(false);
    }
  }

  loadEmployees();
}, [showWorkspace]);

  const activeCount = employees.filter((e) => e.status === "Active").length;
  const pendingCount = employees.filter((e) => e.status === "Pending").length;
  const inactiveCount = employees.filter((e) => e.status === "Inactive").length;

  const filteredEmployees = useMemo(() => {
    const query = search.trim().toLowerCase();

    return employees.filter((employee) => {
      const matchesSearch = [
        employee.id,
        employee.name,
        employee.email,
        employee.department,
        employee.jobTitle,
      ].some((value) => (value || "").toLowerCase().includes(query));

      const matchesFilter = filter === "All" || employee.status === filter;
      const matchesReview = active !== "Enrollment review" || employee.status === "Pending";

      return matchesSearch && matchesFilter && matchesReview;
    });
  }, [employees, search, filter, active]);

  function openAddForm() {
    setEditing(null);
    setFormOpen(true);
  }

  
async function saveEmployee(form) {
  try {
    if (editing) {
      const updated = await updateEmployee(editing, form);

      setEmployees((current) =>
        current.map((item) =>
          item.id === editing.id ? updated : item
        )
      );

      setNotice("Employee details have been updated.");
      setViewing(null);
    } else {
      const created = await createEmployee(form);

      setEmployees((current) => [created, ...current]);
      setNotice("Employee record has been created.");
    }

    setFormOpen(false);
    setEditing(null);
    setActive("Employees");
    setFilter("All");
    setPage(1);
  } catch (error) {
    setNotice(`Could not save employee: ${error.message}`);
  }
}

  
async function changeStatus(id, status) {
  const employee = employees.find((item) => item.id === id);
  if (!employee) return;

  try {
    const updated = await updateEmployee(employee, { status });

    setEmployees((current) =>
      current.map((item) => (item.id === id ? updated : item))
    );

    setViewing((current) =>
      current?.id === id ? updated : current
    );

    setNotice("Employee status updated successfully.");
  } catch (error) {
    setNotice(`Could not update status: ${error.message}`);
  }
}


  function editEmployee(employee) {
    setViewing(null);
    setEditing(employee);
    setFormOpen(true);
  }

  function navigate(label) {
    setActive(label);
    setPage(1);
    setFilter("All");
    setSearch("");

    if (label === "Enroll employee") openAddForm();
  }

  function exportCSV() {
    const headers = [
      "Employee ID", "Full Name", "Email", "Phone", "Department",
      "Job Title", "Date of Birth", "Address", "Joining Date",
      "Employment Type", "Emergency Contact", "Status",
    ];

    const rows = filteredEmployees.map((e) => [
      e.id, e.name, e.email, e.phone, e.department, e.jobTitle,
      e.dob, e.address, e.joiningDate, e.employmentType, e.emergencyContact, e.status,
    ]);

    const quote = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const csv = [headers, ...rows].map((row) => row.map(quote).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "employee-records.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  if (!showWorkspace && showLogin) {
  return (
    <LoginPage
      onLogin={() => {
        setShowLogin(false);
        setShowWorkspace(true);
      }}
      onBack={() => setShowLogin(false)}
    />
  );
}

if (!showWorkspace) {
  return <LandingPage onEnter={() => setShowLogin(true)} />;
}

  return (
    <div className="min-h-screen bg-[#101114] text-[#f1f0ed]">
      <Sidebar
        active={active}
        onNavigate={navigate}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <main className="min-h-screen lg:pl-[240px]">
        <Topbar
          search={search}
          setSearch={(value) => { setSearch(value); setPage(1); }}
          onAdd={openAddForm}
          onMenu={() => setMobileOpen(true)}
        />

        <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-7 lg:px-10">
        
<div className="mb-6 flex items-center justify-between">
  <button
    onClick={() => setShowWorkspace(false)}
    className="inline-flex items-center gap-2 text-sm text-[#a5a3ad] hover:text-white"
  >
    <ArrowLeft size={16} /> Back to home
  </button>

  <button
    onClick={() => {
      setShowWorkspace(false);
      setShowLogin(true);
    }}
    className="rounded-lg border border-white/10 px-3 py-2 text-sm text-[#a5a3ad] hover:bg-white/[0.04] hover:text-white"
  >
    Sign out
  </button>
</div>


          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-2 text-sm text-[#a79bed]">People operations</p>
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {active === "Enrollment review"
                  ? "Enrollment review"
                  : active === "Employees"
                    ? "Employee directory"
                    : active === "Enroll employee"
                      ? "New enrollment"
                      : "Employee overview"}
              </h1>
              <p className="mt-2 text-sm text-[#a5a3ad]">
                Manage employee details and enrollment records.
              </p>
            </div>

            <button onClick={openAddForm} className="primary-btn self-start sm:self-auto">
              <Plus size={16} /> Add employee
            </button>
          </div>

          {notice && (
            <div role="status" className="mb-5 flex items-center justify-between rounded-lg border border-[#3a5c49] bg-[#18271f] px-4 py-3 text-sm text-[#b8e5c7]">
              <span>{notice}</span>
              <button onClick={() => setNotice("")} className="ml-4 text-xs underline">Dismiss</button>
            </div>
          )}

          <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard title="Total employees" value={employees.length} note="All records" icon={Users} accent="violet" />
           
            <StatCard title="Active" value={activeCount} note="Currently active records" icon={UserCheck} accent="emerald" />
            <StatCard title="Awaiting review" value={pendingCount} note="Pending enrollment records" icon={Clock3} accent="amber" />
          </section>

          {active === "Overview" && (
            <section className="panel mb-7 p-5 sm:p-6">
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                  <h2 className="font-semibold">Welcome to your workspace</h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#a5a3ad]">
                    Use the employee directory to search and update records, or create a new enrollment when someone joins.
                  </p>
                </div>
                <button onClick={openAddForm} className="primary-btn self-start">
                  <Plus size={16} /> New enrollment
                </button>
              </div>
            </section>
          )}

          <section className="panel overflow-hidden">
            <div className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center sm:px-6">
              <div>
                <h2 className="text-lg font-semibold">
                  {active === "Enrollment review" ? "Pending enrollment records" : "Employee records"}
                </h2>
                <p className="mt-1 text-sm text-[#a5a3ad]">
                  View employee information and update enrollment status.
                </p>
              </div>
              <button onClick={exportCSV} className="secondary-btn self-start text-sm">
                <Download size={16} /> Export CSV
              </button>
            </div>

            <div className="flex flex-wrap gap-2 px-5 pb-5 sm:px-6">
              {["All", "Active", "Pending", "Inactive"].map((status) => (
                <button
                  key={status}
                  onClick={() => { setFilter(status); setPage(1); }}
                  className={`rounded-lg border px-3 py-2 text-xs transition ${
                    filter === status
                      ? "border-[#7666d8] bg-[#7666d8]/15 text-[#c6bfff]"
                      : "border-white/10 text-[#aaa8b2] hover:bg-white/[0.04]"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            
{loadingEmployees ? (
  <div className="p-8 text-center text-gray-400">
    Loading employee records...
  </div>
) : (
  <EmployeeTable
    employees={filteredEmployees}
    onView={setViewing}
    onEdit={editEmployee}
    onStatusChange={changeStatus}
    page={page}
    setPage={setPage}
  />
)}

          </section>

          <footer className="py-6 text-xs text-[#777780]">
            Employee Enrollment System
          </footer>
        </div>
      </main>

      {formOpen && (
        <EmployeeForm
          employee={editing}
          employees={employees}
          onSave={saveEmployee}
          onClose={() => { setFormOpen(false); setEditing(null); }}
        />
      )}

      {viewing && (
        <EmployeeDetails
          employee={viewing}
          onClose={() => setViewing(null)}
          onEdit={editEmployee}
        />
      )}
    </div>
  );
}
