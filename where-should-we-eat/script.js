let currentStep = 1;
let audioChoice = '';
let foodChoice = '';
let distance = 5; // default slider value

document.addEventListener('DOMContentLoaded', () => {
  showStep(currentStep);

  document.querySelectorAll('.next-button').forEach(button => {
    button.addEventListener('click', () => {
      currentStep++;
      showStep(currentStep);
    });
  });

  // Audio button selection
  document.querySelectorAll('.audio-button').forEach(button => {
    button.addEventListener('click', () => {
      audioChoice = button.getAttribute('data-audio');
      highlightSelection('.audio-button', button);
    });
  });

  // Food image selection
  document.querySelectorAll('.food-option').forEach(option => {
    option.addEventListener('click', () => {
      foodChoice = option.getAttribute('data-food');
      highlightSelection('.food-option', option);
    });
  });

  // Slider change
  document.getElementById('distance-slider').addEventListener('input', (e) => {
    distance = e.target.value;
  });

  // Submit button
  document.getElementById('submit').addEventListener('click', () => {
    showStep(4);
    displayResult();
  });
});

function showStep(step) {
  document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
  document.getElementById(`step${step}`).classList.add('active');
}

function highlightSelection(groupSelector, selectedElement) {
  document.querySelectorAll(groupSelector).forEach(el => el.classList.remove('selected'));
  selectedElement.classList.add('selected');
}

function displayResult() {
  const result = document.getElementById('result');

  if (!audioChoice || !foodChoice) {
    result.textContent = "Please make sure you've selected an audio and food option.";
    return;
  }

  result.innerHTML = `
    Based on your mood ("${audioChoice}"), food craving ("${foodChoice}"), 
    and preferred distance (${distance} miles), we recommend:
    <br><strong>${generateRestaurantSuggestion()}</strong>
  `;
}

function generateRestaurantSuggestion() {
  // You can expand this logic for more dynamic suggestions
  const suggestions = {
    happy: {
      pizza: "Tony's Pizzeria – great vibes, great pies!",
      sushi: "Sunshine Sushi – light, fresh, and fun.",
      burger: "Happy Grill – casual and cheerful.",
      salad: "Bloom Bowl – fresh & uplifting greens."
    },
    calm: {
      pizza: "Zen Pizza Lounge – wood-fired and relaxed.",
      sushi: "Quiet Tide Sushi – soft jazz and miso soup.",
      burger: "Tranquil Burger Bar – minimal and cozy.",
      salad: "Stillness Greens – peaceful healthy bites."
    },
    energetic: {
      pizza: "GoGo Pizza – bold flavors, bright neon.",
      sushi: "Sushi Spark – lively rolls and beats.",
      burger: "Fuel Burgers – big bites, big energy.",
      salad: "Zest Bowl – crunchy and zippy veggies."
    }
  };

  const mood = audioChoice;
  const food = foodChoice;

  return suggestions[mood] && suggestions[mood][food]
    ? suggestions[mood][food]
    : "a great local spot!";
}
