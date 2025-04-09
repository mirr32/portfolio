const fileInput = document.getElementById('file-input');
const mediaPreview = document.getElementById('media-preview');
const maxImages = 4;
let selectedFiles = [];

fileInput.addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    
    if (selectedFiles.length + files.length > maxImages) {
        alert(`画像は最大${maxImages}枚まで添付できます。`);
        return;
    }

    files.forEach(file => {
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const previewContainer = document.createElement('div');
                previewContainer.className = 'preview-container';
                
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'preview-image';
                
                const removeButton = document.createElement('div');
                removeButton.className = 'remove-image';
                removeButton.innerHTML = '×';
                removeButton.onclick = function() {
                    selectedFiles = selectedFiles.filter(f => f !== file);
                    previewContainer.remove();
                };

                previewContainer.appendChild(img);
                previewContainer.appendChild(removeButton);
                mediaPreview.appendChild(previewContainer);
                selectedFiles.push(file);
            };
            reader.readAsDataURL(file);
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.section');
    
    // 初期表示時にビューポート内のセクションをアクティブにする
    checkSections();
    
    // スクロール時にセクションをチェック
    window.addEventListener('scroll', checkSections);
    
    function checkSections() {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('active');
            }
        });
    }
}); 