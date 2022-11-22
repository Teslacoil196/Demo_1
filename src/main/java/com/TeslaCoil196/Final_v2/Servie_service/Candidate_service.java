package com.TeslaCoil196.Final_v2.Servie_service;

import java.util.List;

import com.TeslaCoil196.Final_v2.payload.Candidate_dto;

public interface Candidate_service {
	
	Candidate_dto create_candidate(Candidate_dto candii);
	
	Candidate_dto update_candidate(Candidate_dto cande, String Candiadte_wgsid) throws Exception;
	
	Candidate_dto getCandidateByWGSID(String can_wgsid) throws Exception;
	
	List<Candidate_dto> getAllCandidates();
	
	void delete_candidate(String can_wgsid);
	
	void chnage_status(String status_new, String candidate_wgsid);
	
	Candidate_dto status_status(Candidate_dto cande, String candidate_wgsid) throws Exception;

}
