package edu.gatech.gameeduapp.repository;

import edu.gatech.gameeduapp.model.Chapter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ChapterRepository extends JpaRepository<Chapter, Integer> {
  @Query("select c from Chapter c WHERE c.chapterName = :chapterName")
  Chapter getChapterModel(@Param("chapterName") String chapterName);

}
