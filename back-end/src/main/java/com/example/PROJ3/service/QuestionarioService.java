package com.example.PROJ3.service;

import com.example.PROJ3.model.Questionario;
import com.example.PROJ3.repository.QuestionarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QuestionarioService {

    @Autowired
    private QuestionarioRepository questionarioRepository;

    public List<Questionario> findAll() {
        return questionarioRepository.findAll();
    }

    public Optional<Questionario> findById(int id) {
        return questionarioRepository.findById(id);
    }

    @SuppressWarnings("null")
    public Questionario save(Questionario questionario) {
        return questionarioRepository.save(questionario);
    }

    public Questionario update(int id, Questionario questionarioDetails) {
        return questionarioRepository.findById(id).map(questionario -> {
            questionario.setTitulo(questionarioDetails.getTitulo());
            questionario.setStatus(questionarioDetails.getStatus());

            if (questionario.getPerguntas() != null) {
                questionario.getPerguntas().clear();
                if (questionarioDetails.getPerguntas() != null) {
                    questionario.getPerguntas().addAll(questionarioDetails.getPerguntas());
                }
            } else {
                questionario.setPerguntas(questionarioDetails.getPerguntas());
            }

            return questionarioRepository.save(questionario);
        }).orElse(null);
    }

    public boolean delete(int id) {
        if (questionarioRepository.existsById(id)) {
            questionarioRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Questionario activateQuestionario(int id) {
        return questionarioRepository.findById(id).map(questionario -> {
            questionario.setStatus(com.example.PROJ3.enums.QuestionarioStatus.ATIVO);
            return questionarioRepository.save(questionario);
        }).orElse(null);
    }
}
