package com.assignment.UserAuthAPI.exception;

public class APIexception extends RuntimeException{
    public APIexception(String message) {
        super(message);
    }

    public APIexception(String message, Throwable cause) {
        super(message, cause);
    }
}
