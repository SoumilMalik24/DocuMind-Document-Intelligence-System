from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from retriever import get_retriever


def run_rag(question:str):
    """
    Runs Retrieval-Augmented Generation pipeline.
    """

    retriever = get_retriever()

    llm = ChatOpenAI(
        model="gpt-5",
        temperature=0
    )

    prompt = ChatPromptTemplate.from_template(
        """
        You are a helpful assistant.
        Answer the question ONLY using the context below.
        If the answer is not in the context, say:
        "I could not find the answer in the provided documents."

        Context:
        {context}

        Question:
        {question}
        """
    )

    chain = (
        {
            "context": retriever,
            "question": lambda x: x
        }
        | prompt
        | llm
        | StrOutputParser()
    )

    response = chain.invoke(question)
    return response