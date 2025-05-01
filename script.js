document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const form = e.target;
    const userPreferences = {
      atmosphere: form.atmosphere.value,
      cuisine: form.cuisine.value,
      formality: form.formality.value,
      distance: form.distance.value
    };
  
    fetch('data/restaurants.json')
      .then(response => response.json())
      .then(data => {
        const matches = data.filter(r =>
          r.atmosphere === userPreferences.atmosphere &&
          r.cuisine === userPreferences.cuisine &&
          r.formality === userPreferences.formality &&
          r.distance === userPreferences.distance
        );
  
        const resultBox = document.getElementById('result');
        const name = document.getElementById('restaurantName');
        const desc = document.getElementById('restaurantDesc');
        const address = document.getElementById('restaurantAddress');
  
        if (matches.length > 0) {
          const chosen = matches[Math.floor(Math.random() * matches.length)];
          name.textContent = `🌟 ${chosen.name}`;
          desc.textContent = chosen.description;
          address.textContent = `📍 ${chosen.address}`;
        } else {
          name.textContent = 'No divine signs found.';
          desc.textContent = 'Try adjusting your mood or preferences.';
          address.textContent = '';
        }
  
        resultBox.classList.remove('hidden');
      });
  });
  