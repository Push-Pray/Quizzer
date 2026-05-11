package com.example.quizzer;

import com.example.quizzer.model.Category;
import com.example.quizzer.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class CategoryRestControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private CategoryRepository categoryRepository;

    @BeforeEach
    void setUp() {
        categoryRepository.deleteAll();
    }

    @Test
    public void getAllCategoriesReturnsEmptyListWhenNoCategoriesExist() throws Exception {
        this.mockMvc.perform(get("/api/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    public void getAllCategoriesReturnsListOfCategoriesWhenCategoriesExist() throws Exception {
        
        Category mathCategory = new Category();
        mathCategory.setName("Math");
        Category scienceCategory = new Category();
        scienceCategory.setName("Science");
        categoryRepository.saveAll(List.of(mathCategory, scienceCategory));

        
        this.mockMvc.perform(get("/api/categories"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].name").value("Math"))
                .andExpect(jsonPath("$[1].name").value("Science"));
    }


    @Test
    public void deleteCategoryReturnsOkWhenCategoryExists() throws Exception {

        Category categoryHistory = new Category();
        categoryHistory.setName("History");
        Category savedCat = categoryRepository.save(categoryHistory);

        
        this.mockMvc.perform(delete("/api/categories/" + savedCat.getId()))
        
                .andExpect(status().isOk())
                .andExpect(content().string("Category deleted successfully."));

    
        assertEquals(0, categoryRepository.count());
    }

    @Test
    public void deleteCategoryReturnsBadRequestWhenCategoryDoesNotExist() throws Exception {
        this.mockMvc.perform(delete("/api/categories/999"))
                .andExpect(status().isBadRequest())
                .andExpect(content().string("Category not found with id: 999"));
    }

}
