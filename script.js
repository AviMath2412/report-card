document.getElementById('reportCardForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from refreshing the page

    // Get form values
    let studentName = document.getElementById('studentName').value;
    let subject1 = parseInt(document.getElementById('subject1').value);
    let subject2 = parseInt(document.getElementById('subject2').value);
    let subject3 = parseInt(document.getElementById('subject3').value);
    let subject4 = parseInt(document.getElementById('subject4').value);
    let subject5 = parseInt(document.getElementById('subject5').value);

    // Calculate total, percentage, and result
    let totalMarks = subject1 + subject2 + subject3 + subject4 + subject5;
    let percentage = (totalMarks / 500) * 100;
    let result = percentage >= 40 ? 'Pass' : 'Fail';

    // Display the report card
    document.getElementById('studentNameDisplay').innerText = `Student Name: ${studentName}`;
    document.getElementById('marksDisplay').innerText = `Total Marks: ${totalMarks}/500`;
    document.getElementById('percentageDisplay').innerText = `Percentage: ${percentage.toFixed(2)}%`;
    document.getElementById('resultDisplay').innerText = `Result: ${result}`;

    // Show the report card
    document.getElementById('reportCard').classList.remove('hidden');
});

document.getElementById('themeToggle').addEventListener('change', function() {
    let body = document.body;
    
    // Toggle dark mode based on checkbox state
    body.classList.toggle('dark-mode', this.checked);
});

// Dark Mode Toggle Functionality
document.getElementById('darkModeToggle').addEventListener('click', function() {
   document.body.classList.toggle('dark-mode');
   const reportCardContainer = document.querySelector('.container');
   reportCardContainer.classList.toggle('dark-mode');
});