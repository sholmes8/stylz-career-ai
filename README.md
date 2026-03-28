# 🤖 STYLZ Career AI – Resume Optimizer  
*(Full-Stack AI Application)*

> AI-powered resume optimization tool that analyzes resumes against job descriptions and generates tailored, improved versions using OpenAI.

> 💡 **Impact:** Automates resume customization and improves alignment with job requirements, reducing manual editing time for users.

---

## 📌 Project Overview

STYLZ Career AI is a full-stack web application designed to help users optimize their resumes for specific job descriptions using AI.

Users input their resume and a target job description, and the system generates an improved version aligned with role requirements and ATS keyword matching.

---

## 💡 What I Built

- Developed a responsive frontend using React  
- Built a backend API using Node.js and Express  
- Integrated OpenAI API for intelligent resume optimization  
- Designed request/response flow between frontend and backend  
- Implemented error handling and input validation  
- Deployed a full-stack application using Vercel and Render  

---

## 🎯 Project Objectives

- Build an AI-powered application to solve resume-job matching challenges  
- Design a responsive and intuitive user interface  
- Implement backend services for processing and optimization  
- Integrate OpenAI API for intelligent text transformation  
- Deploy a scalable full-stack application  

---

## 🧩 Problem Statement

Many job seekers struggle to tailor their resumes to match job descriptions effectively, leading to:

- Low resume-to-interview conversion rates  
- Poor keyword alignment with ATS systems  
- Time-consuming manual resume edits  
- Lack of clear feedback on resume quality  

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- JavaScript
- CSS

**Backend**
- Node.js
- Express

**AI Integration**
- OpenAI API

**Deployment**
- Vercel (frontend)
- Render (backend)

---

## 🔄 System Workflow

1. User inputs resume and job description  
2. Frontend sends request to backend API  
3. Backend processes request using OpenAI API  
4. AI generates optimized resume content  
5. Response is returned and displayed to the user  
6. User can copy or download improved resume  

---

## 📋 Key Features

- Resume input and job description input  
- AI-powered resume optimization  
- Keyword alignment for ATS systems  
- Match scoring and improvement suggestions  
- Copy/download optimized resume  
- Real-time API response  

---

## 🔧 API Design

### Endpoint

```http
POST /optimize

Request:
```json
{
  "resume": "User resume text",
  "jobDescription": "Target job description"
}
```

Response:
```json
{
  "optimizedResume": "Improved resume content",
  "matchScore": 85
}
```

## 🏗️ System Architecture
- Frontend: React-based UI for user input and results
- Backend: Express API handling logic and AI integration
- AI Layer: OpenAI API for text processing
- Deployment: Vercel (frontend), Render (backend)

## Project Structure
```text
stylz-career-ai/
├── client/
├── server/
├── README.md
```

## Application Preview
![Home Screen](visuals/home.png)
![Results Screen](visuals/results.png)

## 🧠 Skills Demonstrated
- Full-Stack Development
- API Design & Integration
- AI Application Development
- Frontend/Backend Communication
- Deployment & Environment Configuration
- Problem Solving & System Design

## 🚀 Future Improvements
- File upload support (PDF/DOCX parsing)
- Advanced scoring algorithms
- User authentication and saved resumes
- Integration with job platforms
- Resume history tracking

## 💡 Why This Project Matters
This project demonstrates the ability to:
- Build real-world full-stack applications
- Integrate AI into production-ready systems
- Design scalable API-driven architectures
- Solve practical user problems using modern technologies

---
