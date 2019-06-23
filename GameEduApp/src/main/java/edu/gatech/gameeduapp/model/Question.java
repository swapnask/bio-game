package edu.gatech.gameeduapp.model;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import edu.gatech.gameeduapp.datatype.Proficiency;

@Entity
public class Question {
	
	@Column
	@Id
	private Integer questionId;
	
	@Column
	private String questionText;
	
	@Column
	private String answer;
	
	@Enumerated
	private Proficiency proficiency;
	
	@ManyToOne
	@JoinColumn(name="chapter_id")
	private Chapter chapter;
	
	@OneToMany(mappedBy="question", fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	private Set<Option> optionList;

	public Integer getQuestionId() {
		return questionId;
	}

	public String getQuestionText() {
		return questionText;
	}

	public String getAnswer() {
		return answer;
	}

	public Proficiency getProficiency() {
		return proficiency;
	}

	public Chapter getChapter() {
		return chapter;
	}

	public Set<Option> getOptionList() {
		return optionList;
	}
}
