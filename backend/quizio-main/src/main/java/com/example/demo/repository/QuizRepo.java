package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.Quiz;
import com.example.demo.models.User;

public interface QuizRepo extends JpaRepository<Quiz,Integer>{
	List<Quiz> findByCreatedBy(int userid);
}
