function loadHTML(elementId, filePath, callback) {
    console.log(`Loading ${filePath} into #${elementId}`);
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            if (callback) callback();
        })
        .catch(error => console.error('Error loading HTML:', error));
}
// layout
document.addEventListener("DOMContentLoaded", function() {
    loadHTML('header-placeholder', 'header.html', function() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        if (isLoggedIn) {
            const currentUser =  localStorage.getItem("currentUser");
            var element = document.getElementById("name_user");
            element.textContent = currentUser;
            document.getElementById("header1").classList.remove("hidden");
        } else {
            document.getElementById("header2").classList.remove("hidden");
        }
    });
    loadHTML('menu-placeholder', 'menu.html');
    loadHTML('footer-placeholder', 'footer.html');
    loadHTML('chatbot-placeholder', 'chatbot.html', function() {
        document.getElementById('chatbot-placeholder').style.position = 'fixed';
        document.getElementById('chatbot-placeholder').style.bottom = '20px';
        document.getElementById('chatbot-placeholder').style.right = '20px';
    });
});

// chatbot
var responses = {
    "ho": "Tôi khuyên bạn nên nghỉ ngơi và uống nhiều nước. Nếu triệu chứng ho không giảm hoặc trở nên nghiêm trọng, bạn nên thăm bác sĩ để được tư vấn và điều trị kịp thời. Chúc bạn sớm khỏe lại!",
    "sốt": "Bạn nên đo nhiệt độ cơ thể thường xuyên và uống thuốc hạ sốt theo chỉ dẫn. Nếu sốt kéo dài hoặc quá cao, hãy đến bác sĩ ngay lập tức.",
    "đau đầu": "Bạn nên nghỉ ngơi ở một nơi yên tĩnh và uống đủ nước. Nếu đau đầu kéo dài hoặc trở nên nghiêm trọng, hãy thăm bác sĩ.",
    "đau bụng": "Hãy thử uống nước ấm và tránh ăn những thực phẩm khó tiêu. Nếu đau bụng kéo dài hoặc trở nên nghiêm trọng, bạn nên đi khám bác sĩ.",
    "cảm lạnh": "Bạn nên uống nhiều nước ấm, nghỉ ngơi và có thể dùng thuốc cảm thông thường. Nếu triệu chứng không giảm, hãy thăm bác sĩ.",
    "mệt mỏi": "Hãy nghỉ ngơi và đảm bảo bạn ngủ đủ giấc. Nếu tình trạng mệt mỏi kéo dài, hãy thăm bác sĩ để kiểm tra sức khỏe.",
    "khó thở": "Đây có thể là triệu chứng nghiêm trọng. Hãy tìm sự giúp đỡ y tế ngay lập tức.",
    "đau ngực": "Đây có thể là triệu chứng nghiêm trọng. Hãy tìm sự giúp đỡ y tế ngay lập tức.",
    "đau lưng": "Hãy thử nghỉ ngơi và áp dụng biện pháp chườm nóng hoặc lạnh. Nếu đau lưng kéo dài hoặc nghiêm trọng, hãy thăm bác sĩ.",
    "tiêu chảy": "Hãy uống nhiều nước để tránh mất nước và tránh ăn các thực phẩm khó tiêu. Nếu tiêu chảy kéo dài, hãy thăm bác sĩ.",
    // Add more predefined questions and responses here
};
function toggleModalHuyenv() {
    var modal = document.getElementById('static-modal');
    var img = document.querySelector('.fixed-button');
    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        img.classList.add('hidden');
    } else {
        modal.classList.add('hidden');
        img.classList.remove('hidden');
    }
}
function previewImage(event) {
    var image = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function() {
        var imgElement = document.createElement('img');
        imgElement.src = reader.result;
        imgElement.classList.add('w-24', 'h-24', 'object-cover', 'rounded');
        document.getElementById('modal-content').appendChild(imgElement);
    };
    reader.readAsDataURL(image);
}
function handleSubmit() {
    var textInput = document.getElementById('textInput').value;
    var modalContent = document.getElementById('modal-content');
    var response = getResponse(textInput);
    
    var userTextElement = document.createElement('p');
    userTextElement.textContent = textInput;
    modalContent.appendChild(userTextElement);
    
    var responseElement = document.createElement('p');
    responseElement.textContent = response;
    responseElement.style.backgroundColor = "#E0F7FA"; // Light cyan background for response
    responseElement.style.padding = "10px";
    responseElement.style.borderRadius = "5px";
    modalContent.appendChild(responseElement);
    
    var modalContentContainer = document.getElementById('modalContentContainer');
    if (modalContentContainer.scrollHeight > 320) {
        modalContentContainer.classList.add('overflow-y-scroll');
    } else {
        modalContentContainer.classList.remove('overflow-y-scroll');
    }
}
function getResponse(question) {
    question = question.toLowerCase();
    for (var key in responses) {
        if (question.includes(key)) {
            return responses[key];
        }
    }
    return "Xin lỗi, tôi không hiểu câu hỏi của bạn. Vui lòng hỏi lại.";
}
