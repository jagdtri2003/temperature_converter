const {coll} = require('../src/conn');

document.addEventListener("DOMContentLoaded", function () {
    const temperatureInput = document.getElementById("temperatureInput");
    const unitSelector = document.getElementById("unitSelector");
    const convertButton = document.getElementById("convertButton");
    const result = document.getElementById("result");

    convertButton.addEventListener("click", async function () {
        const inputValue = parseFloat(temperatureInput.value);
        const selectedUnit = unitSelector.value;

        if (!isNaN(inputValue)) {
            let convertedTemperature;
            let unit;

            if (selectedUnit === "celsius") {
                convertedTemperature = (inputValue - 32) * (5/9);
                unit = "Celsius";
            } else if (selectedUnit === "fahrenheit") {
                convertedTemperature = (inputValue * 9/5) + 32;
                unit = "Fahrenheit";
            } else if (selectedUnit === "kelvin") {
                convertedTemperature = inputValue + 273.15;
                unit = "Kelvin";
            }

            result.textContent = `Converted Temperature: ${convertedTemperature.toFixed(2)} ${unit}`;

            // Save the result and current time to MongoDB

            try {
                const currentTime = new Date();
                await coll.insertOne({ temperature: convertedTemperature.toFixed(2), unit, time: currentTime });
                console.log("Result saved to MongoDB.");
            } catch (error) {
                console.error("Error saving result to MongoDB:", error);
            }

        } else {
            result.textContent = "Please enter a valid number.";
        }
    });
});