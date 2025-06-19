// --- دالة لإظهار وإخفاء الأجوبة أو الشروحات ---
function toggleAnswer(id) {
    const element = document.getElementById(id);
    if (element) {
        element.classList.toggle('hidden');
    }
}

// --- دالة التحقق من إجابات أسئلة الاختيار من متعدد ---
/**
 * تتحقق من إجابة الطالب، وتلون الإجابات، وتظهر رسالة مناسبة.
 * @param {HTMLElement} selectedButton - الزر الذي ضغط عليه الطالب.
 * @param {string} questionId - معرف حاوية السؤال (div).
 */
function checkAnswer(selectedButton, questionId) {
    const questionContainer = document.getElementById(questionId);
    if (!questionContainer) {
        console.error('لم يتم العثور على حاوية السؤال:', questionId);
        return;
    }

    const options = questionContainer.querySelectorAll('.mcq-option');
    const feedbackContainer = document.getElementById('feedback-' + questionId);
    const isCorrect = selectedButton.hasAttribute('data-correct');

    // تعطيل جميع الأزرار لمنع إعادة الإجابة
    options.forEach(button => {
        button.disabled = true;
        // إظهار الإجابة الصحيحة دائمًا باللون الأخضر
        if (button.hasAttribute('data-correct')) {
            button.classList.add('correct');
        }
    });

    // التعامل مع الإجابة المختارة
    if (isCorrect) {
        selectedButton.classList.add('correct'); // هذه الخطوة مؤكدة بالفعل من اللูป أعلاه ولكن لا تضر
        if (feedbackContainer) {
            feedbackContainer.textContent = 'إجابة صحيحة! أحسنت.';
            feedbackContainer.className = 'mcq-feedback feedback-correct mt-3 visible';
        }
    } else {
        selectedButton.classList.add('incorrect');
        if (feedbackContainer) {
            feedbackContainer.textContent = 'إجابة خاطئة. الإجابة الصحيحة محددة باللون الأخضر.';
            feedbackContainer.className = 'mcq-feedback feedback-incorrect mt-3 visible';
        }
    }
}


// --- الكود الرئيسي الذي يعمل بعد تحميل الصفحة ---
document.addEventListener('DOMContentLoaded', function() {

    // 1. عرض المعادلات الرياضية باستخدام KaTeX
    // تأكد من أن مكتبة KaTeX تم تحميلها في صفحتك
    if (typeof renderMathInElement !== 'undefined') {
        renderMathInElement(document.body, {
            delimiters: [
                { left: '$$', right: '$$', display: true },
                { left: '$', right: '$', display: false }
            ],
            macros: {
                "\\rsqrt": "\\htmlClass{rsqrt-outer}{\\sqrt{\\htmlClass{rsqrt-inner}{#1}}}"
            },
            trust: true, // ملاحظة أمان هامة: استخدم `true` فقط إذا كنت تثق تمامًا بالمحتوى الرياضي
            throwOnError: false
        });
    }

    // // 2. تفعيل زر "العودة للخلف"
    // const backButton = document.getElementById('backButton');
    // if (backButton) {
    //     backButton.addEventListener('click', () => {
    //         history.back();
    //     });
    // }

    // يمكنك إضافة أي كود آخر للتهيئة هنا...
// --- الكود المحسّن لتفعيل زر "العودة للخلف" مع رابط احتياطي ---
const backButton = document.getElementById('backButton');
if (backButton) {
    backButton.addEventListener('click', () => {
        // التحقق مما إذا كان هناك تاريخ للتصفح للرجوع إليه
        if (document.referrer && document.referrer.indexOf(window.location.host) !== -1) {
             // إذا كان هناك تاريخ داخل نفس الموقع، ارجع للخلف
            history.back();
        } else {
            // إذا لم يكن هناك، أو كان من موقع خارجي، اذهب إلى صفحة رئيسية محددة
            window.location.href = 'index.html'; // <-- قم بتغيير هذا إلى رابط صفحتك الرئيسية
        }
    });
}
});