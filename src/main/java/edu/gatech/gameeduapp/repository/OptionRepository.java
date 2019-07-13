package edu.gatech.gameeduapp.repository;

import edu.gatech.gameeduapp.model.Option;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface OptionRepository extends JpaRepository<Option, Integer>{
}
