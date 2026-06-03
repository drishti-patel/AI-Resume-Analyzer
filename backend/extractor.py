import re
import spacy

nlp = spacy.load(
    "en_core_web_sm"
)


def extract_info(text):

    email = re.findall(
        r'[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}',
        text
    )

    phone = re.findall(
        r'\+?\d[\d -]{8,}\d',
        text
    )

    name = ""

    doc = nlp(text)

    for ent in doc.ents:

        if ent.label_ == "PERSON":

            name = ent.text

            break

    skills_db = [
        "python",
        "java",
        "sql",
        "react",
        "javascript",
        "html",
        "css",
        "machine learning"
    ]

    skills = []

    text_lower = text.lower()

    for skill in skills_db:

        if skill in text_lower:

            skills.append(skill)

    return {
        "name": name,
        "email": email,
        "phone": phone,
        "skills": skills
    }