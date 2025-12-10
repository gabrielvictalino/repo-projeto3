package com.example.PROJ3.service;

import com.example.PROJ3.model.Usuario;
import com.example.PROJ3.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario create(Usuario usuario) {
        return usuarioRepository.save(usuario);
    }

    public List<Usuario> findAll() {
        return usuarioRepository.findAll();
    }

    public Optional<Usuario> findById(int id) {
        return usuarioRepository.findById(id);
    }

    public Usuario update(int id, Usuario usuarioDetails) {
        return usuarioRepository.findById(id).map(usuario -> {
            if (usuarioDetails.getNome() != null) {
                usuario.setNome(usuarioDetails.getNome());
            }
            if (usuarioDetails.getSobrenome() != null) {
                usuario.setSobrenome(usuarioDetails.getSobrenome());
            }
            if (usuarioDetails.getEmail() != null) {
                usuario.setEmail(usuarioDetails.getEmail());
            }
            if (usuarioDetails.getGenero() != null) {
                usuario.setGenero(usuarioDetails.getGenero());
            }
            if (usuarioDetails.getEscolaridade() != null) {
                usuario.setEscolaridade(usuarioDetails.getEscolaridade());
            }
            return usuarioRepository.save(usuario);
        }).orElse(null);
    }

    public boolean delete(int id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
