from src.models.ingredient import Ingredient  # noqa: F401, E261, E501


def test_ingredient():
    instance = Ingredient('lactose')
    instance2 = Ingredient('pimenta')

    assert instance.name == 'lactose'
    assert hash(instance) == hash('lactose')
    assert repr(instance) == "Ingredient('lactose')"
    assert instance == instance
    assert instance != instance2
    assert instance.restrictions == set()