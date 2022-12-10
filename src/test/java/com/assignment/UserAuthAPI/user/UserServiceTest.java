package com.assignment.UserAuthAPI.user;

import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class UserServiceTest {

  @Autowired
  private UserRepository userRepository;
  private UserService userService;

  @BeforeAll
  private void instantiate(){
    userService = new UserService(userRepository, new BCryptPasswordEncoder(), null);
    userRepository.deleteAll();
  }

  @Test
  public void testSignUpUser(){
    User dummyUser = new User(1L, "user0", "pass0", null);
    userService.signUpUser(dummyUser);
    Assertions.assertTrue(userRepository.findByUsername(dummyUser.getUsername()).isPresent());
  }

  @AfterAll
  public void removeAll(){
    userRepository.deleteAll();
  }

}