package com.assignment.UserAuthAPI.registration;


//private String username;
//private String password;
//private String permanent_address;
//private String current_address;
//private Boolean vaccinated;
//private String emergency_number;
//private ArrayList<String> skills;
//


import com.assignment.UserAuthAPI.models.UserInfo;
import lombok.*;

@Getter
@AllArgsConstructor
@EqualsAndHashCode
@ToString
public class RegistrationRequest {
    private final Long id;
    private final String username;
    private final String password;
    private final UserInfo userInfo;
}
