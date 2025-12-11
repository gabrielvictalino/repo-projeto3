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
@Table(name = "resposta_usuario")
public class RespostaUsuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int perguntaId;
    
    @Column(nullable = true, columnDefinition = "TEXT")
    private String resposta;
    
    // Este campo será preenchido automaticamente pelo JPA via @JoinColumn
    @Column(name = "questionario_respondido_id")
    private Integer questionarioRespondidoId;

    public RespostaUsuario(int perguntaId, String resposta) {
        this.perguntaId = perguntaId;
        this.resposta = resposta;
    }
}
