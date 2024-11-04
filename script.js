document.getElementById('send-button').addEventListener('click', async function() {
    const userInput = document.getElementById('user-input');
    const responseOutput = document.getElementById('response-output');

    if (!userInput) {
        responseOutput.textContent = 'Пожалуйста, введите вопрос.';
        return;
    }

    responseOutput.textContent = 'Загрузка...';

    try {
        const response = await fetch('https://llm.api.cloud.yandex.net/foundationModels/v1/completion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer t1.9euelZrPjp6WlJOdj5nHmI2Oz4uPnO3rnpWansmOzImTlpqajJGRnpSQyJDl8_cVb11G-e88KC5k_d3z91UdW0b57zwoLmT9zef1656Vmp2cnZ7Ny5jMyJvGxsbIlIqL7_zF656Vmp2cnZ7Ny5jMyJvGxsbIlIqL.zpQs6dF9UD8zhLBNzO1bKpxNqup90NYIKFSGelu_oAhgGYqeWCZvUq7YB-6J0KmH3D4nab6stYxgA51qI3WyAg' // Замените на свой ключ API
            },
            body: JSON.stringify({
                modelURI: 'gpt://b1g7vpmtqcnr8bnvskvr/yandexgpt-lite', // Убедитесь, что используете правильную модель
                messages: [{ role: 'user', content: userInput }]
            })
        });

        if (!response.ok) {
            throw new Error('Ошибка сети');
        }

        const data = await response.json();
        const answer = data.choices[0].message.content;
        responseOutput.textContent = answer;
    } catch (error) {
        responseOutput.textContent = 'Ошибка: ' + error.message;
    }
});
