package com.example.PROJ3.Controller;

import com.example.PROJ3.model.QuestionarioRespondido;
import com.example.PROJ3.service.QuestionarioRespondidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/respostas")
public class QuestionarioRespondidoController {

    @Autowired
    private QuestionarioRespondidoService questionarioRespondidoService;

    @GetMapping("/find/all/{questionarioId}")
    public ResponseEntity<java.util.List<QuestionarioRespondido>> getAllResponsesByQuestionarioId(
            @PathVariable int questionarioId) {
        java.util.List<QuestionarioRespondido> responses = questionarioRespondidoService
                .findAllByQuestionarioId(questionarioId);
        if (responses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<QuestionarioRespondido> getResponseById(@PathVariable int id) {
        return questionarioRespondidoService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/submit")
    public ResponseEntity<QuestionarioRespondido> submitResponse(
            @RequestBody com.example.PROJ3.DTO.QuestionarioSubmissionDTO submissionDTO) {
        QuestionarioRespondido savedResponse = questionarioRespondidoService.submitResponse(submissionDTO);

        if (savedResponse != null) {
            return ResponseEntity.ok(savedResponse);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<QuestionarioRespondido> updateResponse(@PathVariable int id,
            @RequestBody java.util.List<com.example.PROJ3.DTO.RespostaDTO> newAnswers) {
        QuestionarioRespondido updatedResponse = questionarioRespondidoService.update(id, newAnswers);
        if (updatedResponse != null) {
            return ResponseEntity.ok(updatedResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteResponse(@PathVariable int id) {
        if (questionarioRespondidoService.delete(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
