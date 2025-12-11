package com.example.PROJ3.Controller;

import com.example.PROJ3.model.Notificacao;
import com.example.PROJ3.service.NotificacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notificacoes")
public class NotificacaoController {

    @Autowired
    private NotificacaoService notificacaoService;

    @PostMapping("/create")
    public ResponseEntity<Notificacao> createNotificacao(@RequestBody Notificacao notificacao) {
        Notificacao savedNotificacao = notificacaoService.save(notificacao);
        return ResponseEntity.ok(savedNotificacao);
    }

    @GetMapping("/find/user/{userId}")
    public ResponseEntity<List<Notificacao>> getNotificacoesByUserId(@PathVariable int userId) {
        List<Notificacao> notificacoes = notificacaoService.findByUserId(userId);
        if (notificacoes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(notificacoes);
    }

    @GetMapping("/find/unread/{userId}")
    public ResponseEntity<List<Notificacao>> getUnreadNotificacoesByUserId(@PathVariable int userId) {
        List<Notificacao> notificacoes = notificacaoService.findUnreadByUserId(userId);
        if (notificacoes.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(notificacoes);
    }

    @PatchMapping("/mark-read/{id}")
    public ResponseEntity<Notificacao> markAsRead(@PathVariable int id) {
        Notificacao notificacao = notificacaoService.markAsRead(id);
        if (notificacao != null) {
            return ResponseEntity.ok(notificacao);
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteNotificacao(@PathVariable int id) {
        if (notificacaoService.delete(id)) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/cleanup/user/{userId}/hours/{hours}")
    public ResponseEntity<Void> cleanupOldNotifications(@PathVariable int userId, @PathVariable int hours) {
        notificacaoService.deleteOldReadNotifications(userId, hours);
        return ResponseEntity.noContent().build();
    }
}
