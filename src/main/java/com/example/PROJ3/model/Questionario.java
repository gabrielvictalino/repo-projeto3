package com.example.PROJ3.model;

import com.example.PROJ3.enums.QuestionarioStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Questionario {
    private int id;
    private String titulo;
    private QuestionarioStatus status;

    public Questionario(String titulo, QuestionarioStatus status) {
        this.titulo = titulo;
        this.status = status;
    }
}
