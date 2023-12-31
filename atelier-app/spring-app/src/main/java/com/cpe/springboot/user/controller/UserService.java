package com.cpe.springboot.user.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cpe.springboot.card.Controller.CardModelService;
import com.cpe.springboot.card.model.CardModel;
import com.cpe.springboot.common.tools.DTOMapper;
import com.cpe.springboot.user.model.UserDTO;
import com.cpe.springboot.user.model.UserModel;

@Service
public class UserService {

	private final UserRepository userRepository;
	private final CardModelService cardModelService;
	@Autowired
    private final UserRequester userRequester;

	public UserService(UserRepository userRepository, 
			CardModelService cardModelService, UserRequester userRequester) {
		this.userRepository = userRepository;
		this.cardModelService = cardModelService;
		this.userRequester = userRequester;
	}

	public List<UserModel> getAllUsers() {
		List<UserModel> userList = new ArrayList<>();
		userRepository.findAll().forEach(userList::add);
		return userList;
	}

	public Optional<UserModel> getUser(String id) {
		return userRepository.findById(Integer.valueOf(id));
	}

	public Optional<UserModel> getUser(Integer id) {
		return userRepository.findById(id);
	}

	public UserDTO addUser(UserDTO user, boolean dequeued) {
		UserDTO ret = new UserDTO();
		UserModel u = fromUDtoToUModel(user);
		if (dequeued) {
			UserModel u_saved = userRepository.save(u);
			List<CardModel> cardList = cardModelService.getRandCard(5);
			for (CardModel card : cardList) {
				u_saved.addCard(card);
			}
			UserModel uBd = userRepository.save(u_saved);
			ret = DTOMapper.fromUserModelToUserDTO(uBd);
		}
		else {
			userRequester.addUserModelToAddQueue(u);
		}
		return ret;
	}

	public UserDTO updateUser(UserDTO user, boolean dequeued) {
		UserDTO ret = new UserDTO();
		UserModel u = fromUDtoToUModel(user);
		if (dequeued) {
			UserModel uBd =userRepository.save(u);
			ret = DTOMapper.fromUserModelToUserDTO(uBd);
		}
		else {
			userRequester.addUserModelToUpdateQueue(u);
		}
		return ret;
	}

	public UserDTO updateUser(UserModel user) {
		UserModel uBd = userRepository.save(user);
		return DTOMapper.fromUserModelToUserDTO(uBd);
	}

	public void deleteUser(String id) {
		userRepository.deleteById(Integer.valueOf(id));
	}

	public List<UserModel> getUserByLoginPwd(String login, String pwd) {
		List<UserModel> ulist = null;
		ulist = userRepository.findByLoginAndPwd(login, pwd);
		return ulist;
	}

	private UserModel fromUDtoToUModel(UserDTO user) {
		UserModel u = new UserModel(user);
		List<CardModel> cardList = new ArrayList<CardModel>();
		for (Integer cardId : user.getCardList()) {
			Optional<CardModel> card = cardModelService.getCard(cardId);
			if (card.isPresent()) {
				cardList.add(card.get());
			}
		}
		return u;
	}

}
