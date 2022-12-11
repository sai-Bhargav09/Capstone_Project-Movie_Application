package com.niit.UserMovieService.proxy;

import com.niit.UserMovieService.model.ReportedDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "reported-movie-service",url="localhost:8092")
public interface ReportedProxy {

    @PostMapping("/appli/report/add")
    public ResponseEntity<?> sendMovieToReportedService(@RequestBody ReportedDTO reportedDTO);
}