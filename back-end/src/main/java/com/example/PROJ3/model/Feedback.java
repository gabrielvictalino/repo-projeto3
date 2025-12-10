package com.example.PROJ3.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int userId;

    private int respostaId;

    private String feedback;

    public Feedback(int userId, int respostaId, String feedback) {
        this.userId = userId;
        this.respostaId = respostaId;
        this.feedback = feedback;
    }

}