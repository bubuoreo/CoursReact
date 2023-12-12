package com.cpe.springboot.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.annotation.JmsListener;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserModel;

@Component
public class UserListener {
	
	@Autowired
    JmsTemplate jmsTemplate;
	
	private final UserService userService;
	
	public UserListener(UserService userService) {
		this.userService = userService;
	}
	
    @JmsListener(destination = "fr.cpe.spring-app.user")
    public void receiveUserModelFromQueue(UserModel user) {
    	System.out.println(user.getLastName());
    	
    	userService.updateUser(new UserDTO(user), true);
    }
}
