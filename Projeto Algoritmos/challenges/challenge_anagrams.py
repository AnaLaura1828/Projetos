def is_anagram(first_string, second_string):
    first = list(first_string.lower())
    second = list(second_string.lower())

    merge_sort(first)
    merge_sort(second)

    if first != second:
        return ("".join(first), "".join(second), False)
    else:
        return ("".join(first), "".join(second), True)


# Funções retiradas do course
def merge_sort(list_number, start=0, end=None):
    if end is None:
        end = len(list_number)
    if (end - start) > 1:
        mid = (start + end) // 2
        merge_sort(list_number, start, mid)
        merge_sort(list_number, mid, end)
        merge(list_number, start, mid, end)


def merge(list_number, start, mid, end):
    left = list_number[start:mid]
    right = list_number[mid:end]

    left_index, right_index = 0, 0

    for general_index in range(start, end):
        if left_index >= len(left):
            list_number[general_index] = right[right_index]
            right_index = right_index + 1
        elif right_index >= len(right):
            list_number[general_index] = left[left_index]
            left_index = left_index + 1
        elif left[left_index] < right[right_index]:
            list_number[general_index] = left[left_index]
            left_index = left_index + 1
        else:
            list_number[general_index] = right[right_index]
            right_index = right_index + 1