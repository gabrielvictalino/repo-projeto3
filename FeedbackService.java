package com.projeto3.service;

import com.projeto3.model.Feedback;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FeedbackService {

    public boolean isSurveyCompleted(String surveyId, String userName) {
        
        return true;
    }

    public Feedback getFeedbackData(String surveyId) {
     
        
        Feedback feedback = new Feedback(
            surveyId,
            "Pesquisa de Satisfação do Produto",
            75.5,
            150,
            "8 min"
        );

        
        List<Map<String, Object>> barChartData = Arrays.asList(
            createBarData("Facilidade de uso", 85),
            createBarData("Design da interface", 78),
            createBarData("Velocidade do sistema", 92),
            createBarData("Suporte ao cliente", 65),
            createBarData("Valor geral", 88)
        );

       
        List<Map<String, Object>> pieChartData = Arrays.asList(
            createPieData("Muito Satisfeito", 30, "var(--primary-color)"),
            createPieData("Satisfeito", 30, "var(--secondary-color)"),
            createPieData("Neutro", 25, "var(--warning-color)"),
            createPieData("Insatisfeito", 15, "var(--danger-color)")
        );

        feedback.setBarChartData(barChartData);
        feedback.setPieChartData(pieChartData);

        return feedback;
    }

    private Map<String, Object> createBarData(String label, int value) {
        Map<String, Object> data = new HashMap<>();
        data.put("label", label);
        data.put("value", value);
        return data;
    }

    private Map<String, Object> createPieData(String label, int value, String color) {
        Map<String, Object> data = new HashMap<>();
        data.put("label", label);
        data.put("value", value);
        data.put("color", color);
        return data;
    }
}
