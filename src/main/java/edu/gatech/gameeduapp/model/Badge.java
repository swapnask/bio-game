package edu.gatech.gameeduapp.model;

import edu.gatech.gameeduapp.datatype.BadgeType;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.Set;

@Entity
public class Badge {
  @Column
  @Id
  @GeneratedValue
  private Integer badgeId;

  @Column
  @Enumerated
  private BadgeType badgeType;

  @ManyToMany(mappedBy = "badgeList")
  private Set<Player> playerList;

  public Integer getBadgeId() {
    return badgeId;
  }

  public BadgeType getBadgeType() {
    return badgeType;
  }

  public Set<Player> getPlayerList() {
    return playerList;
  }

  public void setBadgeId(Integer badgeId) {
    this.badgeId = badgeId;
  }

  public void setBadgeType(BadgeType badgeType) {
    this.badgeType = badgeType;
  }

  public void setPlayerList(Set<Player> playerList) {
    this.playerList = playerList;
  }
}
