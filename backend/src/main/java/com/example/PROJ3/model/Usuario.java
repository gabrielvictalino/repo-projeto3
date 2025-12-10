package com.example.PROJ3.model;

import com.example.PROJ3.enums.UsuarioTipo;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.example.PROJ3.enums.UsuarioGenero;
import com.example.PROJ3.enums.UsuarioEscolaridade;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private String cpf;
    private String nome;
    private String sobrenome;
    private String email;
    private UsuarioTipo tipo;
    private UsuarioGenero genero;
    private UsuarioEscolaridade escolaridade;

    public Usuario(String nome, String sobrenome, String email, UsuarioTipo tipo, UsuarioGenero genero,
            UsuarioEscolaridade escolaridade) {
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.tipo = tipo;
        this.genero = genero;
        this.escolaridade = escolaridade;
    }

}
