package com.example.demo.models;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class QuizReport {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int attemptId;
	private LocalDateTime attendedOn;
	private int score;
	private int total;
	private int userid;
	private String name;
	private int quizcode;
	
}
