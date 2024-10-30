package com.testautomation.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import com.testautomation.dto.NLPRequest;
import com.testautomation.dto.NLPResponse;

@Service
public class OpenAIService {

    @Value("${openai.api.key}")  // Inject the API key from application.properties
    private String apiKey;

    private final WebClient webClient;

    public OpenAIService(WebClient.Builder webClientBuilder) {
        this.webClient = webClientBuilder.baseUrl("https://api.openai.com/v1/chat/completions").build();
    }

    public Mono<NLPResponse> generateTestCase(NLPRequest request) {
        return webClient.post()
            .header("Authorization", "Bearer " + apiKey)  // Uses the injected API key
            .bodyValue(buildRequestBody(request))
            .retrieve()
            .bodyToMono(NLPResponse.class);
    }

    // Build the request body for the GPT-4 API
    private GPT4Request buildRequestBody(NLPRequest request) {
        return new GPT4Request("gpt-4", new GPT4Request.Message[]{
            new GPT4Request.Message("user", request.getDescription())
        });
    }

    // DTO for GPT-4 Request
    static class GPT4Request {
        private String model;
        private Message[] messages;

        public GPT4Request(String model, Message[] messages) {
            this.model = model;
            this.messages = messages;
        }

        // Static inner class to represent a message
        static class Message {
            private String role;
            private String content;

            public Message(String role, String content) {
                this.role = role;
                this.content = content;
            }

            // Getters and Setters (optional, but recommended)
            public String getRole() {
                return role;
            }

            public void setRole(String role) {
                this.role = role;
            }

            public String getContent() {
                return content;
            }

            public void setContent(String content) {
                this.content = content;
            }
        }
    }
}
