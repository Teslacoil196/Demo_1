package com.TeslaCoil196.Final_v2.Controller_rest;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.TeslaCoil196.Final_v2.Entities.Status;
import com.TeslaCoil196.Final_v2.Servie_service.Candidate_service;
import com.TeslaCoil196.Final_v2.Servie_service.Login_service;
import com.TeslaCoil196.Final_v2.payload.Candidate_dto;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200/")
public class Controller_controller {
	
	@Autowired
	Candidate_service cs;
	
	@Autowired
	Login_service css;
	

	
	
	@PostMapping("/new_candy")
	public ResponseEntity<Candidate_dto> creater_candidate(@RequestBody Candidate_dto cto){
		
		Candidate_dto new_candidate = cs.create_candidate(cto);
		return new ResponseEntity<>(new_candidate,HttpStatus.CREATED);
	}
	
	@GetMapping("/ALL")
	public ResponseEntity<List<Candidate_dto>> All_candies(){
		List<Candidate_dto> LL = cs.getAllCandidates();
		
		return new ResponseEntity<>(LL,HttpStatus.FOUND);
	}

	@GetMapping("/delete/{wgsid}")
	public ResponseEntity<?> deleter(@PathVariable("wgsid") String wgsid){
		cs.delete_candidate(wgsid);
		return new ResponseEntity<>(Map.of("message","User was successfully deleated"),HttpStatus.OK);
	}
	
	@PutMapping("/update/{wgsid}")
	public ResponseEntity<Candidate_dto> update(@RequestBody Candidate_dto cdt, @PathVariable("wgsid") String wgsid) throws Exception{
		Candidate_dto de = cs.update_candidate(cdt, wgsid);
		return new ResponseEntity<>(de,HttpStatus.ACCEPTED);
	}
	
	@GetMapping("/get_one/{wgsid}")
	public ResponseEntity<Candidate_dto> find_one(@PathVariable("wgsid")String wgsid) throws Exception{
		Candidate_dto ess = cs.getCandidateByWGSID(wgsid);
		return new ResponseEntity<>(ess, HttpStatus.OK);
	}
	
	@PutMapping("/updateStatus/{wgsid}/{new_status}")
	public ResponseEntity<?> update_status(@PathVariable("wgsid") String wgsid, @PathVariable("new_status") String new_status){
		
		cs.chnage_status(new_status, wgsid);
		return new ResponseEntity<>(Map.of("message","Candidate status was successfully updated"),HttpStatus.OK);
		
	}
	
	@PutMapping("/updateStatus")
    public String upStatus(@RequestBody Status statusObj){
        cs.chnage_status(statusObj.getStat(), statusObj.getId());
        return "message";   
    }
	
	
	@PutMapping("/updateStatus_1/{wgsid}")
	public ResponseEntity<?> update_status__1(@RequestBody Candidate_dto car ,@PathVariable("wgsid") String wgsid) throws Exception{
		
//		System.out.println("wgsid: "+wgsid);
//		System.out.println("new status: "+ car.getStatus());
		
		cs.status_status(car, wgsid);
		return new ResponseEntity<>(Map.of("message","Candidate status was successfully updated"),HttpStatus.OK);
		
	}
	
	@GetMapping("/all_2")
	public List<Candidate_dto> all_candies(){
		System.out.println("All 2 ran ");
		List<Candidate_dto> LL = cs.getAllCandidates();
		
		return LL;
	}
}

