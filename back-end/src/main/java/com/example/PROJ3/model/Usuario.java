package com.example.PROJ3.model;

import com.example.PROJ3.enums.UsuarioTipo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Usuario {
    private int id;
    private String nome;
    private String email;
    private UsuarioTipo tipo;

    public  Usuario(String nome, String email, UsuarioTipo tipo) {
        this.nome = nome;
        this.email = email;
        this.tipo = tipo;
    }
}
