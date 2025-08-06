let array = [];
let delay = 100;
let arraySize = 30;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function updateArraySize(value) {
  arraySize = parseInt(value);
  document.getElementById("sizeValue").innerText = value;
  generateArray();
}

function updateSpeed(value) {
  delay = parseInt(value);
  document.getElementById("speedValue").innerText = value;
}

function generateArray() {
  array = [];
  for (let i = 0; i < arraySize; i++) {
    array.push(Math.floor(Math.random() * 250) + 1);
  }
  drawArray();
}

function drawArray(highlight = []) {
  const container = document.getElementById("array-container");
  container.innerHTML = '';
  array.forEach((val, idx) => {
    const bar = document.createElement("div");
    bar.style.height = `${val}px`;
    bar.classList.add("bar");
    if (highlight.includes(idx)) {
      bar.style.backgroundColor = "green";
    }
    container.appendChild(bar);
  });
}

async function bubbleSort() {
  let n = array.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        drawArray([j, j + 1]);
        await sleep(delay);
      }
    }
  }
  drawArray();
}

async function selectionSort() {
  let n = array.length;
  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (array[j] < array[minIdx]) {
        minIdx = j;
      }
    }
    if (minIdx !== i) {
      [array[i], array[minIdx]] = [array[minIdx], array[i]];
      drawArray([i, minIdx]);
      await sleep(delay);
    }
  }
  drawArray();
}

async function insertionSort() {
  let n = array.length;
  for (let i = 1; i < n; i++) {
    let key = array[i];
    let j = i - 1;
    while (j >= 0 && array[j] > key) {
      array[j + 1] = array[j];
      j--;
      drawArray([j + 1]);
      await sleep(delay);
    }
    array[j + 1] = key;
    drawArray([j + 1]);
    await sleep(delay);
  }
  drawArray();
}

async function mergeSortCall() {
  await mergeSort(0, array.length - 1);
  drawArray();
}

async function mergeSort(left, right) {
  if (left >= right) return;

  let mid = Math.floor((left + right) / 2);
  await mergeSort(left, mid);
  await mergeSort(mid + 1, right);
  await merge(left, mid, right);
}

async function merge(left, mid, right) {
  let n1 = mid - left + 1;
  let n2 = right - mid;
  let L = array.slice(left, mid + 1);
  let R = array.slice(mid + 1, right + 1);

  let i = 0, j = 0, k = left;
  while (i < n1 && j < n2) {
    if (L[i] <= R[j]) {
      array[k++] = L[i++];
    } else {
      array[k++] = R[j++];
    }
    drawArray([k - 1]);
    await sleep(delay);
  }

  while (i < n1) {
    array[k++] = L[i++];
    drawArray([k - 1]);
    await sleep(delay);
  }

  while (j < n2) {
    array[k++] = R[j++];
    drawArray([k - 1]);
    await sleep(delay);
  }
}

async function countingSort() {
  let max = Math.max(...array);
  let count = new Array(max + 1).fill(0);

  for (let i = 0; i < array.length; i++) {
    count[array[i]]++;
    drawArray([i]);
    await sleep(delay);
  }

  let index = 0;
  for (let i = 0; i <= max; i++) {
    while (count[i]-- > 0) {
      array[index++] = i;
      drawArray([index - 1]);
      await sleep(delay);
    }
  }
  drawArray();
}

generateArray(); // initial call
