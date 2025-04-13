    let countdownInterval;
    let isDialogVisible = false; // Prevents multiple dialogs from showing

    const countdownElement = document.getElementById('countdown');
    const targetDate = new Date("2025-04-21T00:00:00").getTime(); // Set target date for countdown
    let currentMessageIndex = 0;

    function updateCountdown() {
        const now = new Date().getTime();
        const timeLeft = targetDate - now;

        if (timeLeft <= 0) {
            // Hide countdown content and show the surprise dialog
            document.querySelector('.countdown-container').classList.add('hidden');
            
            // Trigger surprise prompt if dialog isn't already visible
            if (!isDialogVisible) {
                showSurprisePrompt();
                isDialogVisible = true; // Prevent further dialogs
            }

            countdownElement.innerHTML = "🎉 The Surprise is Here! 🎉";
            clearInterval(countdownInterval); // Stop countdown after time ends
        } else {
            const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            // Display countdown
            countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            // Show cute messages based on the countdown
            if (seconds % 10 === 0) {
                countdownElement.innerHTML += `<br><span>${cuteMessages[currentMessageIndex]}</span>`;
                currentMessageIndex = (currentMessageIndex + 1) % cuteMessages.length; // Loop through messages
            }
        }
    }

    // Function to start countdown
    function startCountdown() {
        countdownInterval = setInterval(updateCountdown, 1000);
    }

    // Function to stop countdown
    function stopCountdown() {
        clearInterval(countdownInterval); // Stops the countdown
    }



    // Function to show a dialog
    function showDialog(message, buttons = []) {
        const dialogMessage = document.getElementById("dialoug-message");
        const dialogButtons = document.getElementById("dialoug-buttons");
        const dialogContainer = document.getElementById("dialoug-container");

        dialogMessage.innerText = message;
        dialogButtons.innerHTML = "";

        buttons.forEach(btn => {
            const button = document.createElement("button");
            button.textContent = btn.label;
            button.onclick = btn.onClick;
            dialogButtons.appendChild(button);
        });

        dialogContainer.classList.remove("hidden");
    }

    // Hide the dialog with fade-out effect
    function hideDialog() {
        const dialog = document.getElementById("dialoug-container");
        dialog.classList.add("fade-out");

        setTimeout(() => {
            dialog.classList.add("hidden");
            dialog.classList.remove("fade-out");
        }, 800); // Duration of fade-out transition
    }

    // Function to show the first dialog when countdown ends
    function showFirstDialog() {
        if (!isDialogVisible) {
            showDialog("Do you want to see it now?", [
                { label: "Yes", onClick: showLoveQuestion },
                { label: "No", onClick: showWaitThenReturn }
            ]);
           // isDialogVisible = true; // Mark dialog as shown
        }
    }

    function showLoveQuestion() {
        if (!isDialogVisible) {
            showDialog("Do you love me?", [
                { label: "Yes", onClick: showSweetWait },
                { label: "No", onClick: showWaitThenReturn }
            ]);
            //isDialogVisible = true; // Mark dialog as shown
        }
    }

    function showSweetWait() {
        showDialog("I know you love me 😘 but you still have to wait till the timer goes off ⏳");

        setTimeout(() => {
            hideDialog();
            isDialogVisible = false; // Reset dialog visibility flag
        }, 5000);
    }

    function showWaitThenReturn() {
        showDialog("Then you have to wait until the timer goes down...");
        setTimeout(() => {
            showFirstDialog();
        }, 3000);
    }

    function showSurprisePrompt() {
        if (!isDialogVisible) {
            stopCountdown(); // Stop countdown to focus on dialog
            showDialog("🎁 View Your Surprise?", [
                { label: "Proceed", onClick: showFinalSurprise }
            ]);
            isDialogVisible = true; // Prevent showing more dialogs
        }
    }

    function showFinalSurprise() {
        // Hide countdown and any open dialogs
        document.querySelector('.countdown-container').classList.add('hidden');
        document.querySelector('#dialoug-container').classList.add('hidden'); // Hide any open dialogs

        // Show the final surprise screen
        document.getElementById("surprise-screen").classList.remove("hidden");

        // Play background music
        const music = document.getElementById("bg-music");
        music.src = "assets/music/Finding Her.mp3"; // Use a special song
        music.play();
    }

    setTimeout(showFirstDialog, 2000);  // Trigger first dialog after a short delay
    startCountdown();  // Start the countdown when the page loads


    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.textContent = '💖';
    
        const container = document.querySelector('.hearts-container');
    
        // Set initial position randomly in the container
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
    
        // Set random floating offset
        const floatX = (Math.random() - 0.5) * 200; // left or right
        const floatY = -200 - Math.random() * 200; // upward
    
        heart.style.left = `${startX}px`;
        heart.style.top = `${startY}px`;
    
        // Set animation variables
        heart.style.setProperty('--x', `${floatX}px`);
        heart.style.setProperty('--y', `${floatY}px`);
    
        container.appendChild(heart);
    
        // Remove after animation
        setTimeout(() => heart.remove(), 5000);
    }
    
    // Start the heart animation
    setInterval(createFloatingHeart, 500); // Every 500ms

    const poemTextElement = document.getElementById("poem-text");
const poemContainer = document.getElementById("poem-container");

// The poem text that will be typed out
const poem = `Roses are red,
Violets are blue,
You are my sunshine,
And I love you!`;

// Start typing the poem one letter at a time
function typePoem() {
    let i = 0;
    const poemArray = poem.split('');
    poemTextElement.innerHTML = ''; // Clear any previous text

    const typingInterval = setInterval(() => {
        if (i < poemArray.length) {
            poemTextElement.innerHTML += poemArray[i];
            i++;
        } else {
            clearInterval(typingInterval);
        }
    }, 150); // Adjust typing speed by modifying this value (in ms)
}

// Function to display the poem
function showPoem() {
    poemContainer.classList.remove("hidden"); // Show the poem container
    typePoem(); // Start typing the poem
}

// Function that triggers the "Proceed" action
function showFinalSurprise() { 
    // Hide countdown and any open dialogs
    document.querySelector('.countdown-container').classList.add('hidden');
    document.querySelector('#dialoug-container').classList.add('hidden'); // Hide any open dialogs

    // Show the final surprise screen
    document.getElementById("surprise-screen").classList.remove("hidden");

    // Play background music
    const music = document.getElementById("bg-music");
    music.src = "assets/music/Finding Her.mp3"; // Use a special song
    music.play();
 

    // Start the poem typing after "Proceed" button is clicked
    showPoem();
}
