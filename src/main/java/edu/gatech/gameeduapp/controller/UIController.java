package edu.gatech.gameeduapp.controller;

import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
//@RequestMapping("edugame")
public class UIController {
 
  @RequestMapping("/web")
  public String login(Map<String, Object> model) {
      return "login";
  }

  @RequestMapping("/register")
  public  String register(Map<String, Object> model) {return "register"; }

  @RequestMapping("/home")
  public  String home(Map<String, Object> model) {return "home"; }

  @RequestMapping("/profile")
  public  String profile(Map<String, Object> model) {return "profile"; }
  
  @RequestMapping("/course")
  public  String course(Map<String, Object> model) {return "course"; }

  @RequestMapping("/chapters")
  public  String chapter(Map<String, Object> model) {return "chapters"; }

  @RequestMapping("/questions")
  public  String questions(Map<String, Object> model) {return "questions"; }

  @RequestMapping("/submission")
  public  String submission(Map<String, Object> model) {return "submission"; }



}

