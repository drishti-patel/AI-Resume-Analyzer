def find_missing_skills(
    resume_skills,
    jd_text
):

    skills_db = [
        "python",
        "java",
        "sql",
        "react",
        "javascript",
        "html",
        "css",
        "aws",
        "docker",
        "kubernetes",
        "machine learning",
        "fastapi",
        "nodejs",
        "mongodb"
    ]

    jd_skills = []

    for skill in skills_db:

        if skill.lower() in jd_text.lower():

            jd_skills.append(skill)

    missing = list(
        set(jd_skills)
        - set(resume_skills)
    )

    return missing