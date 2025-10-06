package com.starblogger.service;

import com.starblogger.entity.Message;

import java.util.List;

public interface MessageService {
    
    // 保存留言
    Message saveMessage(Message message);
    
    // 获取所有留言（按创建时间倒序）
    List<Message> getAllMessages();
    
    // 根据ID获取留言
    Message getMessageById(Long id);
    
    // 删除留言
    void deleteMessage(Long id);
}