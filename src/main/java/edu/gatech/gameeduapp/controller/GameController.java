package edu.gatech.gameeduapp.controller;

import edu.gatech.gameeduapp.datatype.BadgeType;
import edu.gatech.gameeduapp.model.Chapter;
import edu.gatech.gameeduapp.model.Player;
import edu.gatech.gameeduapp.model.Question;
import edu.gatech.gameeduapp.pojo.GameResult;
import edu.gatech.gameeduapp.pojo.LeaderBoard;
import edu.gatech.gameeduapp.pojo.QuesAnsObject;
import edu.gatech.gameeduapp.pojo.RatingLevelObject;
import edu.gatech.gameeduapp.repository.BadgeRepository;
import edu.gatech.gameeduapp.repository.ChapterRepository;
import edu.gatech.gameeduapp.repository.OptionRepository;
import edu.gatech.gameeduapp.repository.PlayerRepository;
import edu.gatech.gameeduapp.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

@RequestMapping("/gameeduapp")
@RestController
public class GameController {

  @Autowired
  private PlayerRepository playerRepo;

  @Autowired
  private ChapterRepository chapterRepo;

  @Autowired
  private QuestionRepository questionRepo;

  @Autowired
  private BadgeRepository badgeRepo;

  @Autowired
  private OptionRepository optionRepo;

  @GetMapping("/question")
  public List<Question> getQuestionsOfChapterId(@RequestParam("chapterId") Integer chapterId, @RequestParam("playerId") String playerId) {
    Optional<Player> player = playerRepo.findById(playerId);
//    return questionRepo.getQuestionFromChapterWithProficiency(chapterId, player.get().getProficiency());
    List<Question> questionList = questionRepo.getQuestionFromChapterWithLevel(chapterId, player.get().getLevel());
    if(questionList.isEmpty())
      return new LinkedList<Question>();
    return questionList.subList(0, 5 > questionList.size() ? questionList.size() : 5);
  }

  @GetMapping("/chaptermodel/{chapterName}")
  public Chapter getChapterModel(@PathVariable("chapterName") String chapterName) {
    return chapterRepo.getChapterModel(chapterName);
  }

  @GetMapping(value = {"/leaderboard/player/{playerId}", "/leaderboard/player"})
  public List<LeaderBoard> getLeaderBoardContents(@PathVariable("playerId") Optional<String> playerId) {
    List<Player> playerList = playerRepo.findAll();
    List<LeaderBoard> leaderBoardList = new LinkedList<>();

    if (playerId.isPresent()) {
      Player player = playerRepo.findById(playerId.get()).get();
      List<BadgeType> badgeList = new LinkedList<>();
      player.getBadgeList().forEach((badge) -> badgeList.add(badge.getBadgeType()));
      String name = player.getFirstName() + player.getLastName();
      LeaderBoard leaderBoardEntry = new LeaderBoard(player.getPlayerId(), name, player.getProficiency().toString(), player.getLevel(), player.getRating(),
          player.getGamesPlayed(), player.getCorrectAns(), player.getIncorrectAns(), badgeList);
      leaderBoardList.add(leaderBoardEntry);
    } else {
      for (Player player : playerList) {
        List<BadgeType> badgeList = new LinkedList<>();
        player.getBadgeList().forEach((badge) -> badgeList.add(badge.getBadgeType()));
        String name = player.getFirstName() + player.getLastName();
        LeaderBoard leaderBoardEntry = new LeaderBoard(player.getPlayerId(), name, player.getProficiency().toString(), player.getLevel(), player.getRating(),
            player.getGamesPlayed(), player.getCorrectAns(), player.getIncorrectAns(), badgeList);
        leaderBoardList.add(leaderBoardEntry);
      }
    }
    return leaderBoardList;
  }

  @GetMapping("/chapters")
  public List<Chapter> getChapters() {
    return chapterRepo.findAll();
  }

  @PostMapping("/checkAnswer")
  public boolean checkAnswer(@RequestBody QuesAnsObject qaObj) {
    Integer qId = qaObj.getQuestionId();
    String answer = questionRepo.findById(qId).get().getAnswer();

    String playerId = qaObj.getPlayerId();
    Player player = playerRepo.findById(playerId).get();
    if (answer.equals(qaObj.getAnswer())) {
      Integer correctAns = player.getCorrectAns();
      correctAns += 1;
      player.setCorrectAns(correctAns);
      playerRepo.save(player);
      return true;
    } else {
      if(qaObj.getAttemptNo() >= 1) {
        Integer incorrectAns = player.getIncorrectAns();
        incorrectAns += 1;
        player.setIncorrectAns(incorrectAns);
        playerRepo.save(player);
      }
    }
    return false;
  }

  @PostMapping("/endGame")
  public GameResult endGame(@RequestParam("playerId") String playerId) {
    Player player = playerRepo.findById(playerId).get();
    Integer correctAns = player.getCorrectAns();
    Integer incorrectAns = player.getIncorrectAns();
    int totalAns = correctAns + incorrectAns;
    float percentCorrect = (float)correctAns/(float)totalAns * 100;
    System.out.println("Percent Correct : "+ percentCorrect);
    GameResult result = null;
    if (percentCorrect > 50) {
//      Set<Badge> badgeList = player.getBadgeList();
//      Badge badge = new Badge();
//      badge.setBadgeType(BadgeType.POWER2);
//      Badge badge1 = new Badge();
//      badge1.setBadgeType(BadgeType.POWER3);
//      badgeList.addAll(Arrays.asList(badge, badge1));
//      badgeRepo.saveAll(Arrays.asList(badge, badge1));

      result = new GameResult(true, player.getLevel(),player.getLevel() + 1, playerId );
      player.setLevel(player.getLevel() + 1);
    }  else {
      result = new GameResult(false, player.getLevel(),player.getLevel(), playerId );
    }
    player.setGamesPlayed(player.getGamesPlayed()+1);
    playerRepo.save(player);
    return result;
  }

  @PutMapping("/updateLeaderboard/{playerId}")
  public void updateRatingAndLevel(@PathVariable String playerId, @RequestBody RatingLevelObject ratingLevelObject) {
    Player player = playerRepo.findById(playerId).get();
    Integer rating = ratingLevelObject.getRating();
    Integer level = ratingLevelObject.getRating();
    player.setRating(rating);
    player.setLevel(level);
    playerRepo.save(player);
  }
}
