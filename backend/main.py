
from matcher import calculate_match
from feedback import generate_feedback
from fastapi.middleware.cors import CORSMiddleware
from skill_gap import find_missing_skills
from fastapi import (
    FastAPI,
    UploadFile,
    File,
    Form
)
import tempfile

from parser import parse_pdf
from extractor import extract_info

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {
        "message": "Resume Analyzer Running"
    }


@app.post("/upload")
async def upload_resume(
    file: UploadFile = File(...)
):

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    ) as temp_file:

        content = await file.read()

        temp_file.write(content)

        temp_path = temp_file.name

    text = parse_pdf(temp_path)

    data = extract_info(text)

    return data
@app.post("/match")
async def match_resume(
    file: UploadFile = File(...),
    job_description: str = Form(...)
):

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".pdf"
    ) as temp_file:

        content = await file.read()

        temp_file.write(content)

        temp_path = temp_file.name

    resume_text = parse_pdf(
        temp_path
    )

    score = calculate_match(
      resume_text,
      job_description
    )

    resume_data = extract_info(
      resume_text
    )

    missing_skills = find_missing_skills(
      resume_data["skills"],
      job_description
    )

    feedback = generate_feedback(
    score,
    missing_skills
    )

    return {
     "match_score": score,
     "missing_skills": missing_skills,
     "feedback": feedback
    }
@app.post("/rank")
async def rank_resumes(
    files: list[UploadFile] = File(...),
    job_description: str = Form(...)
):

    results = []

    for file in files:

        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".pdf"
        ) as temp_file:

            content = await file.read()

            temp_file.write(content)

            temp_path = temp_file.name

        resume_text = parse_pdf(
            temp_path
        )

        score = calculate_match(
            resume_text,
            job_description
        )

        results.append({
            "filename": file.filename,
            "score": score
        })

    results.sort(
        key=lambda x: x["score"],
        reverse=True
    )

    return {
        "ranking": results
    }