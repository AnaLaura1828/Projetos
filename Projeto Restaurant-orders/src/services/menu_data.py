from src.models.dish import Dish
from src.models.ingredient import Ingredient
import pandas as pd


# Req 3
class MenuData:
    def __init__(self, source_path) -> set:
        item = dict()
        elements = pd.read_csv(source_path)

        for product, method, ingredient, quantity in elements.itertuples(
            index=False
        ):
            if product not in item:
                item[product] = Dish(product, method)

            item[product].add_ingredient_dependency(
                Ingredient(ingredient),
                quantity
            )

        self.dishes = set(item.values())
    # 
