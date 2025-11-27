package com.example.PROJ3.model;

import com.example.PROJ3.enums.PerguntaTipo;
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
public class Pergunta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String conteudo;
    @Enumerated(EnumType.STRING)
    private PerguntaTipo perguntaTipo;

    public Pergunta(String conteudo, PerguntaTipo perguntaTipo) {
        this.conteudo = conteudo;
        this.perguntaTipo = perguntaTipo;
    }
}
