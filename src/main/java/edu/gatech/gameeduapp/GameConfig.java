package edu.gatech.gameeduapp;

import edu.gatech.gameeduapp.pojo.CurrentPlayer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
public class GameConfig {
  @Bean
  @Scope("singleton")
  CurrentPlayer currentPlayer() {
    return new CurrentPlayer();
  }
}
