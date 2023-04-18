from functools import lru_cache
from typing import List, Dict
import csv


@lru_cache
def read(path: str) -> List[Dict]:
    with open(path) as file:
        csv_jobs = csv.DictReader(file)
        list = []
        for job in csv_jobs:
            list.append(job)
        return list


def get_unique_job_types(path: str) -> List[str]:
    dados = read(path)
    job_types = []
    for jobs in dados:
        types = jobs["job_type"]
        if types not in job_types:
            job_types.append(types)
    return job_types


def filter_by_job_type(jobs: List[Dict], job_type: str) -> List[Dict]:
    lists = []
    for job in jobs:
        if job["job_type"] == job_type:
            lists.append(job)
    return lists
