const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

let currentMonth;
let currentYear;

// Function to create an editable cell with an input element
function createEditableCell() {
  const cell = document.createElement('td');
  const inputElement = document.createElement('input');
  inputElement.type = 'text';
  inputElement.value = '';
  cell.appendChild(inputElement);
  return cell;
}

// Function to populate the table with days, months, and office hour cells
function populateTable(month, year) {
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = '';

  // Get the last day of the specified month
  const lastDay = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= lastDay; day++) {
    const row = document.createElement('tr');
    const dayIndex = new Date(year, month, day).getDay();
    const dayOfWeek = daysOfWeek[dayIndex];
    const monthName = months[month];

    const dayCell = document.createElement('td');
    dayCell.textContent = dayOfWeek;
    row.appendChild(dayCell);

    const monthCell = document.createElement('td');
    monthCell.textContent = `${day} ${monthName} ${year}`;
    row.appendChild(monthCell);

    // For each day, add editable input cells for office hours
    for (let i = 0; i < 13; i++) {
      const hourCell = createEditableCell();
      row.appendChild(hourCell);
    }

    tableBody.appendChild(row);
  }
}

// Function to update the table with the current month and year
function updateTable() {
  populateTable(currentMonth, currentYear);
}

// Function to switch to the previous month
function previousMonth() {
  if (currentMonth === 0) {
    currentMonth = 11;
    currentYear -= 1;
  } else {
    currentMonth -= 1;
  }
  updateTable();
}

// Function to switch to the next month
function nextMonth() {
  if (currentMonth === 11) {
    currentMonth = 0;
    currentYear += 1;
  } else {
    currentMonth += 1;
  }
  updateTable();
}

// Initialize the calendar with the current date
function initializeCalendar() {
  const currentDate = new Date();
  currentMonth = currentDate.getMonth();
  currentYear = currentDate.getFullYear();
  populateTable(currentMonth, currentYear);
}

// Function to set dark mode or light mode
function setDarkMode(enabled) {
  const body = document.body;
  if (enabled) {
    body.classList.add('dark-mode');
  } else {
    body.classList.remove('dark-mode');
  }
}

// Check the user's preferred color scheme (dark or light mode)
function checkPreferredColorScheme() {
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  setDarkMode(prefersDarkScheme);
}

// Toggle the mode on button click
document.getElementById('mode-toggle').addEventListener('click', () => {
  const isDarkMode = document.body.classList.contains('dark-mode');
  setDarkMode(!isDarkMode);
});

// Set the initial mode based on user's preference or default to light mode
checkPreferredColorScheme();

// Initialize the calendar
initializeCalendar();

// Event listener for "Previous Month" button
document.querySelector('.prev-month').addEventListener('click', previousMonth);

// Event listener for "Next Month" button
document.querySelector('.next-month').addEventListener('click', nextMonth);
