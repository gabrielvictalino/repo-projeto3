package com.example.PROJ3.repository;

import com.example.PROJ3.model.QuestionarioRespondido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionarioRespondidoRepository extends JpaRepository<QuestionarioRespondido, Integer> {
    java.util.List<QuestionarioRespondido> findByQuestionarioId(int questionarioId);
}
