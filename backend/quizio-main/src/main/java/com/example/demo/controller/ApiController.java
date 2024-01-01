package com.example.demo.controller;

import java.util.HashMap;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.AuthReq;
import com.example.demo.models.Question;
import com.example.demo.models.Quiz;
import com.example.demo.models.QuizReport;
import com.example.demo.models.User;
import com.example.demo.service.ApiService;

import lombok.RequiredArgsConstructor;

@RestController
@CrossOrigin(origins="*")
@RequiredArgsConstructor
public class ApiController {
	private final ApiService service;
	
	@PostMapping("/login")
	User login(@RequestBody AuthReq x) {
		return service.login(x.getUsername(), x.getPassword()); 
	}
	
	@PostMapping("/register")
	User register(@RequestBody User x) {
		return service.createUser(x);
	}
	
	@PostMapping("/quiz/{id}")
	Quiz postQuiz(@PathVariable int id,@RequestBody List<Question> q) {
		return service.createQuiz(id, q);
	}
	
	@GetMapping("/quiz/{qid}")
	List<Question> getQuiz(@PathVariable int qid) {
		return service.getQuiz(qid);
	}
	
	@PostMapping("/take/{qid}/{uid}")
	QuizReport attemptQuiz(@PathVariable int qid,@PathVariable int uid,@RequestBody HashMap<String,String> ans) {
		return service.attendQuiz(qid, uid, ans);
	}
	
	@GetMapping("/checkTaken/{qid}/{uid}")
	boolean hasTaken(@PathVariable int qid,@PathVariable int uid) {
		return service.checkTaken(qid,uid);
	}
	
	@GetMapping("/leaderboard/{qid}")
	List<QuizReport> getLeaderboard(@PathVariable int qid){
		return service.topTen(qid);
	}
	
	@GetMapping("/history/created/{uid}")
	List<Quiz> getCreated(@PathVariable int uid){
		return service.createdQuizes(uid);
	}
	
	@GetMapping("/history/attended/{uid}")
	List<QuizReport> getAttended(@PathVariable int uid){
		return service.attendedQuizes(uid);
	}
	
	@GetMapping("/checkQuiz/{qid}")
	boolean checkQuizExists(@PathVariable int qid) {
		return service.quizExists(qid);
	}
}
