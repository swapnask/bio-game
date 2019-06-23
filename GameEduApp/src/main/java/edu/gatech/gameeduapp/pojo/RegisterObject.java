package edu.gatech.gameeduapp.pojo;

import edu.gatech.gameeduapp.datatype.Proficiency;

public class RegisterObject {
  private String playerId;
  private String firstName;
  private String lastName;
  private String password;
  private Proficiency proficiency;

  public String getPlayerId() {
    return playerId;
  }

  public String getFirstName() {
    return firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public String getPassword() {
    return password;
  }

  public Proficiency getProficiency() {
    return proficiency;
  }
}
