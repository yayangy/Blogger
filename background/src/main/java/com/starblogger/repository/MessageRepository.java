package com.starblogger.repository;

import com.starblogger.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    
    // 按创建时间倒序查询所有留言
    List<Message> findAllByOrderByCreatedAtDesc();
}