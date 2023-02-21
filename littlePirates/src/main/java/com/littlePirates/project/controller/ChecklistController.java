package com.littlePirates.project.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.littlePirates.project.model.ChecklistVO;
import com.littlePirates.project.service.ChecklistService;

@Controller
public class ChecklistController {

	@Autowired
	ChecklistService service;

	@RequestMapping("/checkList/checkList_Manner")
	public String checkList_Manner(Model model,HttpSession session) {
		String memId = (String) session.getAttribute("sid");
		if (memId != null) {
		ArrayList<ChecklistVO> voList = service.checklistInfo(memId);
		model.addAttribute("voList", voList);
		System.out.println(memId);
		return "/menu/checkList/checkList_Manner";
		}
		else {
			return"redirect:/member/login";	
		}
	}

	// 빙고 체크리스트 최초생성
	@RequestMapping("/checkList/checkList_Clean")
	public String checkList_Clean(HttpSession session, Model model) {
		// memId에 저장
		// 로그인 성공 시 설정한 세션 sid 값 가져와서 사용
		String memId = (String) session.getAttribute("sid");
		if (memId != null) {
			
			ChecklistVO vo = new ChecklistVO();
			// (1) 체크리스트가 존재 하는지 확인 (생성 날짜가 없으면 없는 것)
			int count = service.ischhChecked(memId);
			int chhTimes = vo.getChhTimes();
			String chh_Checked =service.getChh_Checked(memId);
			System.out.println(chh_Checked);
			
			if (count == 0 || chh_Checked !=null) { // (2) 체크리스트 존재하지 않으면(count==0) 체크리스트 추가
				vo.setMemId(memId);
				
				ArrayList<String> rnd = service.checklistInfo2();
				for (int i = 0; i < rnd.size(); i++)
					vo.setChlNo(i, rnd.get(i));
	
				Date now = new Date();
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				String nowTime = sdf.format(now);
				System.out.println(nowTime);
				vo.setChhDate(nowTime);
				
				service.insertChecklist(vo);
				int countMemId = service.searchMemId(memId);
	
				service.insertTimes(memId, countMemId);
	
			} 
			/*
			 * else if(count>0 ){ vo.setMemId(memId); ArrayList<String>
			 * Chl_Checked=service.select_Chl_Checked(memId);
			 * 
			 * }
			 */
			else {
					vo = service.selectChecklist(memId).get(chhTimes);
			}
		
			for (int i = 0; i < 9; i++) {
				String text = service.getChecklistText(vo.getChlNo(i));
				vo.setChlText(i, text);
			}
		
		model.addAttribute("vo", vo);
		return "/menu/checkList/checkList_Clean";
		}
		else {
			return"redirect:/member/login";
		}
	}


	// 체크리스트 통계
	@RequestMapping("/checkList/checkList_Eat")
	public String checkList_Eat(HttpSession session, Model model) {
		String memId = (String) session.getAttribute("sid");
		if (memId != null) {
		
		ArrayList<ChecklistVO> checkList = service.checklistInfo3(memId);
		model.addAttribute("checkList", checkList);
		System.out.println(memId);
		return "/menu/checkList/checkList_Eat";
		}
		
		else {
			return"redirect:/member/login";
		}
	}

	
	@ResponseBody
	@RequestMapping("/checklist/checked")
	public String insert(@RequestParam("checkedNo") int checkedNo, HttpSession session) {

		String memId = (String) session.getAttribute("sid");

		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date now = new Date();
		String nowTime = sdf.format(now);

		String checkDate = service.checkDate(memId, nowTime);
		String result="success";

		if (checkDate == null) {

			String checkNo = service.checkNo(memId, checkedNo);

			if (checkNo == null) {

				service.updateChecked(memId, checkedNo, nowTime);
				// 체크리스트 모두 완료시 체크리스트 빙고 완료 업데이트
				service.update_chhChecked(memId);
			} else {
				result="fail";
			}
		} else {
			result="fail";
		}
		return result;
	}
	
	@ResponseBody
    @RequestMapping("/checkList/checkList_Image")
    public ChecklistVO checklist(Model model, HttpSession session) {
        String memId = (String) session.getAttribute("sid");
        ChecklistVO checklistVO = service.getChecked(memId);
        return checklistVO;
    }

}

