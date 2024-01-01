package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Question;

public interface QuestionRepo extends JpaRepository<Question,Integer>{

}
