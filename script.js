document
  .getElementById("reportCardForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    // Get form values
    let studentName = document.getElementById("studentName").value;
    let studentID = document.getElementById("studentID").value;
    let studentClass = document.getElementById("class").value;
    let year = document.getElementById("year").value;
    let branch = document.getElementById("branch").value;
    let semester = document.getElementById("semester").value;
    let teacherRemarks = document.getElementById("teacherRemarks").value;
    let subject1 = parseInt(document.getElementById("subject1").value);
    let subject2 = parseInt(document.getElementById("subject2").value);
    let subject3 = parseInt(document.getElementById("subject3").value);
    let subject4 = parseInt(document.getElementById("subject4").value);
    let subject5 = parseInt(document.getElementById("subject5").value);

    // Calculate total, percentage, and result
    let totalMarks = subject1 + subject2 + subject3 + subject4 + subject5;
    let percentage = (totalMarks / 500) * 100;
    let result = percentage >= 40 ? "Pass" : "Fail";

    // Generate PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add a decorative border
    doc.setDrawColor(255, 215, 0); // Golden color for the border
    doc.setLineWidth(1.5);
    doc.rect(5, 5, 200, 287); // Draw a rectangle border

    // Add a header with a background color
    doc.setFillColor(255, 215, 0); // Golden color
    doc.rect(5, 5, 200, 20, 'F'); // Filled rectangle for header background

    // Set font and styles for the title
    doc.setFont("times", "bold");
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text(`Report Card`, 105, 18, null, null, 'center');

    // Student Details in a tabular format
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color
    let y = 35;
    doc.text(`Student Name:`, 20, y);
    doc.text(`${studentName}`, 80, y);
    y += 10;
    doc.text(`Student ID:`, 20, y);
    doc.text(`${studentID}`, 80, y);
    y += 10;
    doc.text(`Class:`, 20, y);
    doc.text(`${studentClass}`, 80, y);
    y += 10;
    doc.text(`Year:`, 20, y);
    doc.text(`${year}`, 80, y);
    y += 10;
    doc.text(`Branch:`, 20, y);
    doc.text(`${branch}`, 80, y);
    y += 10;
    doc.text(`Semester:`, 20, y);
    doc.text(`${semester}`, 80, y);

    // Set font for subjects
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Add subjects and marks with a table-like structure
    const subjects = [
      { name: "English", marks: subject1 },
      { name: "Physics", marks: subject2 },
      { name: "Chemistry", marks: subject3 },
      { name: "Mathematics", marks: subject4 },
      { name: "Computer Programming", marks: subject5 },
    ];

    y += 20; // Starting position for subjects
    subjects.forEach(subject => {
      doc.text(`${subject.name}:`, 20, y);
      doc.text(`${subject.marks}`, 180, y, null, null, 'right');
      y += 10; // Move down for the next subject
    });

    // Teacher's Remarks
    y += 10; // Add some space before the remarks
    doc.setFont("courier", "italic");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Black color
    doc.text(`Teacher's Remarks:`, 20, y);
    y += 10;
    doc.setFont("times", "italic");
    doc.setFontSize(12);
    doc.text(teacherRemarks, 20, y, { maxWidth: 170 });

    // Summary with bold font
    y += 20; // Add some space before the summary
    doc.setFont("helvetica", "bold");
    doc.text(`Total Marks: ${totalMarks}/500`, 20, y);
    y += 10;
    doc.text(`Percentage: ${percentage.toFixed(2)}%`, 20, y);
    y += 10;
    doc.text(`Result: ${result}`, 20, y);

    // Add a footer
    doc.setFont("times", "italic");
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100); // Grey color
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 290, null, null, 'center');

    // Save the PDF
    doc.save(`${studentName}_Report_Card.pdf`); // Save the PDF with the student's name
  });

document.getElementById("themeToggle").addEventListener("change", function () {
  let body = document.body;

  // Toggle dark mode based on checkbox state
  body.classList.toggle("dark-mode", this.checked);
});

// Dark Mode Toggle Functionality
document
  .getElementById("darkModeToggle")
  .addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    const reportCardContainer = document.querySelector(".container");
    reportCardContainer.classList.toggle("dark-mode");
  });
