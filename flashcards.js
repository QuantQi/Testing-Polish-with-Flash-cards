// flashcards.js

// Function to dynamically create buttons for each dataset in dataSets
function createButtons() {
    const contentContainer = document.getElementById('contentContainer'); // Get the content container
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');
    contentContainer.appendChild(buttonContainer);  // Append the button container to content container

    // Clear the button container before adding buttons
    buttonContainer.innerHTML = '';  

    // Dynamically create buttons for each data set in dataSets
    dataSets.forEach((dataset, index) => {
        const button = document.createElement('button');
        button.textContent = dataset.name;  // Use the dataset name as the button label
        button.onclick = () => {
            highlightButton(button); // Function from utils.js to highlight the clicked button
            loadFlashcards(dataset.value);  // Load the flashcards for the selected dataset
        };
        buttonContainer.appendChild(button);

        // Automatically highlight and load the first button
        if (index === 0) {
            highlightButton(button);  // Function from utils.js to highlight the first button
            loadFlashcards(dataset.value);  // Load the first dataset by default
        }
    });
}

// Function to load flashcards for the selected dataset
function loadFlashcards(data) {
    const contentContainer = document.getElementById('contentContainer'); // Get content container
    const flashcardContainer = document.createElement('div');
    flashcardContainer.classList.add('flashcard-container');
    
    // Clear previous content and add the new flashcard container
    contentContainer.innerHTML = ''; 
    contentContainer.appendChild(flashcardContainer);

    // Clear previous flashcards in the container
    flashcardContainer.innerHTML = ''; 

    // Loop through the data to create flashcards
    data.forEach(item => {
        createFlashcard(item.Polish, item.Pronunciation, item.English);
    });
}

// Function to create a flashcard
function createFlashcard(polish, pronunciation, english) {
    const flashcard = document.createElement('div');
    flashcard.classList.add('flashcard');
    flashcard.onclick = () => flipCard(flashcard);

    const front = document.createElement('div');
    front.classList.add('front');
    front.innerHTML = polish;

    const back = document.createElement('div');
    back.classList.add('back');
    back.innerHTML = `<strong>${english}</strong><br><em>${pronunciation}</em>`;

    flashcard.appendChild(front);
    flashcard.appendChild(back);
    document.querySelector('.flashcard-container').appendChild(flashcard);
}

// Function to flip a flashcard and flip it back after 3 seconds
function flipCard(card) {
    card.classList.add('flipped');
    setTimeout(() => {
        card.classList.remove('flipped');
    }, 3000);
}
