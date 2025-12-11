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
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int userId;

    private int respostaId;

    private String feedback;
    
    @Column(name = "is_read")
    private boolean read = false;
    
    private LocalDateTime timestamp;

    public Feedback(int userId, int respostaId, String feedback) {
        this.userId = userId;
        this.respostaId = respostaId;
        this.feedback = feedback;
        this.read = false;
        this.timestamp = LocalDateTime.now();
    }
    
    @PrePersist
    protected void onCreate() {
        if (this.timestamp == null) {
            this.timestamp = LocalDateTime.now();
        }
    }

}