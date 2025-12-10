package com.example.PROJ3.repository;

import com.example.PROJ3.model.Questionario;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuestionarioRepository extends JpaRepository<Questionario, Integer> {
    List<Questionario> findByStatus(com.example.PROJ3.enums.QuestionarioStatus status);
}
