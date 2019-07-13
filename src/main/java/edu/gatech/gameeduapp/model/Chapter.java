package edu.gatech.gameeduapp.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.util.Set;

@Entity
public class Chapter {
  @Column
  @Id
  private Integer chapterId;

  @Column
  private String conceptText;

  @Column
  private String link;

  @Column
  private String chapterName;

  @Column
  private Integer level;

  @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "chapter")
  private Set<Question> questionList;

  public Integer getChapterId() {
    return chapterId;
  }

  public String getConceptText() {
    return conceptText;
  }

  public String getLink() {
    return link;
  }

  public String getChapterName() {
    return chapterName;
  }

  public Integer getLevel() {
    return level;
  }
}
