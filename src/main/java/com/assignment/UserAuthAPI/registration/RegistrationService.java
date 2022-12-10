package com.assignment.UserAuthAPI.registration;

import com.assignment.UserAuthAPI.exception.APIexception;
import com.assignment.UserAuthAPI.models.Address;
import com.assignment.UserAuthAPI.models.UserInfo;
import com.assignment.UserAuthAPI.user.User;
import com.assignment.UserAuthAPI.user.UserRepository;
import com.assignment.UserAuthAPI.user.UserService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.Stack;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@AllArgsConstructor
@Service
public class RegistrationService {

    private final UserService userService;
    private final UserRepository userRepository;
    public String register(RegistrationRequest request) {

        Stack<String> errors = new Stack<>();       // stack to store errors


        // getting variables from request object
        if(request==null)
        {
            errors.push("User is required");
            throw new APIexception(errors.toString());
        }
        UserInfo userInfo = request.getUserInfo();
        Long id = request.getId();
        String username = request.getUsername();
        String password = request.getPassword();
        Address current_address = request.getUserInfo().getCurrent_address();
        Address permanent_address = request.getUserInfo().getPermanent_address();
        String emergency_number = request.getUserInfo().getEmergency_number();
        String name=request.getUserInfo().getName();
        String permanent_pin=request.getUserInfo().getPermanent_address().getPincode();
        String skills = request.getUserInfo().getSkills();

        // boolean to store if current address is null, will be used to decide if current address need separate validation
        Boolean isCurrentAddressNull = false;

        //checking if current address field is completely blank, if completely blank copy permanent address into current address
        if(current_address.getLine_one()==null
           && current_address.getLine_two()==null
           && current_address.getPincode()==null
           && current_address.getCity()==null
           && current_address.getState()==null){
            isCurrentAddressNull=true;
            System.out.println(current_address.toString());
            current_address=request.getUserInfo().getPermanent_address();
            System.out.println(current_address.toString());
            userInfo.setCurrent_address(current_address);
        }
        // current pincode assigned separately as it would cause error if current address is blank
        String current_pin=current_address.getPincode();
        Boolean isUsernameGenerated=false;
        Boolean isPasswordGenerated=false;
        // checking if password is empty, if empty, generate random password

        if (password.isEmpty()){
            isPasswordGenerated=true;
            password = randomPassword(3);
        }

        validate(name,password,current_pin,permanent_pin,skills,emergency_number,errors,current_address,permanent_address,isCurrentAddressNull);

        if(!errors.isEmpty()) {

            throw new APIexception(errors.toString());
        }

        boolean userExists = userRepository.
            findByUsername(username)
            .isPresent();
        if(userExists) {
            errors.push("User already Present\n");
        }

        if(username.isEmpty()){
            isUsernameGenerated=true;
            username= randomUsername(request.getUserInfo().getName(),userRepository);
        }

        if(!errors.empty())
            throw new APIexception(errors.toString());


        String str = userService.signUpUser(new User(id, username, password, userInfo));
        if(isUsernameGenerated)
        {
            str+=" \nYour username is "+username;
        }
        if(isPasswordGenerated){
            str+=" \nYour password is "+password;
        }
        return str;
    }



    // validation logic
    public ResponseEntity<Object> validate(String name,String password,String current_pin,String permanent_pin,String skills, String emergency_number,
                                           Stack<String> errors, Address current_address,Address permanent_address,Boolean isCurrentAddressNull){
        //Stack<IllegalArgumentException> errors = new Stack<>();
        validateName(name, errors);
        validatePassword(password, errors);

        if(!isCurrentAddressNull) {
            validateAddress(current_address, errors, "current");
        }

        validateAddress(permanent_address, errors, "permanent");

        validateContactNumber(emergency_number, errors);

        validateSkills(skills, errors);

        return new ResponseEntity<>("Validation Passed",HttpStatus.CREATED);

    }


    public void validateName(String name, Stack<String> errors){

        if(name == null){
            errors.push("name is required\n");
            return;
        }

        if(name.isEmpty()) {
            errors.push("name is required\n");
        }
        Pattern p = Pattern.compile("[^a-z0-9 ]", Pattern.CASE_INSENSITIVE);
        Matcher m = p.matcher(name);
        Boolean b = m.find();

        if(b){
            errors.push("Invalid name, name cannot contain special characters.\n");
        }
    }

