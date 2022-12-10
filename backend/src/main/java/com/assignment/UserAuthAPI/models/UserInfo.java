package com.assignment.UserAuthAPI.models;


import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@Entity

@ToString
public class UserInfo {
    @SequenceGenerator(
            name = "user_info_sequence",
            sequenceName = "user_info_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "user_info_sequence")

    private Long id;
    private String name;
    private Boolean vaccinated;
    private String emergency_number;
    private String skills;
    @OneToOne(cascade = CascadeType.ALL)
    private Address current_address;
    @OneToOne(cascade = CascadeType.ALL)
    private Address permanent_address;

    public UserInfo(String name,
                    Boolean vaccinated,
                    String emergency_number,
                    String skills,
                    Address current_address, Address permanent_address) {
        this.name = name;
        this.vaccinated = vaccinated;
        this.emergency_number = emergency_number;
        this.skills = skills;
        this.current_address = current_address;
        this.permanent_address = permanent_address;
    }
    }

