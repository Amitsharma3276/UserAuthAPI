package com.assignment.UserAuthAPI.user;

import com.assignment.UserAuthAPI.registration.token.ConfirmationTokenService;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@AllArgsConstructor
public class UserService implements UserDetailsService {


    private final static String USER_NOT_FOUND_MESSAGE
            = "User with Email %s not found";
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final ConfirmationTokenService confirmationTokenService;
    @Override
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(()->
                        new UsernameNotFoundException
                                (String.format(USER_NOT_FOUND_MESSAGE,username)));
    }
    public String signUpUser(User user){
//        boolean userExists = userRepository.
//                findByUsername(user.getUsername())
//                .isPresent();
//        if(userExists)
//        {
//            //throw new APIexception("User Name already taken");
//            System.out.println("user already present");
//           throw new HttpStatusCodeException(HttpStatus.CONFLICT,"Username Already Exists")
//            {
//            };
//
//        }
        String encodedPassword = bCryptPasswordEncoder
                .encode(user.getPassword());


        user.setPassword(encodedPassword);

        userRepository.save(user);


        return " ";
    }
}
