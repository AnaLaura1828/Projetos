from ting_file_management.queue import Queue


def exists_word(word, instance: Queue):
    elem = instance.search(0)
    file = elem["linhas_do_arquivo"]
    array = []
    result = {
        "palavra": word,
        "arquivo": elem["nome_do_arquivo"],
        "ocorrencias": [
            {
                "linha": index + 1
            } for index, file in enumerate(file)
            if word.lower() in file.lower()
        ]
    }

    if len(result["ocorrencias"]) > 0:
        array.append(result)

    return array


def search_by_word(word, instance: Queue):
    file = instance.search(0)
    array = []
    itens = {
        "palavra": word,
        "arquivo": file["nome_do_arquivo"],
        "ocorrencias": [
            {
                "linha": index + 1, "conteudo": file
            } for index, file in enumerate(file["linhas_do_arquivo"])
            if word.lower() in file.lower()
        ]
    }

    if len(itens["ocorrencias"]) > 0:
        array.append(itens)

    return array