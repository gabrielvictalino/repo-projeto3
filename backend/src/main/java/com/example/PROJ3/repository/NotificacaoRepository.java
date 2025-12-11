package com.example.PROJ3.repository;

import com.example.PROJ3.model.Notificacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface NotificacaoRepository extends JpaRepository<Notificacao, Integer> {
    List<Notificacao> findByUserId(int userId);
    List<Notificacao> findByUserIdAndRead(int userId, boolean read);
    List<Notificacao> findByUserIdAndReadAndCreatedAtBefore(int userId, boolean read, LocalDateTime date);
}
