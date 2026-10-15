
package com.example.employee_enrollment;

import com.example.employee_enrollment.entity.User;
import com.example.employee_enrollment.repository.UserRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner createInitialUser(UserRepository userRepository) {
        return args -> {
            String email = "hr@gmail.com";

            if (userRepository.findByEmail(email).isEmpty()) {
                User user = new User();
                user.setEmail(email);
                user.setPasswordHash(
                    new BCryptPasswordEncoder().encode("Pass123!"));
                user.setRole("HR");
                user.setEnabled(true);

                userRepository.save(user);
                System.out.println("Initial HR account created.");
            }
        };
    }
}
