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
    modalContent.innerHTML += "<p>" + textInput + "</p>";
    
    var modalContentContainer = document.getElementById('modalContentContainer');
    if (modalContentContainer.scrollHeight > 320) {
        modalContentContainer.classList.add('overflow-y-scroll');
    } else {
        modalContentContainer.classList.remove('overflow-y-scroll');
    }
}