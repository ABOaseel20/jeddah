const imageUpload = document.getElementById('image-upload');
const nameInput = document.getElementById('name-input');
const imageType = document.getElementById('image-type');
const generateBtn = document.getElementById('generate-btn');
const imageCanvas = document.getElementById('image-canvas');
const downloadBtn = document.getElementById('download-btn');
const ctx = imageCanvas.getContext('2d');

let uploadedImage;

imageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const img = new Image();
        img.onload = function() {
            const aspectRatio = img.width / img.height;

            // تعيين عرض وارتفاع الصورة بناءً على النسبة العرضية للصورة
            if (imageType.value === 'portrait') {
                imageCanvas.width = 600; // عرض ثابت للطول
                imageCanvas.height = 600 / aspectRatio; // الحفاظ على النسبة العرضية
            } else {
                imageCanvas.width = 800; // عرض ثابت للعرض
                imageCanvas.height = 800 / aspectRatio; // الحفاظ على النسبة العرضية
            }

            ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
            ctx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
            uploadedImage = img;
        };
        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
});

generateBtn.addEventListener('click', function() {
    if (!uploadedImage) {
        alert('يرجى تحميل صورة أولاً!');
        return;
    }

    const name = nameInput.value;

    ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
    ctx.drawImage(uploadedImage, 0, 0, imageCanvas.width, imageCanvas.height);

    // إعدادات الخط
    ctx.font = 'bold 25px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'black';
    ctx.shadowBlur = 7;

    // تحديد موقع النص في أسفل الصورة ولكن مرفوع للأعلى
    const x = imageCanvas.width / 2;
    const y = imageCanvas.height - 160; // رفع النص لأعلى بحيث لا يكون في الحافة السفلية تماماً

    // رسم الاسم
    ctx.fillText(name, x, y);

    const imageData = imageCanvas.toDataURL('image/jpeg');
    downloadBtn.href = imageData;
});