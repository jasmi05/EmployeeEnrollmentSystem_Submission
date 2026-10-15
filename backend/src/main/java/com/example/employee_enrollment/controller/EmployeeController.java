
package com.example.employee_enrollment.controller;

import com.example.employee_enrollment.entity.Employee;
import com.example.employee_enrollment.repository.EmployeeRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/employees")
@CrossOrigin(origins = "http://localhost:5176", allowCredentials = "true")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;

    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    
    @GetMapping("/{id}")
    public ResponseEntity<Employee> getEmployeeById(
            @PathVariable Long id) {

        return employeeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    
    @PostMapping
    public ResponseEntity<Employee> addEmployee(
            @RequestBody Employee employee) {

        employee.setId(null);

        if (employee.getStatus() == null ||
                employee.getStatus().isBlank()) {
            employee.setStatus("Pending");
        }

        Employee savedEmployee = employeeRepository.save(employee);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedEmployee);
    }

   
    @PutMapping("/{id}")
    public ResponseEntity<Employee> updateEmployee(
            @PathVariable Long id,
            @RequestBody Employee employeeDetails) {

        return employeeRepository.findById(id)
                .map(existingEmployee -> {
                    existingEmployee.setEmployeeCode(
                            employeeDetails.getEmployeeCode());
                    existingEmployee.setFullName(
                            employeeDetails.getFullName());
                    existingEmployee.setEmail(
                            employeeDetails.getEmail());
                    existingEmployee.setPhone(
                            employeeDetails.getPhone());
                    existingEmployee.setDateOfBirth(
                            employeeDetails.getDateOfBirth());
                    existingEmployee.setAddress(
                            employeeDetails.getAddress());
                    existingEmployee.setDepartment(
                            employeeDetails.getDepartment());
                    existingEmployee.setJobTitle(
                            employeeDetails.getJobTitle());
                    existingEmployee.setJoiningDate(
                            employeeDetails.getJoiningDate());
                    existingEmployee.setEmploymentType(
                            employeeDetails.getEmploymentType());
                    existingEmployee.setEmergencyContact(
                            employeeDetails.getEmergencyContact());
                    existingEmployee.setStatus(
                    		employeeDetails.getStatus());

                    Employee updatedEmployee =
                            employeeRepository.save(existingEmployee);

                    return ResponseEntity.ok(updatedEmployee);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEmployee(
            @PathVariable Long id) {

        if (!employeeRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        employeeRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