    public void validatePassword(String password, Stack<String> errors){
        String AB = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String ab = "abcdefghijklmnopqrstuvwxyz";
        String num = "1234567890";
        String spl = "!@#$%^&*()<>/?+-=[]{}";
        Integer caps=0;
        Integer small = 0;
        Integer numbers=0;
        Integer special = 0;
        for(int i=0;i<password.length();i++){
            if(AB.contains(Character.toString(password.charAt(i)))){
                caps++;
            }
            if(ab.contains(Character.toString(password.charAt(i)))){
                small++;
            }
            if(num.contains(Character.toString(password.charAt(i)))){
                numbers++;
            }
            if(spl.contains(Character.toString(password.charAt(i)))){
                special++;
            }
        }
        if(caps*small*numbers*special==0){
            errors.push("Weak password \n");
            //throw new IllegalArgumentException("Invalid Password");
        }
        if(password.length()<8 || password.length() > 15){
            errors.push("Password length should be between 8 and 15\n");
        }
    }

    public void validateAddress(Address address, Stack<String> errors, String type){
        if (address.getLine_one() == null || address.getLine_one().length() == 0) {
            errors.push("line_one is required in " + type + " address");
        }
        if (address.getCity() == null || address.getCity().length() == 0) {
            errors.push("city is required in " + type + " address");
        }
        if (address.getState() == null || address.getState().length() == 0) {
            errors.push("state is required in " + type + " address");
        }
        String pin = address.getPincode();
        if (pin == null || !(pin.matches("[0-9]+") && pin.length() == 6)){
            errors.push(type + " address pincode is invalid\n");
        }
    }

    public void validateContactNumber(String emergency_number, Stack<String> errors){
        if (emergency_number==null || !emergency_number.matches("[0-9]+") || emergency_number.length() != 10){
            errors.push("Emergency Number Invalid\n");
        }
    }

    public void validateSkills(String skills, Stack<String> errors){
        String tmp = skills;
        System.out.println(skills);

        List<String> skillSet = Arrays.asList(tmp.split("\\s*,\\s*"));

        boolean err = false;
        if(skillSet.size() < 2) {
            err = true;
            errors.push("Atleast 2 Skills required.\n");
        }
        if(err)
            return;
        for(String str: skillSet){
            if(str == null || str.length() == 0){
                errors.push("Atleast 2 Skills required.\n");
                break;
            }
        }
    }



    // random username generation logic
    public static String randomUsername(String name,UserRepository userRepository){


        String tmp = name.replace(" ", "");
        Random rand = new Random();
        Boolean check;
        String tmpUserName="";

        do{
            tmpUserName = tmp+rand.nextInt(10000000);
            check = userRepository.findByUsername(tmpUserName).isPresent();
        }while(check);
        return tmpUserName;
    }



    // random password generation logic
    public static String randomPassword(int len) {
        String AB = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String ab = "abcdefghijklmnopqrstuvwxyz";
        String num = "1234567890";
        String spl = "!@#$%^&*";
        Random rnd = new Random();

        StringBuilder sb = new StringBuilder(len);
        for (int i = 0; i < len; i++) {
            sb.append(AB.charAt(rnd.nextInt(AB.length())));
        }
        for (int i = 0; i < len; i++) {
            sb.append(ab.charAt(rnd.nextInt(ab.length())));
        }
        for (int i = 0; i < len; i++) {
            sb.append(num.charAt(rnd.nextInt(num.length())));
        }
        for (int i = 0; i < len; i++) {
            sb.append(spl.charAt(rnd.nextInt(spl.length())));
        }
        return sb.toString();
    }

}












































