package com.assignment.UserAuthAPI.models;


import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@EqualsAndHashCode
@Entity
@AllArgsConstructor
@Table(name = "address")
@ToString
public class Address {
    @SequenceGenerator(
            name = "address_sequence",
            sequenceName = "address_sequence",
            allocationSize = 1
    )
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "address_sequence")
    private Long id;
    private String line_one;
    private String line_two;
    private String city;
    private String pincode;
    private String state;
    public Address(){

    }

    public String getPincode() {
        return pincode;
    }

}

