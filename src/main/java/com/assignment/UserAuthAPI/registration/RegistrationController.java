package com.assignment.UserAuthAPI.registration;

import com.assignment.UserAuthAPI.exception.APIexception;
import com.assignment.UserAuthAPI.user.User;
import com.assignment.UserAuthAPI.user.UserRepository;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping(path = "user/registration")
@AllArgsConstructor
public class RegistrationController {
    private UserRepository userRepository;
    private RegistrationService registrationService;
    @PostMapping
    public ResponseEntity<Object> register(@RequestBody RegistrationRequest request){
        String returnMessage;
        try{
            returnMessage = registrationService.register(request);
        }
        catch(APIexception e) {
            return new ResponseEntity<>( e.getMessage(), HttpStatus.BAD_REQUEST);

        }
        return new ResponseEntity<>("Registration Successful "+returnMessage,HttpStatus.CREATED);
    }
    @GetMapping("/userdata")
    public List<User> userdata(){
        return userRepository.findAll();
    }
}

