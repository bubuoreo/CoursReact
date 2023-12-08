package com.cpe.springboot.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.stereotype.Component;

import com.cpe.springboot.user.model.UserModel;

@Component
public class UserRequester {
	
	@Autowired
    JmsTemplate jmsTemplate;
	
	private static final String QUEUE_KEY = "fr.cpe.spring-app.user";

    public void addUserModelToQueue(UserModel user) {
        System.out.println("[UserRequester] SEND UserModel User=["+user+"]");
        jmsTemplate.convertAndSend(QUEUE_KEY,user);
    }
}
