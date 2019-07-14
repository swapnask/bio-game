package edu.gatech.gameeduapp.controller;

import edu.gatech.gameeduapp.model.Player;
import edu.gatech.gameeduapp.pojo.CurrentPlayer;
import edu.gatech.gameeduapp.pojo.LoginObject;
import edu.gatech.gameeduapp.pojo.ProfileObject;
import edu.gatech.gameeduapp.pojo.RegisterObject;
import edu.gatech.gameeduapp.repository.PlayerRepository;
import edu.gatech.gameeduapp.util.GameEduAppException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.websocket.server.PathParam;
import java.util.List;

@RequestMapping("/gameeduapp")
@RestController
public class LoginController {

  @Autowired
  private PlayerRepository playerRepo;

  @Autowired
  private CurrentPlayer currentPlayer;

  @PostMapping("/login")
  public boolean checkLogin(@RequestBody LoginObject loginObject) {
    if (!playerRepo.existsById(loginObject.getPlayerId())) {
      throw new GameEduAppException("Player not found", HttpStatus.NOT_FOUND);
    }
    Player playerObj = playerRepo.getOne(loginObject.getPlayerId());
    if (!loginObject.getPassword().equals(playerObj.getPassword())) {
      throw new GameEduAppException("Login Password incorrect", HttpStatus.UNAUTHORIZED);
    } else if (loginObject.getPassword().equals(playerObj.getPassword())) {

      currentPlayer.setPlayerId(playerObj.getPlayerId());
      return true;
    }
    return false;
  }

  @PostMapping("/register")
  public void registerPlayer(@RequestBody RegisterObject regObject) {
    if (playerRepo.existsById(regObject.getPlayerId())) {
      throw new GameEduAppException("Player with same PlayerId already present", HttpStatus.INTERNAL_SERVER_ERROR);
    }
    Player player = new Player(regObject.getPlayerId(), regObject.getFirstName(), regObject.getLastName(), regObject.getPassword(), regObject.getProficiency(), 0, 1, 0, 0, 0);
    playerRepo.save(player);
  }

  @GetMapping("/players")
  public List<Player> getPlayers() {
    List<Player> playerList = playerRepo.findAll();
    if (playerList == null) {
      throw new GameEduAppException("No Player found", HttpStatus.NOT_FOUND);
    }
    return playerList;
  }

  @GetMapping("/player/{playerId}")
  public Player getPlayers(@PathParam("playerId") String playerId) {
    if (playerRepo.existsById(playerId)) {
      throw new GameEduAppException("Player not found", HttpStatus.NOT_FOUND);
    }
    return playerRepo.getOne(playerId);
  }

  @PutMapping("/player/{playerId}")
  public void updateProfile(@PathVariable("playerId") String playerId, @RequestBody ProfileObject profileObject) {
    if (!playerRepo.existsById(playerId)) {
      throw new GameEduAppException("Player not found", HttpStatus.NOT_FOUND);
    }
    playerRepo.updatePlayerProfile(playerId, profileObject.getProficiency());
  }

  @GetMapping("/currentPlayer")
  public ResponseEntity<String> getCurrentPLayerId() {
    return new ResponseEntity<>(currentPlayer.getPlayerId(), HttpStatus.OK);
  }

  @PostMapping("/logout/{playerId}")
  public boolean logout(@PathVariable("playerId") String playerId) {
    if (!playerRepo.existsById(playerId)) {
      throw new GameEduAppException("Player not found", HttpStatus.NOT_FOUND);
    }
    currentPlayer.setPlayerId(null);
    return true;
  }
}
