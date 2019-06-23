package edu.gatech.gameeduapp.model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

import edu.gatech.gameeduapp.datatype.Proficiency;

@Entity
public class Player {

	@Column
	@Id
	private String playerId;
	
	@Column
	private String firstName;
	
	@Column
	private String lastName;

	@Column
	private String password;
	
	@Column
	@Enumerated
	private Proficiency proficiency;
	
	@Column
	private Integer rating;
	
	@Column
	private Integer correctAns;
	
	@Column
	private Integer incorrectAns;
	
	@Column
	private Integer level;
	
	@Column
	private Integer gamesPlayed;
	
	@ManyToMany
	@JoinTable(name="player_badge",
	joinColumns=@JoinColumn(name="badge_id"), 
	inverseJoinColumns=@JoinColumn(name="player_id"))
	private Set<Badge> badgeList;

	public Player(String playerId, String firstName, String lastName, String password, Proficiency proficiency) {
		this.playerId = playerId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
		this.proficiency = proficiency;
	}

	public Player() {
	}

	public String getPassword() {
		return password;
	}

	public Proficiency getProficiency() {
		return proficiency;
	}

	public String getPlayerId() {
		return playerId;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public Integer getRating() {
		return rating;
	}

	public Integer getCorrectAns() {
		return correctAns;
	}

	public Integer getIncorrectAns() {
		return incorrectAns;
	}

	public Integer getLevel() {
		return level;
	}

	public Integer getGamesPlayed() {
		return gamesPlayed;
	}

	public Set<Badge> getBadgeList() {
		return badgeList;
	}

	public void setCorrectAns(Integer correctAns) {
		this.correctAns = correctAns;
	}

	public void setIncorrectAns(Integer incorrectAns) {
		this.incorrectAns = incorrectAns;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

	public void setLevel(Integer level) {
		this.level = level;
	}
}
