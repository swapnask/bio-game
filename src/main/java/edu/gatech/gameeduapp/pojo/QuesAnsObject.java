package edu.gatech.gameeduapp.pojo;

public class QuesAnsObject {
  private Integer questionId;
  private String answer;
  private String playerId;
  private Integer attemptNo;

  public Integer getAttemptNo() {
    return attemptNo;
  }

  public Integer getQuestionId() {
    return questionId;
  }

  public String getAnswer() {
    return answer;
  }

  public String getPlayerId() {
    return playerId;
  }
}
