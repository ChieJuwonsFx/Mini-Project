document.addEventListener('DOMContentLoaded', function() {
    let defaultAge = 25;
    let defaultGender = 'male';
    let defaultWeight = 70;
    let defaultHeight = 175;

    document.getElementById('age').value = defaultAge;
    document.getElementById('weight').value = defaultWeight;
    document.getElementById('height').value = defaultHeight;

    let genderRadios = document.querySelectorAll('input[name="gender"]');
    genderRadios.forEach(radio => {
        if (radio.value === defaultGender) {
            radio.checked = true;
        }
    });


    document.getElementById('bmiForm').addEventListener('submit', function(event) {

    event.preventDefault();

    let age = parseInt(document.getElementById('age').value);
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let weight = parseFloat(document.getElementById('weight').value);
    let height = parseFloat(document.getElementById('height').value) / 100; 

    let bmi = weight / (height * height);
    let bmiCategory = getBMICategory(age, gender, bmi);
    let healthyWeightRange = getHealthyWeightRange(age, gender, height);
    let gainToBMI25 = getWeightGainToBMI25(weight, height);
    let loseToHealthyBMI = getWeightLossToHealthyBMI(weight, height);
    let ponderalIndex = weight / (height * height * height);
    let bmiProgressPercent;
    if (bmi < 18.5) {
        bmiProgressPercent = (bmi / 18.5) * 50; 
    } else if (bmi >= 18.5 && bmi <= 25) {
        bmiProgressPercent = 50 + ((bmi - 18.5) / (25 - 18.5)) * 50; 
    } else {
        bmiProgressPercent = 100; 
    }

    
    if (gainToBMI25 < 0) {
        gainToBMI25 = 0;
    }
    if (loseToHealthyBMI < 0) {
        loseToHealthyBMI = 0;
    }

    document.getElementById('bmiResult').innerHTML = `
    <div class="max-w-md mx-auto bg-white shadow-md rounded p-4">
        <h2 class="text-2xl font-semibold mb-4">BMI Result</h2>
        <p class="mb-2"><strong>BMI Category:</strong> ${bmiCategory}</p>
        <div class="mb-4">
            <div class="relative h-4 rounded-full bg-gray-200">
                <div class="absolute inset-0 rounded-full ${getBmiColorClass(bmiCategory)}" style="width: ${bmiProgressPercent}%;"></div>
            </div>
        </div>
        <p class="mb-2"><strong>Body Mass Index (BMI):</strong></p>
        <p class="text-3xl font-bold mb-4">${bmi.toFixed(2)} kg/m²</p>
        <div class="mb-4">
            <p class="mb-2"><strong>Healthy BMI range:</strong> 18.5 kg/m² - 25 kg/m²</p>
            <p class="mb-2"><strong>Healthy weight for the height:</strong> ${healthyWeightRange.min.toFixed(2)} kg - ${healthyWeightRange.max.toFixed(2)} kg</p>
            <p class="mb-2"><strong>Gain to reach a BMI of 18.5 kg/m²:</strong> ${gainToBMI25.toFixed(2)} kg</p>
            <p class="mb-2"><strong>Lose to reach a BMI of 25 kg/m²:</strong> ${loseToHealthyBMI.toFixed(2)} kg</p>
            <p class="mb-2"><strong>Ponderal Index:</strong> ${ponderalIndex.toFixed(2)} kg/m³</p>
        </div>
    </div>
`;

function getBmiColorClass(bmiCategory) {
    switch (bmiCategory) {
        case 'Severely underweight':
            return 'bg-gray-300'; 
        case 'Underweight':
            return 'bg-blue-500';
        case 'Mildly underweight':
            return 'bg-blue-300'; 
        case 'Normal (healthy weight)':
            return 'bg-green-500';
        case 'Overweight':
            return 'bg-yellow-500';
        case 'Obese Class I (Moderate)':
            return 'bg-orange-500'; 
        case 'Obese Class II (Severe)':
            return 'bg-red-500';
        case 'Obese Class III (Very severe)':
            return 'bg-maroon-500'; 
        default:
            return 'bg-gray-500';
        }
    }

});

const childBMI = {
    '2': { min: { male: 14.7, female: 14.4 }, max: { male: 18.2, female: 18 } },
    '3': { min: { male: 14.3, female: 14 }, max: { male: 17.4, female: 17.2 } },
    '4': { min: { male: 14, female: 13.7 }, max: { male: 16.9, female: 16.8 } },
    '5': { min: { male: 13.8, female: 13.5 }, max: { male: 16.8, female: 16.8 } },
    '6': { min: { male: 13.7, female: 13.4 }, max: { male: 17, female: 17.1 } },
    '7': { min: { male: 13.7, female: 13.4 }, max: { male: 17.4, female: 17.6 } },
    '8': { min: { male: 13.8, female: 13.5 }, max: { male: 17.9, female: 18.3 } },
    '9': { min: { male: 14, female: 13.7 }, max: { male: 18.6, female: 19.1 } },
    '10': { min: { male: 14.2, female: 14 }, max: { male: 19.4, female: 19.9 } },
    '11': { min: { male: 14.5, female: 14.4 }, max: { male: 20.2, female: 20.8 } },
    '12': { min: { male: 15, female: 14.8 }, max: { male: 21, female: 21.7 } },
    '13': { min: { male: 15.4, female: 15.3 }, max: { male: 21.8, female: 22.5 } },
    '14': { min: { male: 16, female: 15.8 }, max: { male: 22.6, female: 23.3 } },
    '15': { min: { male: 16.5, female: 16.3 }, max: { male: 23.4, female: 24 } },
    '16': { min: { male: 17.1, female: 16.8 }, max: { male: 24.2, female: 24.6 } },
    '17': { min: { male: 17.7, female: 17.2 }, max: { male: 24.9, female: 25.2 } },
    '18': { min: { male: 18.2, female: 17.5 }, max: { male: 25.6, female: 25.7 } },
    '19': { min: { male: 18.7, female: 17.8 }, max: { male: 26.3, female: 26.1 } },
    '20': { min: { male: 19.1, female: 17.8 }, max: { male: 27, female: 26.5 } },
};

function getBMICategory(age, gender, bmi) {
    if (age >= 2 && age <= 20) {
        let minBMI = childBMI[age.toString()].min[gender];
        let maxBMI = childBMI[age.toString()].max[gender];

        if (bmi < minBMI) {
            return 'Underweight';
        } else if (bmi >= minBMI && bmi < 18.5) {
            return 'Normal (underweight)';
        } else if (bmi >= 18.5 && bmi < 24.9) {
            return 'Normal (healthy weight)';
        } else if (bmi >= 24.9 && bmi < maxBMI) {
            return 'Overweight';
        } else {
            return 'Obese';
        }
    } else {
        if (bmi < 16) {
            return 'Severely underweight';
        } else if (bmi >= 16 && bmi < 17) {
            return 'Underweight';
        } else if (bmi >= 17 && bmi < 18.5) {
            return 'Mildly underweight';
        } else if (bmi >= 18.5 && bmi < 25) {
            return 'Normal';
        } else if (bmi >= 25 && bmi < 30) {
            return 'Overweight';
        } else if (bmi >= 30 && bmi < 35) {
            return 'Obese Class I (Moderate)';
        } else if (bmi >= 35 && bmi < 40) {
            return 'Obese Class II (Severe)';
        } else {
            return 'Obese Class III (Very severe)';
        }
    }
}

function getHealthyWeightRange(age, gender, height) {
    let minWeight, maxWeight;

    if (age >= 2 && age <= 20) {
        minWeight = childBMI[age.toString()].min[gender] * height * height;
        maxWeight = childBMI[age.toString()].max[gender] * height * height;
    } else {
        minWeight = 18.5 * height * height;
        maxWeight = 25 * height * height;
    }

    return { min: minWeight, max: maxWeight };
}

function getWeightGainToBMI25(weight, height) {
    let healthyWeight = 18.5 * height * height;
    return healthyWeight - weight;
}

function getWeightLossToHealthyBMI(weight, height) {
    let healthyWeight = 24.9 * height * height;
    return weight - healthyWeight;
}
})
