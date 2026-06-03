# AI Resume Analyzer

## Overview

AI Resume Analyzer is a web application that helps candidates and recruiters evaluate resumes against job descriptions.

The application extracts resume information, calculates resume-job description match scores, identifies missing skills, generates feedback suggestions, and ranks multiple resumes based on relevance.

## Features

* Resume Upload & Parsing (PDF)
* Structured Information Extraction

  * Name
  * Email
  * Phone Number
  * Skills
* Resume vs Job Description Matching
* Match Score Calculation
* Missing Skills Detection
* Feedback Suggestions
* Resume Ranking System
* Modern React UI

## Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Axios

### Backend

* FastAPI
* Python

### Libraries

* pdfplumber
* spaCy
* scikit-learn

## Project Structure

AI-Resume-Analyzer/

* backend/
* frontend/

## How to Run

### Backend

```bash
cd backend
venv\Scripts\activate
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Future Enhancements

* Gemini AI Feedback
* DOCX Support
* Resume PDF Report Generation
* Authentication System
* Cloud Deployment
