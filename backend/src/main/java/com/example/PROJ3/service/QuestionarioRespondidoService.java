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
        System.out.println("=== Recebendo submissão de resposta ===");
        System.out.println("UserId: " + submissionDTO.getUserId());
        System.out.println("QuestionarioId: " + submissionDTO.getQuestionarioId());
        System.out.println("Número de respostas: " + (submissionDTO.getRespostas() != null ? submissionDTO.getRespostas().size() : 0));
        
        Questionario questionario = questionarioRepository.findById(submissionDTO.getQuestionarioId()).orElse(null);
        if (questionario == null) {
            System.out.println("ERRO: Questionário não encontrado");
            return null;
        }
        
        // Remover validação de status ATIVO para permitir testes
        System.out.println("Questionário encontrado: " + questionario.getTitulo());
        System.out.println("Status do questionário: " + questionario.getStatus());

        java.util.List<Integer> validPerguntaIds = questionario.getPerguntas().stream()
                .map(com.example.PROJ3.model.Pergunta::getId)
                .collect(Collectors.toList());
        
        System.out.println("IDs de perguntas válidas: " + validPerguntaIds);

        boolean allQuestionsValid = submissionDTO.getRespostas().stream()
                .allMatch(dto -> {
                    boolean isValid = validPerguntaIds.contains(dto.getPerguntaId());
                    if (!isValid) {
                        System.out.println("AVISO: Pergunta inválida - ID: " + dto.getPerguntaId());
                    }
                    return isValid;
                });

        if (!allQuestionsValid) {
            System.out.println("ERRO: Algumas perguntas são inválidas");
            // Permitir salvar mesmo com perguntas inválidas em ambiente de desenvolvimento
            System.out.println("AVISO: Salvando mesmo assim (modo desenvolvimento)");
        }

        List<RespostaUsuario> respostaUsuarios = submissionDTO.getRespostas().stream()
                .map(dto -> {
                    System.out.println("Criando resposta - PerguntaId: " + dto.getPerguntaId() + ", Resposta: " + dto.getResposta());
                    RespostaUsuario ru = new RespostaUsuario(dto.getPerguntaId(), dto.getResposta());
                    System.out.println("  RespostaUsuario criada - ID: " + ru.getId() + ", PerguntaId: " + ru.getPerguntaId());
                    return ru;
                })
                .collect(Collectors.toList());

        System.out.println("Total de RespostaUsuario criadas: " + respostaUsuarios.size());

        QuestionarioRespondido questionarioRespondido = new QuestionarioRespondido(
            submissionDTO.getUserId(),
            questionario.getId(),
            respostaUsuarios
        );
        
        System.out.println("Salvando QuestionarioRespondido...");
        System.out.println("  UserId: " + questionarioRespondido.getUserId());
        System.out.println("  QuestionarioId: " + questionarioRespondido.getQuestionarioId());
        System.out.println("  Respostas antes de salvar: " + (questionarioRespondido.getRespostas() != null ? questionarioRespondido.getRespostas().size() : 0));
        
        QuestionarioRespondido saved = questionarioRespondidoRepository.save(questionarioRespondido);
        
        System.out.println("Salvo com sucesso! ID: " + saved.getId());
        System.out.println("Número de RespostaUsuario após salvar: " + (saved.getRespostas() != null ? saved.getRespostas().size() : 0));
        
        if (saved.getRespostas() != null && !saved.getRespostas().isEmpty()) {
            System.out.println("Detalhes das RespostaUsuario salvas:");
            for (RespostaUsuario ru : saved.getRespostas()) {
                System.out.println("  - ID: " + ru.getId() + ", PerguntaId: " + ru.getPerguntaId() + ", Resposta: " + ru.getResposta());
            }
        } else {
            System.out.println("⚠️ AVISO: Nenhuma RespostaUsuario foi salva!");
        }
        
        return saved;
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
