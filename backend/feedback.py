def generate_feedback(
    score,
    missing_skills
):

    feedback = []

    if score >= 80:
        feedback.append(
            "Your resume is strongly aligned with the job description."
        )

    elif score >= 60:
        feedback.append(
            "Your resume matches the job requirements reasonably well."
        )

    else:
        feedback.append(
            "Your resume needs significant improvements to match the job requirements."
        )

    if len(missing_skills) > 0:

        feedback.append(
            "Consider adding the following skills if you have experience with them:"
        )

        for skill in missing_skills:

            feedback.append(
                f"Add or highlight {skill}"
            )

    feedback.append(
        "Include measurable achievements in projects and internships."
    )

    feedback.append(
        "Keep your resume concise and tailored to the role."
    )

    return feedback