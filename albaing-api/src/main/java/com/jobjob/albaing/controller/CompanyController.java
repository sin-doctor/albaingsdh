package com.jobjob.albaing.controller;

import com.jobjob.albaing.dto.Company;
import com.jobjob.albaing.dto.JobPost;
import com.jobjob.albaing.service.CompanyServiceImpl;
import com.jobjob.albaing.service.JobPostServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/company")
public class CompanyController {

    @Autowired
    private CompanyServiceImpl companyService;

    @Autowired
    private JobPostServiceImpl jobPostService;

    // 회사 상세 정보 불러오기 (JSON 응답)
    @GetMapping("/{companyId}")
    public ResponseEntity<?> companyDetail(@PathVariable("companyId") long companyId) {
        Company company = companyService.companyDetail(companyId);
        if (company == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(company);
    }

    // 회사의 채용공고 목록 불러오기 (JSON 응답)
    @GetMapping("/{companyId}/job-posts")
    public ResponseEntity<?> getCompanyJobPosts(@PathVariable("companyId") long companyId) {
        List<JobPost> jobPosts = jobPostService.showPosts(companyId);
        return ResponseEntity.ok(jobPosts);
    }

    // 로그인한 회사의 채용공고 목록 불러오기
    @GetMapping("/my-job-posts")
    public ResponseEntity<?> getMyJobPosts(HttpSession session) {
        // 세션에서 로그인한 회사 ID 가져오기
        Long companyId = (Long) session.getAttribute("companyId");

        // 로그인 상태가 아니면 401 에러 반환
        if (companyId == null) {
            Map<String, String> error = new HashMap<>();
            error.put("message", "로그인이 필요합니다.");
            return ResponseEntity.status(401).body(error);
        }

        List<JobPost> jobPosts = jobPostService.showPosts(companyId);
        return ResponseEntity.ok(jobPosts);
    }
}