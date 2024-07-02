document.addEventListener('DOMContentLoaded', function() {
    const teleprompter = document.getElementById('teleprompter');
    const inputForm = document.getElementById('inputForm');
    const textInput = document.getElementById('textInput');
    const speedInput = document.getElementById('speedInput');

    let defaultText = `Tuliskan teks teleprompter Anda di sini.`;

    teleprompter.textContent = defaultText;

    function startTeleprompter(event) {
        event.preventDefault();
        const text = textInput.value.trim();
        const speed = parseFloat(speedInput.value);

        if (text !== '' && !isNaN(speed) && speed > 0) {
            teleprompter.textContent = text;
            textInput.value = ''; 

            let scrollPosition = 0;

            function scrollPrompter() {
                scrollPosition += (speed / 60); 
                if (scrollPosition <= teleprompter.scrollHeight - teleprompter.clientHeight) {
                    teleprompter.scrollTop = scrollPosition;
                } else {
                    scrollPosition = 0;
                    teleprompter.scrollTop = scrollPosition;
                }
                requestAnimationFrame(scrollPrompter); 
            }

            requestAnimationFrame(scrollPrompter); 
        }
    }

    inputForm.addEventListener('submit', startTeleprompter);
});

