package com.dice.academy;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class DiceAcademyApplication {

    public static void main(String[] args) {
        SpringApplication.run(DiceAcademyApplication.class, args);
    }

}
