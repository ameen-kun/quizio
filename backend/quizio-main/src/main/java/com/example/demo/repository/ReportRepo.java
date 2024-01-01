package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.models.QuizReport;
import com.example.demo.models.User;

public interface ReportRepo extends JpaRepository<QuizReport,Integer>{
	@Query("SELECT x FROM QuizReport x WHERE x.quizcode=?1 ORDER BY x.score DESC")
	List<QuizReport> findTopTen(int qid);
	List<QuizReport> findByUserid(int userid);
}
