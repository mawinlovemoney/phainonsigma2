const calculatorScreen = document.getElementById('result');
const calculatorKeys = document.querySelector('.calculator-keys');

let calculation = '';

function updateScreen() {
    calculatorScreen.value = calculation;
}

calculatorKeys.addEventListener('click', (event) => {
    const { target } = event;
    const value = target.value;

    if (!target.matches('button')) {
        return;
    }

    switch (value) {
        case '=':
            try {
                // แทนที่การคำนวณยกกำลัง 2 และ 3
                let expression = calculation.replace(/(\d+)\*\*2/g, (match, p1) => `Math.pow(${p1}, 2)`);
                expression = expression.replace(/(\d+)\*\*3/g, (match, p1) => `Math.pow(${p1}, 3)`);
                
                // แทนที่สแควรูท
                expression = expression.replace(/sqrt\((\d+(\.\d+)?)\)/g, (match, p1) => `Math.sqrt(${p1})`);

                // ตรวจสอบวงเล็บให้ถูกต้อง
                // เพิ่มวงเล็บเพื่อป้องกันปัญหาการคำนวณลำดับ
                // การใช้ eval() ควรระมัดระวังในโปรเจกต์จริง แต่ในที่นี้สำหรับเครื่องคิดเลขพื้นฐานถือว่ายอมรับได้
                calculation = eval(expression).toString();
            } catch (error) {
                calculation = 'Error';
            }
            break;
        case 'all-clear':
            calculation = '';
            break;
        case 'sqrt':
            // เพิ่ม "sqrt(" เมื่อกดปุ่ม √
            calculation += 'sqrt(';
            break;
        case '**2': // ปุ่มยกกำลัง 2
            // ตรวจสอบว่าตัวเลขก่อนหน้าเป็นตัวเลขหรือไม่
            if (calculation.match(/\d+$/)) {
                calculation += value;
            } else {
                calculation = 'Error'; // หรือจะจัดการข้อผิดพลาดในแบบอื่น
            }
            break;
        case '**3': // ปุ่มยกกำลัง 3
            // ตรวจสอบว่าตัวเลขก่อนหน้าเป็นตัวเลขหรือไม่
            if (calculation.match(/\d+$/)) {
                calculation += value;
            } else {
                calculation = 'Error'; // หรือจะจัดการข้อผิดพลาดในแบบอื่น
            }
            break;
        default:
            calculation += value;
            break;
    }

    updateScreen();
});