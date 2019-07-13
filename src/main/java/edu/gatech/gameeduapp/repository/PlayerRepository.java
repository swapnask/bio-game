package edu.gatech.gameeduapp.repository;

import edu.gatech.gameeduapp.datatype.Proficiency;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.gatech.gameeduapp.model.Player;

import javax.transaction.Transactional;

@Repository
public interface PlayerRepository extends JpaRepository<Player, String> {

  @Transactional
  @Modifying
  @Query("update Player p set p.proficiency=:proficiency where p.playerId=:playerId")
  void updatePlayerProfile(@Param("playerId") String playerId,@Param("proficiency")  Proficiency proficiency);

}
