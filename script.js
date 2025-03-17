document.getElementById('generate').onclick = async () => {
    const input = document.getElementById('input').value;
    const resultDiv = document.getElementById('result');
    
    // Параметры API (замените YOUR_API_KEY на ваш ключ)
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = 'https://api.openai.com/v1/images/generations';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input,
                n: 1,
                size: '1024x1024'
            })
        });

        const data = await response.json();
        const imageUrl = data.data[0].url; // Получаем URL сгенерированного изображения

        // Отображаем изображение
        resultDiv.innerHTML = `<img src="${imageUrl}" alt="Generated Image">`;
    } catch (error) {
        console.error('Ошибка при генерации изображения:', error);
        resultDiv.innerHTML = 'Произошла ошибка. Попробуйте еще раз.';
    }
};
