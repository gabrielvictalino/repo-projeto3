package com.example.PROJ3.service;

import com.example.PROJ3.model.Questionario;
import com.example.PROJ3.model.QuestionarioRespondido;
import com.example.PROJ3.model.RespostaUsuario;
import com.example.PROJ3.repository.QuestionarioRepository;
import com.example.PROJ3.repository.QuestionarioRespondidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionarioRespondidoService {

    @Autowired
    private QuestionarioRespondidoRepository questionarioRespondidoRepository;

    @Autowired
    private QuestionarioRepository questionarioRepository;

    public QuestionarioRespondido submitResponse(com.example.PROJ3.DTO.QuestionarioSubmissionDTO submissionDTO) {
        Questionario questionario = questionarioRepository.findById(submissionDTO.getQuestionarioId()).orElse(null);
        if (questionario == null || questionario.getStatus() != com.example.PROJ3.enums.QuestionarioStatus.ATIVO) {
            return null;
        }

        java.util.List<Integer> validPerguntaIds = questionario.getPerguntas().stream()
                .map(com.example.PROJ3.model.Pergunta::getId)
                .collect(Collectors.toList());

        boolean allQuestionsValid = submissionDTO.getRespostas().stream()
                .allMatch(dto -> validPerguntaIds.contains(dto.getPerguntaId()));

        if (!allQuestionsValid) {
            return null;
        }

        List<RespostaUsuario> respostaUsuarios = submissionDTO.getRespostas().stream()
                .map(dto -> new RespostaUsuario(dto.getPerguntaId(), dto.getResposta()))
                .collect(Collectors.toList());

        QuestionarioRespondido questionarioRespondido = new QuestionarioRespondido(submissionDTO.getUserId(),
                questionario.getId(),
                respostaUsuarios);
        return questionarioRespondidoRepository.save(questionarioRespondido);
    }

    public List<QuestionarioRespondido> findAllByQuestionarioId(int questionarioId) {
        return questionarioRespondidoRepository.findByQuestionarioId(questionarioId);
    }

    public List<QuestionarioRespondido> findAllByUserId(int userId) {
        return questionarioRespondidoRepository.findByUserId(userId);
    }

    public java.util.Optional<QuestionarioRespondido> findById(int id) {
        return questionarioRespondidoRepository.findById(id);
    }

    public List<QuestionarioRespondido> findAll() {
        return questionarioRespondidoRepository.findAll();
    }

    public boolean delete(int id) {
        if (questionarioRespondidoRepository.existsById(id)) {
            questionarioRespondidoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public QuestionarioRespondido update(int id, List<com.example.PROJ3.DTO.RespostaDTO> newAnswers) {
        return questionarioRespondidoRepository.findById(id).map(qr -> {
            newAnswers.forEach(dto -> {
                qr.getRespostas().stream()
                        .filter(r -> r.getPerguntaId() == dto.getPerguntaId())
                        .findFirst()
                        .ifPresentOrElse(
                                r -> r.setResposta(dto.getResposta()),
                                () -> qr.getRespostas()
                                        .add(new RespostaUsuario(dto.getPerguntaId(), dto.getResposta())));
            });
            return questionarioRespondidoRepository.save(qr);
        }).orElse(null);
    }
}
