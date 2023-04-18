from typing import List, Dict
from src.insights.jobs import read


def get_unique_industries(path: str) -> List[str]:
    industry_jobs = read(path)
    job_industries = [job["industry"] for job in industry_jobs]
    return list(filter(any, set(job_industries)))


def filter_by_industry(jobs: List[Dict], industry: str) -> List[Dict]:
    lists = []
    for job in jobs:
        if job["industry"] == industry:
            lists.append(job)
    return lists
