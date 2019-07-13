package edu.gatech.gameeduapp.pojo;

import edu.gatech.gameeduapp.datatype.BadgeType;
import edu.gatech.gameeduapp.model.Badge;

import java.util.List;

public class LeaderBoard {
  private String playerId;
  private String name;
  private String proficiency;
  private Integer level;
  private Integer rating;
  private Integer gamesPlayed;
  private Integer correctAns;
  private Integer incorrectAns;
  private List<BadgeType> badgeList;

  public LeaderBoard(String playerId, String name, String proficiency,Integer level, Integer rating, Integer gamesPlayed, Integer correctAns, Integer incorrectAns, List<BadgeType> badgeList) {
    this.playerId = playerId;
    this.level = level;
    this.rating = rating;
    this.gamesPlayed = gamesPlayed;
    this.correctAns = correctAns;
    this.incorrectAns = incorrectAns;
    this.badgeList = badgeList;
    this.name = name;
    this.proficiency = proficiency;
  }

  public void setPlayerId(String playerId) {
    this.playerId = playerId;
  }

  public void setLevel(Integer level) {
    this.level = level;
  }

  public void setRating(Integer rating) {
    this.rating = rating;
  }

  public void setGamesPlayed(Integer gamesPlayed) {
    this.gamesPlayed = gamesPlayed;
  }

  public void setCorrectAns(Integer correctAns) {
    this.correctAns = correctAns;
  }

  public void setIncorrectAns(Integer incorrectAns) {
    this.incorrectAns = incorrectAns;
  }

  public  void  setPlayerName(String name) {this.name = name;}

  public  void setProficiency(String proficiency) { this.proficiency = proficiency;}

  public List<BadgeType> getBadgeList() {
    return badgeList;
  }

  public void setBadgeList(List<BadgeType> badgeList) {
    this.badgeList = badgeList;
  }

  public String getPlayerId() {
    return playerId;
  }

  public  String getProficiency() {return proficiency;}

  public  String getPlayerName() {return name;}

  public Integer getLevel() {
    return level;
  }

  public Integer getRating() {
    return rating;
  }

  public Integer getGamesPlayed() {
    return gamesPlayed;
  }

  public Integer getCorrectAns() {
    return correctAns;
  }

  public Integer getIncorrectAns() {
    return incorrectAns;
  }
}
