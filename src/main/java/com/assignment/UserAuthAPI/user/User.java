package com.assignment.UserAuthAPI.user;

import com.assignment.UserAuthAPI.models.UserInfo;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.util.Collection;


@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity
@Table(name="users")
@ToString
public class User implements UserDetails {


    @SequenceGenerator(
            name = "user_sequence",
            sequenceName = "user_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
                    generator = "user_sequence")

    private Long id;
    private String username;
    private String password;
    @OneToOne(cascade = CascadeType.ALL)
    private UserInfo user;

    public User(Long id,String username, String password, UserInfo user) {
        this.id =id;
        this.username = username;
        this.password = password;
        this.user = user;
    }
    //
//    public User(String name,
//                String username,
//                String password,
//                String permanent_address,
//                String current_address,
//                Boolean vaccinated,
//                String emergency_number,
//                String skills) {
//        this.name = name;
//        this.username = username;
//        this.password = password;
//        this.permanent_address = permanent_address;
//        this.current_address = current_address;
//        this.vaccinated = vaccinated;
//        this.emergency_number = emergency_number;
//        this.skills = skills;
//    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}
