// Simple calculator logic supporting multiplication and division only

const displayEl = document.getElementById('display');
const keys = document.querySelectorAll('.btn');

let currentInput = '0';
let firstOperand = null;
let operator = null; // 'multiply' or 'divide'
let waitingForSecond = false;

function updateDisplay(){
	displayEl.textContent = currentInput;
}

function clearAll(){
	currentInput = '0';
	firstOperand = null;
	operator = null;
	waitingForSecond = false;
	updateDisplay();
}

function inputDigit(d){
	if(waitingForSecond){
		currentInput = d;
		waitingForSecond = false;
	} else {
		if(currentInput === '0' && d !== '.') currentInput = d;
		else currentInput += d;
	}
	updateDisplay();
}

function inputDot(){
	if(waitingForSecond){
		currentInput = '0.';
		waitingForSecond = false;
	} else if(!currentInput.includes('.')){
		currentInput += '.';
	}
	updateDisplay();
}

function handleOperator(op){
	const inputValue = parseFloat(currentInput);
	if(firstOperand === null){
		firstOperand = inputValue;
	} else if(operator){
		const result = calculate(firstOperand, inputValue, operator);
		firstOperand = result;
		currentInput = String(result);
		updateDisplay();
	}
	operator = op;
	waitingForSecond = true;
}

function calculate(a,b,op){
	if(op === 'multiply') return a * b;
	if(op === 'divide'){
		if(b === 0) return 'Erreur';
		return a / b;
	}
	return b;
}

function handleEquals(){
	if(operator == null || firstOperand === null) return;
	const second = parseFloat(currentInput);
	const result = calculate(firstOperand, second, operator);
	currentInput = (result === 'Erreur') ? result : String(roundResult(result));
	firstOperand = null;
	operator = null;
	waitingForSecond = false;
	updateDisplay();
}

function roundResult(v){
	if(Number.isFinite(v)) return Math.round(v * 1e12)/1e12;
	return v;
}

document.addEventListener('click', (e)=>{
	const btn = e.target.closest('.btn');
	if(!btn) return;
	const v = btn.dataset.value;
	const op = btn.dataset.op;

	if(btn.classList.contains('clear')){ clearAll(); return; }
	if(btn.classList.contains('equal')){ handleEquals(); return; }
	if(op){ handleOperator(op); return; }
	if(v === '.') { inputDot(); return; }
	if(v !== undefined){ inputDigit(v); return; }
});

// initialize
updateDisplay();
