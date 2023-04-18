def is_palindrome_recursive(word, low_index, high_index):
    if word is None or len(word) == 0:
        return False
    if low_index > high_index:
        return True
    elif word[low_index] != word[high_index]:
        return False
    return is_palindrome_recursive(word, low_index + 1, high_index - 1)

