
const API_URL = "http://localhost:8080/api/employees";


export function fromApiEmployee(employee) {
  return {
    id: employee.employeeCode || `EMP-${employee.id}`,
    dbId: employee.id,
    name: employee.fullName,
    email: employee.email,
    phone: employee.phone,
    dob: employee.dateOfBirth,
    address: employee.address,
    department: employee.department,
    jobTitle: employee.jobTitle,
    joiningDate: employee.joiningDate,
    employmentType: employee.employmentType,
    emergencyContact: employee.emergencyContact,
    status: employee.status,
  };
}


export function toApiEmployee(form, employeeCode) {
  return {
    employeeCode,
    fullName: form.name.trim(),
    email: form.email.trim().toLowerCase(),
    phone: form.phone.trim(),
    dateOfBirth: form.dob,
    address: form.address.trim(),
    department: form.department.trim(),
    jobTitle: form.jobTitle.trim(),
    joiningDate: form.joiningDate,
    employmentType: form.employmentType,
    emergencyContact: form.emergencyContact.trim(),
    status: form.status,
  };
}

async function request(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed: ${response.status}`);
  }

  if (response.status === 204) return null;

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

export async function getEmployees() {
  const data = await request(API_URL);
  return data.map(fromApiEmployee);
}

export async function createEmployee(form) {
  const employeeCode = `EMP-${Date.now()}`;
  const saved = await request(API_URL, {
    method: "POST",
    body: JSON.stringify(toApiEmployee(form, employeeCode)),
  });

  return fromApiEmployee(saved);
}

export async function updateEmployee(employee, changes) {
  const payload = toApiEmployee(
    { ...employee, ...changes },
    employee.id
  );

  const saved = await request(`${API_URL}/${employee.dbId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });

  return fromApiEmployee(saved);
}