//package com.assignment.UserAuthAPI.registration;
//
//import com.assignment.UserAuthAPI.exception.APIexception;
//import com.assignment.UserAuthAPI.models.Address;
//import com.assignment.UserAuthAPI.models.UserInfo;
//import com.assignment.UserAuthAPI.user.User;
//import com.assignment.UserAuthAPI.user.UserRepository;
//import com.assignment.UserAuthAPI.user.UserService;
//import lombok.AllArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.HttpStatusCodeException;
//
//import java.util.Arrays;
//import java.util.List;
//import java.util.Random;
//import java.util.Stack;
//import java.util.regex.Matcher;
//import java.util.regex.Pattern;
//
//@AllArgsConstructor
//@Service
//public class RegistrationService {
//
//    private final UserService userService;
//    private final UserRepository userRepository;
//    public String register(RegistrationRequest request) {
//
//        Stack<String> errors = new Stack<>();       // stack to store errors
//
//
//        // getting variables from request object
//        UserInfo userInfo = request.getUserInfo();
//        Long id = request.getId();
//        String username = request.getUsername();
//        String password = request.getPassword();
//        Address current_address = request.getUserInfo().getCurrent_address();
//        Address permanent_address = request.getUserInfo().getPermanent_address();
//        String emergency_number = request.getUserInfo().getEmergency_number();
//        String name=request.getUserInfo().getName();
//        String permanent_pin=request.getUserInfo().getPermanent_address().getPincode();
//        String skills = request.getUserInfo().getSkills();
//
//        // boolean to store if current address is null, will be used to decide if current address need separate validation
//        Boolean isCurrentAddressNull = false;
//
//        //checking if current address field is completely blank, if completely blank copy permanent address into current address
//        if(current_address.getLine_one()==null
//                && current_address.getLine_two()==null
//                && current_address.getPincode()==null
//                && current_address.getCity()==null
//                && current_address.getState()==null){
//            isCurrentAddressNull=true;
//            System.out.println(current_address.toString());
//            current_address=request.getUserInfo().getPermanent_address();
//            System.out.println(current_address.toString());
//            userInfo.setCurrent_address(current_address);
//        }
//        // current pincode assigned separately as it would cause error if current address is blank
//        String current_pin=current_address.getPincode();
//        Boolean isUsernameGenerated=false;
//        Boolean isPasswordGenerated=false;
//        // checking if password is empty, if empty, generate random password
//        if (password.isEmpty()){
//            isPasswordGenerated=true;
//            password= randomPassword(3);
//        }
//        System.out.println(userRepository.findAll().toString());
//        System.out.println("user here ::: " +userRepository.findByUsername(username).toString());
//        boolean userExists = userRepository.
//                findByUsername(username)
//                .isPresent();
//        if(userExists)
//        {
//            //throw new APIexception("User Name already taken");
//            System.out.println("user already present");
//           errors.push("User already Present");
//
//        }
//
//
//        // checking if username is empty, if empty, generate random username
//        if(username.isEmpty()){
//            isUsernameGenerated=true;
//            username= randomUsername(request.getUserInfo().getName(),userRepository);
//        }
//
//        // sending varialbles for validation
//        validate(name,password,current_pin,permanent_pin,skills,emergency_number,errors,current_address,permanent_address,isCurrentAddressNull);
//
//
//        //check if error stack is empty, if not throw custom APIexception
//        if(!errors.isEmpty())
//        {
//            throw new APIexception(errors.toString());
//        }
//        // validation passed, call signup user to create account
//        String str = userService.signUpUser(new User(id, username, password, userInfo));
//        if(isUsernameGenerated)
//        {
//            str+=" Your username is "+username;
//        }
//        if(isPasswordGenerated){
//            str+=" your password is "+password;
//        }
//        return str;
//    }
//
//
//    // validation logic
//    public ResponseEntity<Object> validate(String name,String password,String current_pin,String permanent_pin,String skills, String emergency_number,
//                                           Stack<String> errors, Address current_address,Address permanent_address,Boolean isCurrentAddressNull){
//        //Stack<IllegalArgumentException> errors = new Stack<>();
//        if(name.isEmpty())
//        {
//            //System.out.println("\nname empty");
//            errors.push("name is required\n");
//            //throw new IllegalArgumentException("You must enter a name");
//        }
//        Pattern p = Pattern.compile("[^a-z0-9 ]", Pattern.CASE_INSENSITIVE);
//        Matcher m = p.matcher(name);
//        Boolean b = m.find();
//
//        if(b){
//            //System.out.println("its the name");
//            errors.push("Invalid name, name cannot contain special characters.\n");
//            //throw new IllegalArgumentException("Special characters are not allowed");
//
//            //return new ResponseEntity<>("Name contains Illegal characters",HttpStatus.NOT_ACCEPTABLE);
//        }
//
//        String AB = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//        String ab = "abcdefghijklmnopqrstuvwxyz";
//        String num = "1234567890";
//        String spl = "!@#$%^&*";
//        Integer caps=0;
//        Integer small = 0;
//        Integer numbers=0;
//        Integer special = 0;
//        for(int i=0;i<password.length();i++){
//            if(AB.contains(Character.toString(password.charAt(i)))){
//                caps++;
//            }
//            if(ab.contains(Character.toString(password.charAt(i)))){
//                small++;
//            }
//            if(num.contains(Character.toString(password.charAt(i)))){
//                numbers++;
//            }
//            if(spl.contains(Character.toString(password.charAt(i)))){
//                special++;
//            }
//        }
//        if(caps*small*numbers*special==0){
//            errors.push("Weak password \n");
//            //throw new IllegalArgumentException("Invalid Password");
//        }
//        else if(password.length()<8){
//            errors.push("Weak password");
//        }
//
//
//        if(!isCurrentAddressNull) {
//            if (current_address.getLine_one() == null) {
//                errors.push("line_one is required");
//            }
//            if (current_address.getCity() == null) {
//                errors.push("city is required");
//            }
//            if (current_address.getState() == null) {
//                errors.push("state is required");
//            }
//            if (current_address.getPincode() == null) {
//                errors.push("pincode is required");
//            }
//        }
//        if (permanent_address.getLine_one() == null) {
//            errors.push("line_one is required");
//        }
//        if (permanent_address.getCity() == null) {
//            errors.push("city is required");
//        }
//        if (permanent_address.getState() == null) {
//            errors.push("state is required");
//        }
//        if (permanent_address.getPincode() == null) {
//            errors.push("pincode is required");
//        }
//
//        if (!(emergency_number.matches("[0-9]+") && emergency_number.length() == 10)){
//            //System.out.println("Its the cpin");
//            errors.push("Emergency Number Invalid\n");
//            //throw new IllegalArgumentException("Emergency Number Invalid");
//            //return new ResponseEntity<>("Invalid PIN code in Current Address",HttpStatus.NOT_ACCEPTABLE);
//        }
//        if(!(current_pin==null))
//            if (!(current_pin.matches("[0-9]+") && current_pin.length() == 6)){
//                //System.out.println("Its the cpin");
//                errors.push("Current Address Pincode is invalid\n");
//                //throw new IllegalArgumentException("Current Address PIN Invalid");
//                //return new ResponseEntity<>("Invalid PIN code in Current Address",HttpStatus.NOT_ACCEPTABLE);
//            }
//        if(!(permanent_pin==null))
//            if (!(permanent_pin.matches("[0-9]+") && permanent_pin.length() == 6)){
//                //System.out.println("its the ppin");
//                errors.push("Permanent Address Pincode is invalid\n");
//                //throw new IllegalArgumentException("Permanent Address Pin Invalid");
//                //return new ResponseEntity<>("Invalid PIN code in Permanent Address",HttpStatus.NOT_ACCEPTABLE);
//            }
//
//        String tmp = skills;
//        System.out.println(skills);
//        List<String> skillSet = Arrays.asList(tmp.split("\\s*,\\s*"));
//        //skillSet = tmp.split(",");
//        if(skillSet.size() < 2) {
//            System.out.println("skillset");
//            errors.push("Atleast 2 Skills required.\n");
//            //throw new IllegalArgumentException("Minimum 2 skills required");
//        }
//
//
//
//
//
//
//
//        return new ResponseEntity<>("Validation Passed",HttpStatus.CREATED);
//
//
//
//
//    }
//
//
//
//    // random username generation logic
//    public static String randomUsername(String name,UserRepository userRepository){
//
//
//        String tmp = name.replace(" ", "");
//        System.out.println("&&&&&&&&&&&&&&&&&&\n");
//        System.out.println(tmp);
//        Random rand = new Random();
//        Boolean check;
//        String tmpUserName="";
//
//        do{
//            tmpUserName = tmp+rand.nextInt(10000000);
//            System.out.println("&&&&&&&&&&&&&&&&&&\n");
//            System.out.println(tmpUserName);
//            check = userRepository.findByUsername(tmpUserName).isPresent();
//        }while(check);
//        System.out.println("*************************\n");
//        System.out.println(tmpUserName);
//        return tmpUserName;
//    }
//
//
//
//    // random password generation logic
//    public static String randomPassword(int len) {
//        String AB = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
//        String ab = "abcdefghijklmnopqrstuvwxyz";
//        String num = "1234567890";
//        String spl = "!@#$%^&*";
//        Random rnd = new Random();
//
//        StringBuilder sb = new StringBuilder(len);
//        for (int i = 0; i < len; i++) {
//            sb.append(AB.charAt(rnd.nextInt(AB.length())));
//        }
//        for (int i = 0; i < len; i++) {
//            sb.append(ab.charAt(rnd.nextInt(ab.length())));
//        }
//        for (int i = 0; i < len; i++) {
//            sb.append(num.charAt(rnd.nextInt(num.length())));
//        }
//        for (int i = 0; i < len; i++) {
//            sb.append(spl.charAt(rnd.nextInt(spl.length())));
//        }
//        return sb.toString();
//    }
//
//}
//
