from src.pre_built.counter import count_ocurrences


def test_counter():
    path = "data/jobs.csv"
    javascript = count_ocurrences(path, "JavaScript")
    python = count_ocurrences(path, "Python")
    assert javascript == 122
    assert python == 1639
