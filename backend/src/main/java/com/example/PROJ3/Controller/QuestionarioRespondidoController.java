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

    @GetMapping("/find/all")
    public ResponseEntity<java.util.List<QuestionarioRespondido>> getAllResponses() {
        java.util.List<QuestionarioRespondido> responses = questionarioRespondidoService.findAll();
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

    @GetMapping("/find/usuario/{userId}")
    public ResponseEntity<java.util.List<QuestionarioRespondido>> getResponsesByUserId(@PathVariable int userId) {
        java.util.List<QuestionarioRespondido> responses = questionarioRespondidoService.findAllByUserId(userId);
        if (responses.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(responses);
    }

    @PostMapping("/submit")
    public ResponseEntity<QuestionarioRespondido> submitResponse(
            @RequestBody com.example.PROJ3.DTO.QuestionarioSubmissionDTO submissionDTO) {
        System.out.println("\n\n==================== CONTROLLER: /api/respostas/submit ====================");
        System.out.println("Request Body recebido:");
        System.out.println("  UserId: " + submissionDTO.getUserId());
        System.out.println("  QuestionarioId: " + submissionDTO.getQuestionarioId());
        System.out.println("  Timestamp: " + submissionDTO.getTimestamp());
        System.out.println("  Respostas: " + (submissionDTO.getRespostas() != null ? submissionDTO.getRespostas().size() + " respostas" : "null"));
        
        if (submissionDTO.getRespostas() != null) {
            for (com.example.PROJ3.DTO.RespostaDTO r : submissionDTO.getRespostas()) {
                System.out.println("    - PerguntaId: " + r.getPerguntaId() + ", Resposta: " + r.getResposta());
            }
        }
        
        QuestionarioRespondido savedResponse = questionarioRespondidoService.submitResponse(submissionDTO);

        if (savedResponse != null) {
            System.out.println("✓ Resposta salva com sucesso! ID: " + savedResponse.getId());
            System.out.println("  Número de RespostaUsuario: " + (savedResponse.getRespostas() != null ? savedResponse.getRespostas().size() : 0));
            System.out.println("===========================================================================\n\n");
            return ResponseEntity.ok(savedResponse);
        } else {
            System.out.println("✗ ERRO ao salvar resposta!");
            System.out.println("===========================================================================\n\n");
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