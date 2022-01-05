const headElem = document.getElementById("head");
const buttonsElem = document.getElementById("buttons");
const pagesElem = document.getElementById("pages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Вам многому нужно научиться", 0),
	new Result("Вы уже неплохо разбираетесь", 2),
	new Result("Ваш уровень выше среднего", 4),
	new Result("Вы в совершенстве знаете тему", 6)
];

//Массив с вопросами
const questions = 
[
	new Question("На продажу выставили десять автомобилей.Все, кроме девяти, купили.Сколько автомобилей осталось?", 
	[
		new Answer("1", 0),
		new Answer("0", 0),
		new Answer("9", 1),
		new Answer("10", 0)
	]),

	new Question("Дано двузначное число. Если сумму квадратов его цифр разделить на сумму его цифр, то получится 4 и в остатке 1. Число, записанное теми же цифрами в обратном порядке, составляет 208% данного числа. Найти данное число.", 
	[
		new Answer("25", 1),
		new Answer("35", 0),
		new Answer("45", 0),
		new Answer("15", 0)
	]),

	new Question("Смешали 30% раствор соляной кислоты с 10%-ным и получили 600 г 15%-ного раствора. Сколько грамм каждого раствора было взято?", 
	[
		new Answer("120г, 200г", 0),
		new Answer("150г, 450г", 1),
		new Answer("200г, 300г", 0),
		new Answer("100г, 200г", 0)
	]),

	new Question("Известно, что сумма двух целых чисел равна 1244. Если к первому числу приписать справа цифру 3, а во втором числе отбросить последнюю цифру 2, то полученные числа будут равны. Найдите эти числа.", 
	[
		new Answer("18 и 1200", 0),
		new Answer("16 и 1444", 0),
		new Answer("14 и 1222", 0),
		new Answer("12 и 1232", 1)
	]),

	new Question("Турист, идущий из деревни на железнодорожную станцию, пройдя за первый час 3 км, рассчитал, что он опоздает к поезду на 40 мин., если будет двигаться с той же скоростью. Поэтому остальной путь он проходит со скоростью 4 км/ч и прибывает на станцию за 45 мин. до отхода поезда. Каково расстояние от деревни до станции?", 
	[
		new Answer("10км", 0),
		new Answer("20км", 1),
		new Answer("30км", 0),
		new Answer("40км", 0)
	]),

	new Question("В шахматном турнире среди участников были 2 женщины. Каждый участник играл с остальными по две партии. Число партий, сыгранных мужчинами между собой, оказалось на 66 больше, чем сыгранных мужчинами с женщинами. Сколько всего было участников и сколько партий сыграно?", 
	[
		new Answer("13 участников, 156 партий", 1),
		new Answer("14 участников, 160 партий", 0),
		new Answer("16 участников, 162 партий", 0),
		new Answer("17 участников, 158 партий", 0)
	])
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("button");
			btn.className = "button";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = "Очки: " + quiz.score;
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("button");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "button button_passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "button button_correct";
		}

		if(index != correct) 
		{
			btns[index].className = "button button_wrong";
		} 
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "button button_correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}