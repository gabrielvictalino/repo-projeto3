package com.example.PROJ3.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class QuestionarioRespondido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int userId;

    private int questionarioId;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "questionario_respondido_id")
    private List<RespostaUsuario> respostas;

    public QuestionarioRespondido(int userId, int questionarioId, List<RespostaUsuario> respostas) {
        this.userId = userId;
        this.questionarioId = questionarioId;
        this.respostas = respostas;
    }
}