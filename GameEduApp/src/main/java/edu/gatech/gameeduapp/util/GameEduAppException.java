package edu.gatech.gameeduapp.util;

import org.springframework.http.HttpStatus;

public class GameEduAppException extends RuntimeException {
  String errorMessage;

  HttpStatus errorCode;

  public GameEduAppException(String errorMessage, HttpStatus errorCode) {
    super();
    this.errorMessage = errorMessage;
    this.errorCode = errorCode;
  }

  public String getErrorMessage() {
    return errorMessage;
  }

  public void setErrorMessage(String errorMessage) {
    this.errorMessage = errorMessage;
  }

  public HttpStatus getErrorCode() {
    return errorCode;
  }

  public void setErrorCode(HttpStatus errorCode) {
    this.errorCode = errorCode;
  }
}
