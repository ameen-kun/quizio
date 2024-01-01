package com.example.demo.models;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Quiz {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int quizcode;
	private LocalDateTime createdOn;
	private int participants;
	private int total;
	private int createdBy;
	@ManyToMany
	private List<Question> qB;
}
