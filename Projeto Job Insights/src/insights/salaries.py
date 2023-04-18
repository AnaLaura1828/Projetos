from typing import Union, List, Dict
from src.insights.jobs import read


def get_max_salary(path: str) -> int:
    dados = read(path)
    salaries = []
    for job in dados:
        if job['max_salary'].isnumeric():
            salaries.append(int(job["max_salary"]))
    return max(salaries)


def get_min_salary(path: str) -> int:
    dados = read(path)
    salaries = []
    for job in dados:
        if job["min_salary"].isnumeric():
            salaries.append(int(job["min_salary"]))
    return min(salaries)


def matches_salary_range(job: Dict, salary: Union[int, str]) -> bool:
    try:
        max_salary = int(job["max_salary"])
        min_salary = int(job["min_salary"])
        salary = int(salary)
        if max_salary > min_salary:
            return max_salary >= salary and min_salary <= salary
        raise ValueError
    except (KeyError, TypeError):
        raise ValueError


def filter_by_salary_range(
    jobs: List[dict],
    salary: Union[str, int]
) -> List[Dict]:
    list = []
    try:
        for job in jobs:
            if int(job["min_salary"]) <= int(salary) <= int(job["max_salary"]):
                list.append(job)
    except TypeError:
        raise ValueError("error")
    finally:
        return list
