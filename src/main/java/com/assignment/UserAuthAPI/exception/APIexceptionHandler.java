package com.assignment.UserAuthAPI.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.ZoneId;
import java.time.ZonedDateTime;


@ControllerAdvice
public class APIexceptionHandler {

    @ExceptionHandler(value = {APIexception.class})
    public ResponseEntity<Object> handleAPIexception(APIexception e){

        exception exception = new exception(
                e.getMessage(),
                HttpStatus.BAD_REQUEST,
                ZonedDateTime.now(ZoneId.of("Z"))
        );
        return new ResponseEntity<>(exception,HttpStatus.BAD_REQUEST);

    }
}
