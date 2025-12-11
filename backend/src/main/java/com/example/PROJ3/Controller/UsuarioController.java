package com.example.PROJ3.Controller;

import com.example.PROJ3.model.Usuario;
import com.example.PROJ3.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/create")
    public ResponseEntity<Usuario> createUsuario(@RequestBody Usuario usuario) {
        Usuario createdUsuario = usuarioService.create(usuario);
        return ResponseEntity.ok(createdUsuario);
    }

    @GetMapping("/find/all")
    public ResponseEntity<List<Usuario>> getAllUsuarios() {
        List<Usuario> usuarios = usuarioService.findAll();
        if (usuarios.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(usuarios);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Usuario> getUsuarioById(@PathVariable int id) {
        return usuarioService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable int id) {
        if (usuarioService.delete(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/update/{id}")
    public ResponseEntity<Usuario> updateUsuario(@PathVariable int id, @RequestBody Usuario usuarioDetails) {
        Usuario updatedUsuario = usuarioService.update(id, usuarioDetails);
        if (updatedUsuario != null) {
            return ResponseEntity.ok(updatedUsuario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Usuario> login(@RequestBody LoginRequest loginRequest) {
        Usuario usuario = usuarioService.findByEmailAndSenha(loginRequest.getEmail(), loginRequest.getSenha());
        if (usuario != null) {
            return ResponseEntity.ok(usuario);
        }
        return ResponseEntity.status(401).build();
    }

    // Inner class for login request
    public static class LoginRequest {
        private String email;
        private String senha;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getSenha() { return senha; }
        public void setSenha(String senha) { this.senha = senha; }
    }
}
