import sys


def txt_importer(path_file):
    try:
        if not path_file.endswith('.txt'):
            sys.stderr.write("Formato inválido")
        with open(path_file, mode="r") as file:
            date = file.readlines()
            return [row.rstrip("\n") for row in date]
    except FileNotFoundError:
        sys.stderr.write(f"Arquivo {path_file} não encontrado\n")
