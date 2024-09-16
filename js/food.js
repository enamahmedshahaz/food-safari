let defaultCategory = 'Beef';
let previousClickedAnchor = null;

window.onload = function () {
    // Select the first <a> element and set its color to red by default
    const firstAnchor = document.querySelector('ul.category-menu-2 a');
    firstAnchor.classList = 'border-2 border-red-500';
    
    previousClickedAnchor = firstAnchor;  // Set the first anchor as the previously clicked one
}


const showLoadingAnimation = (show) => {
    let loading = document.getElementById("loading");
    if (show) {
        loading.innerHTML = `<span class="loading loading-spinner loading-lg"></span>`;
    } else {
        loading.innerHTML = '';
    }
}

const loadFood = (category) => {

    showLoadingAnimation(true);

    let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`;
    fetch(url)
        .then(res => res.json())
        .then(data => showMeals(data.meals))
        .catch(error => console.log('Error: ', error));
}

loadFood(defaultCategory);

const showMeals = (meals) => {
    // console.log('Data is: ', meals);
    let container = document.getElementById("food-card-container");
    container.innerHTML = '';

    meals.forEach(meal => {

        let mealCard = document.createElement('div');
        mealCard.classList = 'card card-compact bg-base-100 shadow-xl';

        mealCard.innerHTML = `
             <figure>
                <img src="${meal.strMealThumb}" alt="Image of ${meal.strMeal}" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${meal.strMeal}</h2>
                <p>${meal.strInstructions.slice(0, 100)}...</p>
            </div>
        `;
        container.appendChild(mealCard);
    });

    showLoadingAnimation(false);
}



const categoryListClickHandler = (event) => {

    const clickedAnchor = event.target;
    const categoryName = event.target.innerText;

    if (previousClickedAnchor) {
        previousClickedAnchor.classList = '';
    }
    clickedAnchor.classList = 'border-2 border-red-500';

    previousClickedAnchor = clickedAnchor;

    loadFood(categoryName);
}