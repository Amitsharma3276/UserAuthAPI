package com.assignment.UserAuthAPI.registration;

import com.assignment.UserAuthAPI.exception.APIexception;
import com.assignment.UserAuthAPI.models.Address;
import com.assignment.UserAuthAPI.user.User;
import com.assignment.UserAuthAPI.user.UserRepository;
import com.assignment.UserAuthAPI.user.UserService;
import org.junit.jupiter.api.*;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.util.Assert;

import java.util.Arrays;
import java.util.Stack;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.verify;

@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class RegistrationServiceTest {

  @Autowired
  private UserRepository userRepository;
  @Mock
  private UserService userService;


  private final RegistrationService registrationService = new RegistrationService(userService, userRepository);

  private Stack<String> errors = new Stack<>();

  @Test
  @Order(1)
  public void testValidateName(){

    String[] names = new String[]{"", "*&987hi", "asdjn skjfn", null};
    int[] size = new int[]{1, 1, 0, 1};

    for(int i = 0; i < 4; i++){
      errors.clear();
      registrationService.validateName(names[i], errors);
      Assertions.assertEquals(errors.size(), size[i]);
    }

  }

  @Test
  @Order(1)
  public void testValidatePassword(){
    String[] pass = new String[]{"ancdksl7896&^*5*&%*","asd89*jf", "A89(78787878", "djfA(8", "asdjnASDAS*()809","dfNHB^&**", "jdsn789BJHKN" };
    int[] err = new int[]{2, 1, 1, 1, 1, 1, 1};
    for(int i = 0; i < pass.length; i++){
      errors.clear();
      registrationService.validatePassword(pass[i], errors);
      Assertions.assertEquals(errors.size(), err[i]);
    }
  }

  @Test
  @Order(1)
  public void testValidateAddress(){
    Address[] addr = new Address[]{
        new Address(1L, "line1", "", "city", "898989", "state"),
        new Address(1L, "", "", "city", "898989", "state"),
        new Address(1L, "line1", "", null, "898989", "state"),
        new Address(1L, "line1", "", "city", "sjdfb890", "satee"),
        new Address(1L, "line1", "", "city", "98ds", ""),
        new Address(1L, "line1", "", "city", "898989", null)
    };
    int[] err = new int[]{0, 1, 1, 1, 2, 1};
    for(int i = 0; i < err.length; i++){
      errors.clear();
      registrationService.validateAddress(addr[i], errors, "type");
      Assertions.assertEquals(errors.size(), err[i]);
    }

  }

  @Test
  @Order(1)
  public void testValidateContactNumber(){
    String[] nums = new String[]{null, "jsdbfkdsbfk", "jkhjhjhjhj", "90909090u8", "+9129090900"};
    int len = nums.length;
    Arrays.stream(nums).forEach(num -> {
      errors.clear();
      registrationService.validateContactNumber(num, errors);
      Assertions.assertEquals(errors.size(), 1);
    });
    String correct = "9090909090";
    errors.clear();
    registrationService.validateContactNumber(correct, errors);
    Assertions.assertEquals(errors.size(), 0);

  }

  @Test
  @Order(1)
  public void testValidateSkills(){
    String[] skills = new String[]{"sank ", " dnsjkf", ",kfndsdf", "kdsnf,"};
    Arrays.stream(skills).forEach(skill -> {
      errors.clear();
      registrationService.validateSkills(skill, errors);
      Assertions.assertEquals(errors.size(), 1);
    });
  }

  @Test
  @Order(2)
  public void testRandomUsernameGenerator(){
    for(int i = 0; i < 10; i++){
      Assertions.assertTrue(userRepository.findByUsername(RegistrationService.randomUsername("", userRepository)).isEmpty());
    }
  }

  @Test
  @Order(2)
  public void testPasswordGenerator(){
    for(int i = 0; i < 10; i++){
      errors.clear();
      registrationService.validatePassword(RegistrationService.randomPassword(3), errors);
      Assertions.assertEquals(errors.size(), 0);
    }
  }

  @Test
  @Order(3)
  public void testRegister(){
    APIexception thrown = assertThrows(APIexception.class,()->registrationService.register(null));
    assertTrue(thrown.getMessage().contains("User is required"));
  }

}