def study_schedule(permanence_period, target_time):
    elemValue = 0
    try:
        for permanence, target in permanence_period:
            if permanence <= target_time <= target:
                elemValue += 1
    except TypeError:
        return None
    return elemValue
