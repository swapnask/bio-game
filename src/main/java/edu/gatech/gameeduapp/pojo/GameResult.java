package edu.gatech.gameeduapp.pojo;

public class GameResult {
    private boolean currentLevelComplete;
    private Integer currentLevel;
    private String playerId;
    private Integer nextLevel;

    public GameResult(boolean currentLevelComplete, Integer currentLevel, Integer nextLevel, String playerId) {
        this.currentLevelComplete = currentLevelComplete;
        this.currentLevel = currentLevel;
        this.playerId = playerId;
        this.nextLevel = nextLevel;
    }

    public boolean isCurrentLevelComplete() {
        return currentLevelComplete;
    }

    public Integer getCurrentLevel() {
        return currentLevel;
    }

    public String getPlayerId() {
        return playerId;
    }

    public Integer getNextLevel() {
        return nextLevel;
    }
}
