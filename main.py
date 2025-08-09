def check_age(age):
    if age < 18:
        print("Ты несовершеннолетний")
    elif age >= 18 and age < 60:
        print("Ты взрослый")
    else:
        print("Ты пожилой")

user_input = input("Введите свой возраст: ")
try:
    age = int(user_input)
    check_age(age)
except ValueError:
    print("Пожалуйста, введите корректный возраст.")

def check_score(score):
    if score < 60:
        print("Оценка: F")
    elif score < 70 and score >= 60:
        print("Оценка: D")
    elif score < 80 and score >= 70:
        print("Оценка: C")
    elif score < 90 and score >= 80:
        print("Оценка: B")
    else:
        print("Оценка: A")


user_score = input("Введите количество балов:")
try:
    score = int(user_score)
    check_score(score)
except ValueError:
    print("Пожалуйста, введите корректный возраст.")

def checLetter():
    