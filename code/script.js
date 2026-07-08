const searchInput= document.getElementById('searchInput');
const searchbtn= document.getElementById('searchbtn');
const recipecon=document.getElementById('recipecon');
async function search_rec (ingredient){
    try {
        const response= await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
        )
        const data= await response.json();
        displayrecipes(data.meals);
    }
    catch (error){
        console.log('Error:',error)
        recipecon.innerHTML= '<div class="no-results">Something went wrong. Please try again.</div>';
    }
    }
    
function displayrecipes (meals){
    recipecon.innerHTML='';
    if(!meals){
        recipecon.innerHTML='<div class="no-results">No recipes found for that ingredient. Try something else!</div>'
        return
    }
    meals.forEach(meal => {
        // Get full recipe details including ingredients
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
            .then(res => res.json())
            .then(data => {
                const fullMeal = data.meals[0];
                
                const card = document.createElement('div');
                card.className = 'recipe-card';
                
                // Get ingredients list as description
                let ingredients = [];
                for(let i = 1; i <= 20; i++){
                    if(fullMeal[`strIngredient${i}`]){
                        ingredients.push(fullMeal[`strIngredient${i}`]);
                    }
                }
                const description = `Made with: ${ingredients.slice(0, 3).join(', ')}...`;
                
                card.innerHTML = `
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                    <div class="recipe-info">
                        <h3>${meal.strMeal}</h3>
                        <p class="recipe-desc">${description}</p>
                        <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">View Full Recipe</a>
                    </div>
                `;
                
                recipecon.appendChild(card);
            });
    });
}

searchbtn.addEventListener('click',()=> {
     const ingredient= searchInput.value.toLowerCase().trim();
     if(ingredient){
        search_rec(ingredient);
     }

});

searchInput.addEventListener ('keypress',(e)=> {
        if(e.key==='Enter') {
            const ingredient=searchInput.value.toLowerCase().trim();
              if(ingredient){
            search_rec(ingredient);
        }

        }
      
 });

