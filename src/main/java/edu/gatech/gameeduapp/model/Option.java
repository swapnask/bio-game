package edu.gatech.gameeduapp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Option {
  @Column
  @Id
  private Integer optionId;

  @Column
  private String optionText;

  @ManyToOne
  @JoinColumn(name = "question_id")
  private Question question;

  public Integer getOptionId() {
    return optionId;
  }

  public String getOptionText() {
    return optionText;
  }
}
