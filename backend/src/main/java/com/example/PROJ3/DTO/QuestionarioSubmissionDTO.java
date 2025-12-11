package com.example.PROJ3.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionarioSubmissionDTO {
    private int questionarioId;
    private int userId;
    private List<RespostaDTO> respostas;
    private LocalDateTime timestamp;
}
