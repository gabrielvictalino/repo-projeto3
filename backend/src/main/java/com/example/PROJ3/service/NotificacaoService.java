package com.example.PROJ3.service;

import com.example.PROJ3.model.Notificacao;
import com.example.PROJ3.repository.NotificacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class NotificacaoService {

    @Autowired
    private NotificacaoRepository notificacaoRepository;

    public Notificacao save(Notificacao notificacao) {
        return notificacaoRepository.save(notificacao);
    }

    public List<Notificacao> findByUserId(int userId) {
        return notificacaoRepository.findByUserId(userId);
    }

    public List<Notificacao> findUnreadByUserId(int userId) {
        return notificacaoRepository.findByUserIdAndRead(userId, false);
    }

    public Notificacao markAsRead(int id) {
        Optional<Notificacao> notificacao = notificacaoRepository.findById(id);
        if (notificacao.isPresent()) {
            Notificacao n = notificacao.get();
            n.setRead(true);
            n.setReadAt(LocalDateTime.now());
            return notificacaoRepository.save(n);
        }
        return null;
    }

    public void deleteOldReadNotifications(int userId, int hoursOld) {
        LocalDateTime cutoffDate = LocalDateTime.now().minusHours(hoursOld);
        List<Notificacao> oldNotifications = notificacaoRepository
            .findByUserIdAndReadAndCreatedAtBefore(userId, true, cutoffDate);
        notificacaoRepository.deleteAll(oldNotifications);
    }

    public boolean delete(int id) {
        if (notificacaoRepository.existsById(id)) {
            notificacaoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
