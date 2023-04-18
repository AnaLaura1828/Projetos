from src.models.dish import Dish  # noqa: F401, E261, E501
from src.models.ingredient import Ingredient
import pytest


# Req 2
def test_dish():
    instance = Dish('Abacaxi', 3.4)
    another_instance = Dish('Alho', 1.90)

    assert instance.name == 'Abacaxi'


    error = "Dish price must be greater then zero."
    with pytest.raises(ValueError, match=error):
        Dish('a', -3)

    assert repr(instance) == "Dish('Abacaxi', R$3.40)"
    assert instance == instance
    assert instance != another_instance
    assert hash(instance) == hash(repr(instance))
    assert hash(instance) != hash(repr(another_instance))

    instance.add_ingredient_dependency(Ingredient('Refrigerante'), 200)
    assert instance.recipe == {Ingredient('Refrigerante'): 200}
    assert instance.get_ingredients() == set(instance.recipe.keys())
    assert instance.get_restrictions() == set()
