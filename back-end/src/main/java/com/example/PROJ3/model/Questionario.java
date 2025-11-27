package com.example.PROJ3.model;

import com.example.PROJ3.enums.QuestionarioStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Questionario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String titulo;

    @Enumerated(EnumType.STRING)
    private QuestionarioStatus status = QuestionarioStatus.INATIVO;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "questionario_id")
    private List<Pergunta> perguntas;

    public Questionario(String titulo, List<Pergunta> perguntas) {
        this.titulo = titulo;
        this.perguntas = perguntas;
    }

    public Questionario(String titulo, QuestionarioStatus status, List<Pergunta> perguntas) {
        this.titulo = titulo;
        this.status = status;
        this.perguntas = perguntas;
    }

}