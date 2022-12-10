package com.assignment.UserAuthAPI.home;


import com.assignment.UserAuthAPI.registration.token.ConfirmationToken;
import com.assignment.UserAuthAPI.registration.token.ConfirmationTokenService;
import com.assignment.UserAuthAPI.user.User;
import com.assignment.UserAuthAPI.user.UserRepository;
import lombok.AllArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.InvalidParameterException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping(path = "user/")
@AllArgsConstructor
public class HomeController {
    private UserRepository userRepository;
    private final ConfirmationTokenService confirmationTokenService;
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping("/dashboard")

    public String dashboard() {
        String token="";
        if (SecurityContextHolder.getContext().getAuthentication() != null
                && SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {


            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            if(principal instanceof User)
            {
                    String pin=((User) principal).getUser().getCurrent_address().getPincode();
                    String date=getDate();
                    final String uri = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin"
                                       + "?pincode="+pin+"&date="+date;


                    try{
                        RestTemplate restTemplate = new RestTemplate();
                        String content = restTemplate.getForObject(uri, String.class);
                        Files.write(Paths.get("./apiResponse.txt"),content.getBytes(StandardCharsets.UTF_8));
                        String result = Files.readString(Paths.get("apiResponse.txt"), StandardCharsets.US_ASCII);

                        JSONObject json = new JSONObject(result.toString());
                        JSONArray arr = json.getJSONArray("sessions");
                        HashMap<String,String> name_fee = new HashMap<>();
                        for(int i=0;i<arr.length();i++){
                            JSONObject tmp=arr.getJSONObject(i);
                            name_fee.put(tmp.get("name").toString(),tmp.get("fee_type").toString());
                            System.out.println(name_fee.toString());


                        }
                        token = UUID.randomUUID().toString();
                        ConfirmationToken confirmationToken = new ConfirmationToken(
                                token,
                                LocalDateTime.now(),
                                LocalDateTime.now().plusMinutes(15),
                                (User) principal
                        );
                        confirmationTokenService.saveConfirmationToken(confirmationToken);
                        String returnToken=token.replace("-","").substring(0, Math.min(token.length(), 15));
                        String UserName = SecurityContextHolder.getContext().getAuthentication().getName();
                        String finalResponse=name_fee.toString() + "#token : "+returnToken + "#username : "+UserName;
                        Files.write(Paths.get("./finalResponse.txt"),finalResponse.getBytes(StandardCharsets.UTF_8));
                        return name_fee.toString() + "#token : "+returnToken + "#username : "+UserName;
                    }
                    catch (Exception e){
                        return e.getMessage();
                    }

                }

            else{
                return "User type mismatch";
            }

        }
        else
        {
            return "Authentication Error";
        }

    }



    public ResponseEntity<Object> verifyResponse(String result){
        if(result.startsWith("400 Bad Request")){
            throw new InvalidParameterException("Invalid API call check entered data");
        }
        else
        {
            return new ResponseEntity<>("API call successful", HttpStatus.OK);
        }
    }
    @GetMapping("/del")
    public String del() throws IOException{
        String overwrite = "Unauthorized";
        Files.write(Paths.get("./finalResponse.txt"),overwrite.getBytes(StandardCharsets.UTF_8));
        return "cleared";
    }
    @GetMapping("/dashboard/data")
    public String getAPIdata() throws IOException {
//        if(SecurityContextHolder.getContext().getAuthentication() != null
//           && SecurityContextHolder.getContext().getAuthentication().getName()!="anonymousUser") {

            String result = Files.readString(Paths.get("finalResponse.txt"), StandardCharsets.US_ASCII);
            return result;
//        }
//        return "You must login to see this page";
    }

    public String getDate() {
            Date date = new Date();
            SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
            String strDate= formatter.format(date);
            return strDate;

    }
}
