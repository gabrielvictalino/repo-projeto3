package com.example.PROJ3.service;

import com.example.PROJ3.model.Feedback;
import com.example.PROJ3.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public Feedback save(Feedback feedback) {
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> findByUserId(int userId) {
        return feedbackRepository.findByUserId(userId);
    }
    
    public Feedback markAsRead(int id) {
        return feedbackRepository.findById(id).map(feedback -> {
            feedback.setRead(true);
            return feedbackRepository.save(feedback);
        }).orElse(null);
    }
}
