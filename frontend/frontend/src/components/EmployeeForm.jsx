
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  dob: "",
  address: "",
  department: "",
  jobTitle: "",
  joiningDate: "",
  employmentType: "Full-time",
  emergencyContact: "",
  status: "Pending",
};

const fields = [
  { name: "name", label: "Full name", placeholder: "Enter full name", required: true },
  { name: "email", label: "Email address", placeholder: "name@company.com", type: "email", required: true },
  { name: "phone", label: "Phone number", placeholder: "10-digit mobile number", required: true },
  { name: "dob", label: "Date of birth", type: "date", required: true },
  { name: "address", label: "Residential address", placeholder: "City, state", required: true, wide: true },
  { name: "department", label: "Department", placeholder: "e.g. Engineering", required: true },
  { name: "jobTitle", label: "Job title", placeholder: "e.g. Software Engineer", required: true },
  { name: "joiningDate", label: "Joining date", type: "date", required: true },
  { name: "emergencyContact", label: "Emergency contact", placeholder: "10-digit mobile number", required: true },
];

export default function EmployeeForm({ employee, employees, onSave, onClose }) {
  const [form, setForm] = useState(emptyForm);
  const [error, setError] = useState("");

  useEffect(() => {
    setForm(employee ? { ...emptyForm, ...employee } : emptyForm);
    setError("");
  }, [employee]);

  function update(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  function submit(event) {
    event.preventDefault();
    setError("");

    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();
    const emergency = form.emergencyContact.trim();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      setError("Enter a valid 10-digit phone number.");
      return;
    }

    if (!/^\d{10}$/.test(emergency)) {
      setError("Enter a valid 10-digit emergency contact.");
      return;
    }

    const duplicateEmail = employees.some(
      (item) =>
        item.email.toLowerCase() === email &&
        item.id !== employee?.id
    );

    if (duplicateEmail) {
      setError("An employee with this email already exists.");
      return;
    }

    if (form.dob && form.dob > new Date().toISOString().slice(0, 10)) {
      setError("Date of birth cannot be in the future.");
      return;
    }

    if (form.joiningDate && form.dob && form.joiningDate < form.dob) {
      setError("Joining date cannot be earlier than date of birth.");
      return;
    }

    onSave({
      ...form,
      name: form.name.trim(),
      email,
      phone,
      emergencyContact: emergency,
    });
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-sm sm:items-center sm:p-6">
      <div className="my-auto w-full max-w-3xl rounded-2xl border border-[#34344a] bg-[#12121f] shadow-2xl">
        <div className="flex items-start justify-between border-b border-[#29293d] p-5 sm:p-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300">
              EMPLOYEE RECORD
            </p>
            <h2 className="mt-2 text-xl font-semibold">
              {employee ? "Update employee" : "New enrollment"}
            </h2>
            <p className="mt-1 text-sm text-[#9290a9]">
              Enter the employee's information below.
            </p>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-[#9290a9] hover:bg-white/5" aria-label="Close form">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={submit} className="p-5 sm:p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {fields.map((field) => (
              <label key={field.name} className={`block ${field.wide ? "sm:col-span-2" : ""}`}>
                <span className="mb-2 block text-sm text-[#c6c4d8]">
                  {field.label} {field.required && <span className="text-violet-300">*</span>}
                </span>
                <input
                  className="field text-sm"
                  name={field.name}
                  type={field.type || "text"}
                  value={form[field.name] || ""}
                  onChange={update}
                  placeholder={field.placeholder || ""}
                  required={field.required}
                  max={field.type === "date" ? new Date().toISOString().slice(0, 10) : undefined}
                />
              </label>
            ))}

            <label className="block">
              <span className="mb-2 block text-sm text-[#c6c4d8]">Employment type *</span>
              <select className="field text-sm" name="employmentType" value={form.employmentType} onChange={update} required>
                <option>Full-time</option>
                <option>Part-time</option>
                <option>Contract</option>
                <option>Intern</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm text-[#c6c4d8]">Enrollment status *</span>
              <select className="field text-sm" name="status" value={form.status} onChange={update} required>
                <option>Pending</option>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </label>
          </div>

          {error && (
            <p role="alert" className="mt-4 rounded-lg border border-rose-400/20 bg-rose-400/10 px-4 py-3 text-sm text-rose-300">
              {error}
            </p>
          )}

          <div className="mt-6 flex flex-col-reverse justify-end gap-3 border-t border-[#29293d] pt-5 sm:flex-row">
            <button type="button" onClick={onClose} className="secondary-btn">Cancel</button>
            <button type="submit" className="primary-btn">
              {employee ? "Save changes" : "Create employee record"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
