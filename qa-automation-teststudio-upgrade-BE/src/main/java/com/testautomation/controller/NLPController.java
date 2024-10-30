package com.testautomation.controller;

import com.testautomation.dto.NLPRequest;
import com.testautomation.dto.NLPResponse;
import com.testautomation.service.OpenAIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/nlp")
public class NLPController {

    @Autowired
    private OpenAIService openAIService;

    @PostMapping("/generateTestCase")
    public Mono<ResponseEntity<NLPResponse>> generateTestCase(@RequestBody NLPRequest nlpRequest) {
        return openAIService.generateTestCase(nlpRequest)
            .map(ResponseEntity::ok)
            .onErrorResume(e -> Mono.just(ResponseEntity.status(500).body(new NLPResponse("Error: " + e.getMessage()))));
    }
}
