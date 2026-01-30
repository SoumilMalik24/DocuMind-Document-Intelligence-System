from rag_pipeline import run_rag

while True:
    q = input("\nAsk a question (or exit): ")

    if q.lower() == "exit":
        break

    answer = run_rag(q)
    print("\nAnswer:\n", answer)
