package com.nathan.crud_spring.model;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Entity
public class Course {
    
    @Id
    @GeneratedValue( strategy = GenerationType.AUTO)
    @JsonProperty("_id")
    private Long id;

    @NotBlank
    @NotNull
    @Size(min = 5, max = 100)
    @Column(name = "nome", length = 100, nullable = false)
    private String name;

    @NotNull
    @Size(max = 10)
    @Pattern(regexp = "Back-end|Front-end")
    @Column(name = "categoria", length = 10, nullable = false)
    private String category;

}
