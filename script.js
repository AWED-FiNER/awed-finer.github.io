import { Client } from "https://cdn.jsdelivr.net/npm/@gradio/client@0.1.4/dist/index.min.js";

const examples = {
    "English": "Jude Bellingham joined Real Madrid in 2023.",
    "Chinese": "姚明出生于上海。",
    "Hindi": "भारत के पूर्वी भाग में स्थित एक राज्य पश्चिमबंग है।",
    "Spanish": "Madrid es la capital de España.",
    "Bodo": "अमिताभ बच्चनआ सासे मुंदांखा फावखुंगुर।",
    "Mizo": "Aizawl khaw vawt tak a ni.",
    "Assamese": "অমিতাভ বচ্চন এজন বিখ্যাত অভিনেতা।",
    "French": "Victor Hugo est né à Besançon.",
    "Urdu": "مرزا غالب دہلی میں رہتے تھے۔",
    "Portuguese": "Cristiano Ronaldo joga futebol.",
    "Marathi": "सचिन तेंडुलकर यांचा जन्म मुंबईत झाला.",
    "German": "Albert Einstein wurde in Ulm geboren.",
    "Telugu": "ఎన్.టి. రామారావు నిమ్మకూరులో జన్మించారు.",
    "Punjabi": "ਮਹਾਰਾਜਾ ਰਣਜੀਤ ਸਿੰਘ ਨੇ ਲਾਹੌਰ 'ਤੇ ਰਾਜ ਕੀਤਾ।",
    "Tamil": "சச்சின் டெண்டுல்கர் சென்னையில் கிரிக்கெட் விளையாடினார்.",
    "Farsi": "فردوسی در توس به دنیا آمد.",
    "Italian": "Dante Alighieri è nato a Firenze.",
    "Gujarati": "રવિન્દ્રનાથ ટાગોરે કલકત્તામાં ગીતાંજલિ લખી હતી.",
    "Kannada": "ಕೆ. ಶಿವರಾಮ ಕಾರಂತರು ಪುತ್ತೂರಿನಲ್ಲಿ ಜನಿಸಿದರು.",
    "Ukrainian": "Тарас Шевченко народився в Моринцях.",
    "Nepali": "भानुभक्त आचार्य तनहुँमा जन्मिएका हुन्।",
    "Bengali": "রবীন্দ্রনাথ ঠাকুর একজন বিখ্যাত লেখক।",
    "Swedish": "Zlatan Ibrahimović föddes i Malmö.",
    "Sanskrit": "लेखकस्य जन्म असमदेशे अभवत् ।",
};

const langSelect = document.getElementById('lang-select');
const textInput = document.getElementById('text-input');
const analyzeBtn = document.getElementById('analyze-btn');
const outputDisplay = document.getElementById('output-display');

// Initialize dropdown
Object.keys(examples).forEach(lang => {
    const opt = document.createElement('option');
    opt.value = lang;
    opt.innerHTML = lang;
    langSelect.appendChild(opt);
});

// Update text when language changes
langSelect.addEventListener('change', () => {
    textInput.value = examples[langSelect.value] || "";
});
textInput.value = examples["English"];

// Connection to HF Space
async function runInference() {
    outputDisplay.innerText = "Processing on Hugging Face Space...";
    try {
        const client = await Client.connect("prachuryyaIITG/AWED-FiNER");
        const result = await client.predict("/predict", { 
            text: textInput.value, 
            language: langSelect.value 
        });
        
        // Simple display logic - you can format this more beautifully later
        outputDisplay.innerHTML = JSON.stringify(result.data[0], null, 2);
    } catch (error) {
        outputDisplay.innerText = "Error: " + error.message;
    }
}

analyzeBtn.addEventListener('click', runInference);
