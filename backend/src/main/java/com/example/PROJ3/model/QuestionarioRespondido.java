package com.example.PROJ3.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
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

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @JoinColumn(name = "questionario_respondido_id", nullable = true)
    private List<RespostaUsuario> respostas;

    private LocalDateTime timestamp;

    public QuestionarioRespondido(int userId, int questionarioId, List<RespostaUsuario> respostas) {
        this.userId = userId;
        this.questionarioId = questionarioId;
        this.respostas = respostas;
        this.timestamp = LocalDateTime.now();
    }

    @PrePersist
    protected void onCreate() {
        if (this.timestamp == null) {
            this.timestamp = LocalDateTime.now();
        }
    }
}