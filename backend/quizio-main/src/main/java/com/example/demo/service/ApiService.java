package com.example.demo.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.models.Question;
import com.example.demo.models.Quiz;
import com.example.demo.models.QuizReport;
import com.example.demo.models.User;
import com.example.demo.repository.QuestionRepo;
import com.example.demo.repository.QuizRepo;
import com.example.demo.repository.ReportRepo;
import com.example.demo.repository.UserRepo;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class ApiService {
	private final UserRepo userrepo;
	private final ReportRepo reportrepo;
	private final QuestionRepo questionrepo;
	private final QuizRepo quizrepo;
	
	public User createUser(User user) {
		user.setPassword(HasherUtil.hashPassword(user.getPassword(),"SHA-256"));
		return userrepo.save(user);
	}
	
	public Quiz createQuiz(int id,List<Question> q) {
		int t=0;
		for(Question i:q) {
			questionrepo.save(i);
			t+=10;
		}
		Quiz quiz=new Quiz();
		quiz.setParticipants(0);
		quiz.setQB(q);
		quiz.setTotal(t);
		quiz.setCreatedOn(LocalDateTime.now());
		quiz.setCreatedBy(id);
		return quizrepo.save(quiz);
	}
	
	public QuizReport attendQuiz(int qid,int uid,HashMap<String,String> answers) {
		int score=0;
		Quiz q=quizrepo.findById(qid).get();
		q.setParticipants(q.getParticipants()+1);
		for(Question i:q.getQB()) {
			if(answers.containsKey(i.getQuestion()) && answers.get(i.getQuestion()).equals(i.getCorrectAnswer()))
				score+=10;
		}
		User user=userrepo.findById(uid).get();
		List<Integer> attended=user.getAttendedQuizes()!=null?user.getAttendedQuizes():new ArrayList<>();
		attended.add(qid);
		user.setAttendedQuizes(attended);
		userrepo.save(user);
		QuizReport report=QuizReport.builder()
				.attendedOn(LocalDateTime.now())
				.score(score)
				.userid(uid)
				.total(q.getTotal())
				.name(user.getFullname()+"( "+user.getUsername()+" )")
				.quizcode(qid).build();
		quizrepo.save(q);
		return reportrepo.save(report);
	}
	
	public List<Quiz> createdQuizes(int id){
		return quizrepo.findByCreatedBy(id);
	}
	
	public List<QuizReport> attendedQuizes(int id){
		return reportrepo.findByUserid(id);
	}

	public List<QuizReport> topTen(int qid){
		return reportrepo.findTopTen(qid);
	}
	
	public User login(String username,String password) {
		User db=userrepo.findByUsername(username).get();
		if(HasherUtil.verifyPassword(password, db.getPassword(),"SHA-256"))
		return db;
		return null;
	}

	public List<Question> getQuiz(int qid) {
		return quizrepo.findById(qid).get().getQB();
	}

	public boolean checkTaken(int qid, int uid) {
		return userrepo.findById(uid).get().getAttendedQuizes()!=null && userrepo.findById(uid).get().getAttendedQuizes().contains(qid);
	}
	
	public boolean quizExists(int qid) {
		return quizrepo.existsById(qid);
	}
}
