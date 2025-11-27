package com.example.PROJ3.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Notificacao {
    private int id;
    private String mensagem;
    private boolean lida;

    public Notificacao(String mensagem, boolean lida) {
        this.mensagem = mensagem;
        this.lida = lida;
    }
}