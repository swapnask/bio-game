package edu.gatech.gameeduapp.repository;

import edu.gatech.gameeduapp.datatype.Proficiency;
import edu.gatech.gameeduapp.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
  @Query("select q from Question q WHERE q.chapter.chapterId = :chapterId AND q.proficiency = :proficiency")
  List<Question> getQuestionFromChapterWithProficiency(@Param("chapterId") Integer chapterId, @Param("proficiency") Proficiency proficiency);

  @Query("select q from Question q WHERE q.chapter.chapterId = :chapterId AND q.level = :level")
  List<Question> getQuestionFromChapterWithLevel(@Param("chapterId") Integer chapterId, @Param("level") Integer level);
}
