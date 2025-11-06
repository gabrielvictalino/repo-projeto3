package com.projeto3.controller;

import com.projeto3.model.Feedback;
import com.projeto3.service.FeedbackService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/feedback")
public class FeedbackController {

    @Autowired
    private FeedbackService feedbackService;

    @GetMapping("/{surveyId}")
    public String showFeedback(@PathVariable String surveyId, HttpSession session, Model model) {
        
        String userName = (String) session.getAttribute("userName");
        if (userName == null) {
            return "redirect:/login";
        }

        
        boolean surveyCompleted = feedbackService.isSurveyCompleted(surveyId, userName);
        
        model.addAttribute("userName", userName);
        model.addAttribute("surveyCompleted", surveyCompleted);
        
        if (surveyCompleted) {
            Feedback feedback = feedbackService.getFeedbackData(surveyId);
            model.addAttribute("surveyTitle", feedback.getSurveyTitle());
            model.addAttribute("responseRate", feedback.getResponseRate());
            model.addAttribute("totalParticipants", feedback.getTotalParticipants());
            model.addAttribute("averageTime", feedback.getAverageTime());
            model.addAttribute("barChartData", feedback.getBarChartData());
            model.addAttribute("pieChartData", feedback.getPieChartData());
        }

        return "feedback";
    }
}
