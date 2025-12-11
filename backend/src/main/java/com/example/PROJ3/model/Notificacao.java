package com.example.PROJ3.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Notificacao {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    
    private int userId;
    
    private String message;
    
    @Column(name = "is_read")
    private boolean read = false;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "read_at")
    private LocalDateTime readAt;
    
    private String type; // "feedback", "questionnaire", etc.
    
    private Integer relatedId; // ID relacionado (feedback, questionario, etc)
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    public Notificacao(int userId, String message, String type, Integer relatedId) {
        this.userId = userId;
        this.message = message;
        this.type = type;
        this.relatedId = relatedId;
        this.createdAt = LocalDateTime.now();
    }
}
