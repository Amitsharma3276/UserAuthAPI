package com.assignment.UserAuthAPI.user;

import com.assignment.UserAuthAPI.models.Address;
import com.assignment.UserAuthAPI.models.UserInfo;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class UserRepositoryTest {

  @Autowired
  private UserRepository userRepository;

  User user0, user1;

  @BeforeAll
  private void generateUsers(){
    user0 = new User(1L, "user0", "pass", new UserInfo("user0", true, "0987654321", "skill0, skill1",
                                                       new Address(1L, "lline1", "", "city", "170019", "state"),
                                                       new Address(2L, "line1", "", "city1", "907868", "state1")));

    user1 = new User(2L, "user0", "pass", new UserInfo("user1", true, "0987624321", "skill0, skill1",
                                                       new Address(3L, "lline1", "", "city", "170019", "state"),
                                                       new Address(4L, "line1", "", "city1", "907868", "state1")));

  }

  @Test
  @Order(1)
  public void check0(){
    Assertions.assertTrue(userRepository.findByUsername(user0.getUsername()).isEmpty());
    userRepository.save(user0);
  }

  @Test
  @Order(2)
  public void check1(){
    Assertions.assertFalse(userRepository.findByUsername(user1.getUsername()).isEmpty());
  }


//  @AfterAll
//  private void tearDown(){
//    userRepository.deleteAll();
//  }

}