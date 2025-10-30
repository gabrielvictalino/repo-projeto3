package com.example.PROJ3.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Pergunta {
    private int id;
    private String conteudo;

    public Pergunta(String conteudo) {
        this.conteudo = conteudo;
    }
}
