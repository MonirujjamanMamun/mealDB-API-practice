const loadData = () => {
    const inputText = document.getElementById('input-fild');
    const inputValue = inputText.value;
    inputText.value = '';
    if (inputValue === '' || !isNaN(inputValue)) {
        document.getElementById('error').style.display = 'block'
    } else {
        document.getElementById('error').style.display = 'none'

        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayData(data.meals))
    }

}


const displayData = (numbers) => {
    // console.log(numbers)
    const foodContainer = document.getElementById("food-container");
    foodContainer.textContent = '';
    for (const number of numbers) {
        const div = document.createElement('div');
        div.classList.add("col");
        div.innerHTML = `
        <div onclick="singelFood('${number.idMeal}')" class="card h-100">
            <img src="${number.strMealThumb}" class="card-img-top" alt="">
            <div class="card-body">
                <h2 class="card-title">${number.strMeal}</h2>
                <p class="card-text">${number.strInstructions.slice(0, 200)}</p>
            </div>
        </div>
        `;
        foodContainer.appendChild(div);
    }
}

const singelFood = (data) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data}`
    fetch(url)
        .then(res => res.json())
        .then(data => singleFoodDisplay(data.meals[0]))
}

const singleFoodDisplay = (number) => {
    console.log(number)
    const singleFood = document.getElementById("single-food");
    singleFood.textContent = '';
    singleFood.innerHTML = `
        <div class="card">
            <img src="${number.strMealThumb}" class="card-img-top" alt="">
            <div class="card-body">
                <h1>Meal Id : ${number.idMeal}</h1>
                <h2>Meal Name : ${number.strMeal}</h2>
                <h3>Meal Area : ${number.strArea}</h3>
                <h5>Meal Category : ${number.strCategory}</h5>
                <p class="card-text">${number.strInstructions}</p>
            </div>
        </div>   
    `;
}