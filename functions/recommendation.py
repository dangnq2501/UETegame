import requests
import json
import pandas as pd
from random import uniform as rnd
from core.recommend_model import recommend, output_recommended_recipes

dataset = pd.read_csv('dataset/dataset.csv', compression='gzip')


class Generator:
    def __init__(self, nutrition_input: list, ingredients: list = [],
                 params: dict = {'n_neighbors': 5, 'return_distance': False}):
        self.nutrition_input = nutrition_input
        self.ingredients = ingredients
        self.params = params

    def set_request(self, nutrition_input: list, ingredients: list, params: dict):
        self.nutrition_input = nutrition_input
        self.ingredients = ingredients
        self.params = params

    def generate(self, ):
        request = {
            'nutrition_input': self.nutrition_input,
            'ingredients': self.ingredients,
            'params': self.params
        }
        recommendation_dataframe = recommend(dataset, request["nutrition_input"])
        output = output_recommended_recipes(recommendation_dataframe)
        return output


nutritions_values = ['Calories', 'FatContent', 'SaturatedFatContent', 'CholesterolContent', 'SodiumContent',
                     'CarbohydrateContent', 'FiberContent', 'SugarContent', 'ProteinContent']


class Person:
    def __init__(self, age, height, weight, gender, activity, meals_calories_perc, weight_loss):
        self.age = age
        self.height = height
        self.weight = weight
        self.gender = gender
        self.activity = activity
        self.meals_calories_perc = meals_calories_perc
        self.weight_loss = weight_loss

    def calculate_bmi(self, ):
        bmi = round(self.weight / ((self.height / 100) ** 2), 2)
        return bmi

    def display_result(self, ):
        bmi = self.calculate_bmi()
        bmi_string = f'{bmi} kg/m²'
        if bmi < 18.5:
            category = 'Underweight'
        elif 18.5 <= bmi < 25:
            category = 'Normal'
        elif 25 <= bmi < 30:
            category = 'Overweight'
        else:
            category = 'Obesity'
        return category

    def calculate_bmr(self):
        if self.gender == 'Male':
            bmr = 10 * self.weight + 6.25 * self.height - 5 * self.age + 5
        else:
            bmr = 10 * self.weight + 6.25 * self.height - 5 * self.age - 161
        return bmr

    def calories_calculator(self):
        activites = ['Little/no exercise', 'Light exercise', 'Moderate exercise (3-5 days/wk)',
                     'Very active (6-7 days/wk)', 'Extra active (very active & physical job)']
        weights = [1.2, 1.375, 1.55, 1.725, 1.9]
        weight = weights[activites.index(self.activity)]
        maintain_calories = self.calculate_bmr() * weight
        return maintain_calories

    def generate_recommendations(self, ):
        total_calories = self.weight_loss * self.calories_calculator()
        recommendations = {}
        for meal in self.meals_calories_perc:
            meal_calories = self.meals_calories_perc[meal] * total_calories
            if meal == 'breakfast':
                recommended_nutrition = [meal_calories, rnd(10, 30), rnd(0, 4), rnd(0, 30), rnd(0, 400), rnd(40, 75),
                                         rnd(4, 10), rnd(0, 10), rnd(30, 100)]
            elif meal == 'lunch':
                recommended_nutrition = [meal_calories, rnd(20, 40), rnd(0, 4), rnd(0, 30), rnd(0, 400), rnd(40, 75),
                                         rnd(4, 20), rnd(0, 10), rnd(50, 175)]
            elif meal == 'dinner':
                recommended_nutrition = [meal_calories, rnd(20, 40), rnd(0, 4), rnd(0, 30), rnd(0, 400), rnd(40, 75),
                                         rnd(4, 20), rnd(0, 10), rnd(50, 175)]
            else:
                recommended_nutrition = [meal_calories, rnd(10, 30), rnd(0, 4), rnd(0, 30), rnd(0, 400), rnd(40, 75),
                                         rnd(4, 10), rnd(0, 10), rnd(30, 100)]
            generator = Generator(recommended_nutrition)
            recommended_recipes = generator.generate()
            recommendations[meal] = recommended_recipes

        return recommendations
