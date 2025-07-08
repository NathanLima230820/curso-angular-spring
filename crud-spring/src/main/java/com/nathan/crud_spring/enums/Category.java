package com.nathan.crud_spring.enums;

public enum Category {

    BACKEND("Back-End"), FRONTEND("Front-End");

    private String value;

    Category(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    @Override
    public String toString() {
        return value;
    }

    

}
