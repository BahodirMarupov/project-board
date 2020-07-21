package uz.pdp.projectboard.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import uz.pdp.projectboard.domain.ProjectTask;
import uz.pdp.projectboard.service.ProjectTaskService;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/board")
@CrossOrigin
public class ProjectTaskController {

    @Autowired
    private ProjectTaskService service;

    @GetMapping()
    public HttpEntity<?> getPTToBoard(){
        return ResponseEntity.status(HttpStatus.OK).body(new ProjectTask(4,"ss","sdf","sdf"));
    }

    @PostMapping()
    public HttpEntity<?> addPTToBoard(@RequestBody@Valid ProjectTask projectTask,BindingResult result){
        if (result.hasErrors()){
            Map<String,String> errorMap=new HashMap<>();

            for(FieldError error:result.getFieldErrors()){
                errorMap.put(error.getField(),error.getDefaultMessage());
            }
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMap);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(service.saveOrUpdate(projectTask));
    }

    @GetMapping("/all")
    public HttpEntity<?> getAll(){
        return ResponseEntity.status(HttpStatus.OK).body(service.getAll());
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getProjectTask(@PathVariable long id){
        return ResponseEntity.ok(service.getProjectTask(id));
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteProjectTask(@PathVariable long id){
        service.deleteProjectTask(id);
        return ResponseEntity.ok("ProjectTask deleted");
    }
}
