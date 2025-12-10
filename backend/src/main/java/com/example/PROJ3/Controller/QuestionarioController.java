package com.example.PROJ3.Controller;

import com.example.PROJ3.model.Questionario;
import com.example.PROJ3.service.QuestionarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/questionarios")
public class QuestionarioController {

    @Autowired
    private QuestionarioService questionarioService;

    @GetMapping("/find/all")
    public ResponseEntity<List<Questionario>> getAllQuestionarios() {
        if (questionarioService.findAll().isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(questionarioService.findAll());
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<Questionario> getQuestionarioById(@PathVariable int id) {
        return questionarioService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/find/active")
    public ResponseEntity<List<Questionario>> getActiveQuestionarios() {
        List<Questionario> ativos = questionarioService.listarAtivos();
        if (ativos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(ativos);
    }

    @PostMapping("/submit")
    public Questionario createQuestionario(@RequestBody Questionario questionario) {
        return questionarioService.save(questionario);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Questionario> updateQuestionario(@PathVariable int id,
            @RequestBody Questionario questionarioDetails) {
        Questionario updatedQuestionario = questionarioService.update(id, questionarioDetails);
        if (updatedQuestionario != null) {
            return ResponseEntity.ok(updatedQuestionario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteQuestionario(@PathVariable int id) {
        if (questionarioService.delete(id)) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/activate/{id}")
    public ResponseEntity<Questionario> activateQuestionario(@PathVariable int id) {
        Questionario updatedQuestionario = questionarioService.activateQuestionario(id);
        if (updatedQuestionario != null) {
            return ResponseEntity.ok(updatedQuestionario);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
