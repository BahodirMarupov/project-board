package uz.pdp.projectboard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uz.pdp.projectboard.domain.ProjectTask;
import uz.pdp.projectboard.repository.ProjectTaskRepository;

import java.util.Optional;

@Service
public class ProjectTaskService {
    @Autowired
    private ProjectTaskRepository repository;

    public ProjectTask saveOrUpdate(ProjectTask projectTask){
        if (projectTask.getStatus()==null||projectTask.getStatus().equals(""))
            projectTask.setStatus("TO_DO");
        return repository.save(projectTask);
    }

    public Iterable<ProjectTask> getAll() {
        return repository.findAll();
    }

    public ProjectTask getProjectTask(long id) {
        return repository.findById(id).orElseThrow(() -> new IllegalArgumentException("this id not found"));
    }

    public void deleteProjectTask(long id) {
        ProjectTask projectTask=repository.findById(id).orElseThrow(() -> new IllegalArgumentException("This id not found"));
        repository.delete(projectTask);
    }
}
