import pdfplumber
from docx import Document


def parse_pdf(path):
    text = ""

    with pdfplumber.open(path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text

    return text


def parse_docx(path):

    doc = Document(path)

    return "\n".join(
        para.text for para in doc.paragraphs
    )