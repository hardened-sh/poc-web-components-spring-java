package com.example.legado.controller;

import com.example.legado.model.Produto;
import com.example.legado.model.RegraFiscal;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import java.math.BigDecimal;
import java.util.Map;

@Controller
public class ProductController {

    private static final Logger logger = LoggerFactory.getLogger(ProductController.class);

    @GetMapping("/")
    public String index() {
        return "redirect:/produto/1";
    }

    @GetMapping("/produto/{id}")
    public String showProduct(@PathVariable Long id, Model model) {
        logger.info("Exibindo produto ID: {}", id);

        // Simulando busca no banco de dados (Repository pattern recomendado para prod)
        Produto produto = new Produto(
            id, 
            "Notebook Dell Inspiron 15", 
            new BigDecimal("3500.00"),
            "Notebook com processador Intel i7, 16GB RAM, SSD 512GB"
        );
        
        // Simulando regra de negócio fiscal
        RegraFiscal regraFiscal = new RegraFiscal(
            "ICMS-SP",
            new BigDecimal("18.0")
        );
        
        model.addAttribute("produto", produto);
        model.addAttribute("regraFiscal", regraFiscal);
        
        return "product";
    }
    
    @GetMapping("/checkout")
    public String checkout(Model model) {
        return "checkout";
    }

    /**
     * Endpoint API para receber atualizações do Frontend (ex: React Web Component)
     * Demonstra a capacidade de comunicação Backend <- Frontend
     */
    @PostMapping("/api/calculate-tax")
    @ResponseBody
    public Map<String, Object> logCalculation(@RequestBody Map<String, Object> payload) {
        logger.info("Cálculo recebido do client-side: {}", payload);
        // Aqui poderia haver lógica de validação robusta
        return Map.of("status", "received", "timestamp", System.currentTimeMillis());
    }
}

