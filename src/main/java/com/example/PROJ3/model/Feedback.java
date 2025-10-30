package com.example.PROJ3.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class Feedback {
    private int id;
    private String conteudo;
    private LocalDateTime dataHora;

    public Feedback(String conteudo) {
        this.conteudo = conteudo;
        this.dataHora = LocalDateTime.now();
    }
}
