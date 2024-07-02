document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('currency-form');
    const resultDiv = document.getElementById('result');

    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.rates);

            const fromSelect = document.getElementById('from');
            const toSelect = document.getElementById('to');

            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.text = currency;
                option1.value = currency;
                const option2 = option1.cloneNode(true);

                fromSelect.add(option1);
                toSelect.add(option2);
            });

            form.addEventListener('submit', function(event) {
                event.preventDefault();
                const amount = parseFloat(document.getElementById('amount').value);
                const fromCurrency = fromSelect.value;
                const toCurrency = toSelect.value;

                const convertedAmount = amount * data.rates[toCurrency] / data.rates[fromCurrency];

                const formattedAmount = new Intl.NumberFormat('id-ID', {
                    style: 'currency',
                    currency: toCurrency,
                    minimumFractionDigits: 2,
                }).format(convertedAmount);

                resultDiv.innerHTML = `${amount.toLocaleString('id-ID')} ${fromCurrency} = ${formattedAmount}`;
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultDiv.innerHTML = 'Terjadi kesalahan saat memuat data mata uang.';
        });
});
