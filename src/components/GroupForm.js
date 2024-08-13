import React, { useState } from 'react';
import './GroupForm.css';
import Layout from './Layout'

function GroupForm() {
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const [groupDescription, setGroupDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 제출 로직 추가
    console.log({
      groupName,
      groupImage,
      groupDescription,
      isPublic,
      password,
    });
  };

  return (
    
    <div className="form-container">
      <form onSubmit={handleSubmit} className="group-form">
        <h2 className="form-title">그룹 만들기</h2>
        
        <label className="form-label">그룹명</label>
        <input 
          type="text" 
          value={groupName} 
          onChange={(e) => setGroupName(e.target.value)} 
          placeholder="그룹명을 입력하세요" 
          className="form-input" 
        />
        
        <label className="form-label">대표 이미지</label>
        <input 
          type="file" 
          onChange={(e) => setGroupImage(e.target.files[0])} 
          className="form-input-file" 
        />
        
        <label className="form-label">그룹 소개</label>
        <textarea 
          value={groupDescription} 
          onChange={(e) => setGroupDescription(e.target.value)} 
          placeholder="그룹을 소개해 주세요" 
          className="form-textarea" 
        />
        
        <label className="form-label">그룹 공개 선택</label>
        <div className="form-public-toggle">
          <label className="toggle-label">공개</label>
          <label className="switch">
            <input 
              type="checkbox" 
              checked={isPublic} 
              onChange={(e) => setIsPublic(e.target.checked)} 
            />
            <span className="slider round"></span>
          </label>
        </div>

        <label className="form-label">비밀번호</label>
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="비밀번호를 입력해 주세요" 
          className="form-input" 
        />
        
        <button type="submit" className="form-button">만들기</button>
      </form>
    </div>
  );
}

export default GroupForm;
