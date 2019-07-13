package edu.gatech.gameeduapp.model;

import java.util.Set;

import javax.persistence.*;

import edu.gatech.gameeduapp.datatype.BadgeType;

@Entity
public class Badge {

//	@EmbeddedId
//	private BadgeIdentifier bId;
	
	@Column 
	@Id
	@GeneratedValue
	private Integer badgeId;
	
	@Column
	@Enumerated
	private BadgeType badgeType;
	
	@ManyToMany(mappedBy="badgeList")
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
