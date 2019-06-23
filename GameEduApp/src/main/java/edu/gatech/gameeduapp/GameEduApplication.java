package edu.gatech.gameeduapp;

import edu.gatech.gameeduapp.pojo.CurrentPlayer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;

@SpringBootApplication
public class GameEduApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(GameEduApplication.class, args);
	}

}
