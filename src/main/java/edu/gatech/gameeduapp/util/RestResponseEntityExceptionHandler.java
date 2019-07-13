package edu.gatech.gameeduapp.util;

import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
  @ExceptionHandler(value = {GameEduAppException.class})
  protected ResponseEntity<Object> handleConflict(GameEduAppException ex, WebRequest request) {
    String bodyOfResponse = ex.getErrorMessage();
    return handleExceptionInternal(ex, bodyOfResponse, new HttpHeaders(), ex.getErrorCode(), request);
  }
}