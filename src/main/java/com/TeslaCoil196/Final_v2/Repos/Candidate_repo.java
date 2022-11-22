package com.TeslaCoil196.Final_v2.Repos;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.TeslaCoil196.Final_v2.Entities.Candidate;

@Repository
public interface Candidate_repo extends JpaRepository<Candidate, String> {

	
	@Transactional
	@Modifying
	@Query("UPDATE Candidate set status=:new_status where wgsid=:cid")
	public void changeStatus(@Param("new_status") String new_status,@Param("cid") String cid);


}
