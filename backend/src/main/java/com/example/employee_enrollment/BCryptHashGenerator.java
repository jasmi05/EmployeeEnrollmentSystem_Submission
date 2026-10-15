
package com.example.employee_enrollment;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BCryptHashGenerator {

    public static void main(String[] args) {

        BCryptPasswordEncoder encoder =
                new BCryptPasswordEncoder();

        String hash = encoder.encode("Pass123!");

        System.out.println("Generated BCrypt hash:");
        System.out.println(hash);

        System.out.println("Password verification:");
        System.out.println(
                encoder.matches("Pass123!", hash)
        );
    }
}
