#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import mimetypes
import argparse

def is_text_file(file_path):
    """
    Determina se un file è un file di testo basandosi sul tipo MIME.
    """
    mime_type, _ = mimetypes.guess_type(file_path)
    if mime_type is None:
        # Prova a leggere il file come testo
        try:
            with open(file_path, 'r') as f:
                f.read(1024)  # Prova a leggere i primi 1024 bytes
            return True
        except:
            return False
    return mime_type and mime_type.startswith('text/')

def get_relative_path(base_path, full_path):
    """
    Calcola il path relativo tra due percorsi.
    """
    return os.path.relpath(full_path, base_path)

def create_markdown_from_directory(directory_path, output_file):
    """
    Crea un file markdown contenente tutti i file di testo trovati nella directory
    e nelle sue sottodirectory.
    """
    # Converti i path in percorsi assoluti
    base_path = os.path.abspath(directory_path)
    output_path = os.path.abspath(output_file)

    with open(output_file, 'w') as out_f:
        # Scrivi l'intestazione del documento
        out_f.write("# File di testo da {0}\n\n".format(base_path))

        # Trova tutti i file ricorsivamente
        for root, _, files in os.walk(base_path):
            for file in files:
                file_path = os.path.join(root, file)

                # Salta il file di output se è nella directory
                if os.path.abspath(file_path) == output_path:
                    continue

                # Verifica se è un file di testo
                if is_text_file(file_path):
                    try:
                        # Calcola il path relativo
                        relative_path = get_relative_path(base_path, file_path)

                        # Scrivi l'intestazione della sezione
                        out_f.write("## {0}\n\n".format(relative_path))

                        # Scrivi il contenuto del file come snippet di codice
                        out_f.write("```\n")
                        with open(file_path, 'r') as in_f:
                            out_f.write(in_f.read())
                        out_f.write("\n```\n\n")

                    except Exception as e:
                        print("Errore nel processare {0}: {1}".format(file_path, str(e)))

def parse_arguments():
    """
    Gestisce gli argomenti da linea di comando.
    """
    parser = argparse.ArgumentParser(
        description='Unisce tutti i file di testo di una directory in un unico file markdown.'
    )
    parser.add_argument(
        '-d', '--directory',
        default='.',
        help='Directory da processare (default: directory corrente)'
    )
    parser.add_argument(
        '-o', '--output',
        default='merged_files.md',
        help='Nome del file di output (default: merged_files.md)'
    )
    return parser.parse_args()

def main():
    # Parsing degli argomenti
    args = parse_arguments()

    # Verifica che la directory esista
    if not os.path.isdir(args.directory):
        print("Errore: la directory '{0}' non esiste.".format(args.directory))
        return

    # Crea il markdown
    create_markdown_from_directory(args.directory, args.output)
    print("\nFile markdown creato con successo: {0}".format(args.output))

if __name__ == "__main__":
    main()