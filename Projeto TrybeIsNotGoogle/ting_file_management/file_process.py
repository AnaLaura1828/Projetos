from ting_file_management.file_management import txt_importer
import sys


def process(path_file, instance):
    files = txt_importer(path_file)
    processes = {
        "nome_do_arquivo": path_file,
        "qtd_linhas": len(files),
        "linhas_do_arquivo": files,
    }
    if instance.__len__() <= 0:
        instance.enqueue(processes)
        return sys.stdout.write(f"{processes}")
    for elem in range(0, len(instance.queue)):
        if path_file not in instance.search(elem)["nome_do_arquivo"]:
            instance.enqueue(processes)
            return sys.stdout.write(f"{processes}")


def remove(instance):
    if instance.__len__() == 0:
        return sys.stdout.write("Não há elementos\n")
    arquivos = instance.dequeue()
    sys.stdout.write(
        f"Arquivo {arquivos['nome_do_arquivo']} removido com sucesso\n"
    )


def file_metadata(instance, position):
    try:
        print(instance.search(position), file=sys.stdout)
    except IndexError:
        print("Posição inválida", file=sys.stderr)
