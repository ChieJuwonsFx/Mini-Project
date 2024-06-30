document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('pengacak-form');
    const itemsInput = document.getElementById('items');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const items = itemsInput.value.split(',').map(item => item.trim()).filter(item => item !== '');
        
        if (items.length > 0) {
            const randomIndex = Math.floor(Math.random() * items.length);
            const randomItem = items[randomIndex];

            resultDiv.textContent = `Hasil: ${randomItem}`;
        } else {
            resultDiv.textContent = 'Masukkan item yang valid!';
        }
    });
});
