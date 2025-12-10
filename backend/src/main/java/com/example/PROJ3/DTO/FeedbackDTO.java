package com.example.PROJ3.DTO;

import java.time.LocalDateTime;

public record FeedbackDTO(
        int id,
        String conteudo,
        LocalDateTime dataHora
) {
}
