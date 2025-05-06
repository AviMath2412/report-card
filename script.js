// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create particle background for futuristic look
    createParticleBackground();

    // Update generation date
    document.getElementById("generationDate").textContent = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Update generation date
    document.getElementById("generationDate").textContent = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    // Form submission handler
    document.getElementById("reportCardForm").addEventListener("submit", function(e) {
        e.preventDefault();
        
        // Show loading state with modern animation
        const submitButton = document.getElementById("submitButton");
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = `
            <div class="loading-wrapper">
                <span class="loading-text">Generating</span>
                <div class="loading-dots">
                    <span>.</span><span>.</span><span>.</span>
                </div>
            </div>
        `;
        submitButton.disabled = true;
        
        // Get form values
        const formData = {
            studentName: document.getElementById("studentName").value,
            studentID: document.getElementById("studentID").value,
            studentClass: document.getElementById("class").value,
            year: document.getElementById("year").value,
            branch: document.getElementById("branch").value,
            semester: document.getElementById("semester").value,
            teacherRemarks: document.getElementById("teacherRemarks").value,
            subjects: [
                { name: "English", marks: parseInt(document.getElementById("subject1").value) },
                { name: "Physics", marks: parseInt(document.getElementById("subject2").value) },
                { name: "Chemistry", marks: parseInt(document.getElementById("subject3").value) },
                { name: "Mathematics", marks: parseInt(document.getElementById("subject4").value) },
                { name: "Computer Programming", marks: parseInt(document.getElementById("subject5").value) }
            ]
        };

        // Calculate results
        const totalMarks = formData.subjects.reduce((sum, subject) => sum + subject.marks, 0);
        const percentage = (totalMarks / 500) * 100;
        const result = calculateResult(percentage);

        // Simulate processing with modern loading animation
        setTimeout(() => {
            // Update the report card with modern styling
            updateReportCard(formData, totalMarks, percentage, result);
            
            // Show success message with animation
            showSuccessMessage();
            
            // Reset button state with smooth transition
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
            
            // Generate PDF with modern design
            // Calculate grade color based on percentage
            const gradeColor = percentage >= 90 ? '#10b981' : 
                              percentage >= 80 ? '#6366f1' : 
                              percentage >= 70 ? '#8b5cf6' : 
                              percentage >= 60 ? '#f59e0b' : 
                              percentage >= 40 ? '#f97316' : '#ef4444';
                              
            generatePDF(
                formData.studentName,
                formData.studentID,
                formData.studentClass,
                formData.year,
                formData.branch,
                formData.semester,
                formData.subjects,
                totalMarks,
                percentage,
                result,
                formData.teacherRemarks,
                gradeColor
            );
        }, 1500);
    });
    
    // Calculate result with modern grade system
    function calculateResult(percentage) {
        const grades = [
            { min: 90, grade: "A+", status: "Outstanding" },
            { min: 80, grade: "A", status: "Excellent" },
            { min: 70, grade: "B", status: "Very Good" },
            { min: 60, grade: "C", status: "Good" },
            { min: 50, grade: "D", status: "Satisfactory" },
            { min: 40, grade: "E", status: "Pass" },
            { min: 0, grade: "F", status: "Fail" }
        ];
        
        const result = grades.find(g => percentage >= g.min);
        return `${result.status} (Grade: ${result.grade})`;
    }

    // PDF Download button handler
    document.getElementById("downloadPDF").addEventListener("click", function() {
        const studentName = document.getElementById("studentName").value;
        // Add click effect
        this.classList.add('button-click');
        setTimeout(() => this.classList.remove('button-click'), 300);
        downloadGeneratedPDF(studentName);
    });
    
    // Print button handler
    document.getElementById("printReport").addEventListener("click", function() {
        // Add click effect
        this.classList.add('button-click');
        setTimeout(() => this.classList.remove('button-click'), 300);
        
        window.print();
    });
    
    // Dark Mode Toggle Functionality with smooth transition
    document.getElementById("themeToggle").addEventListener("change", function() {
        document.body.classList.toggle("dark-mode", this.checked);
        
        // Save preference to localStorage
        localStorage.setItem("darkMode", this.checked ? "enabled" : "disabled");
        
        // Update particle colors
        updateParticleColors(this.checked);
    });
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme === "enabled") {
        document.getElementById("themeToggle").checked = true;
        document.body.classList.add("dark-mode");
        updateParticleColors(true);
    }
    
    // Add input animation effects
    const inputs = document.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('input-focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('input-focused');
        });
    });
});

// Global variable to store the generated PDF
let generatedPDF = null;

// Function to generate PDF with modern design
function generatePDF(studentName, studentID, studentClass, year, branch, semester, 
                    subjects, totalMarks, percentage, result, teacherRemarks, gradeColor) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add a gradient background
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
    
    // Create gradient background
    for (let i = 0; i < height; i += 0.5) {
        const ratio = i / height;
        // Create a subtle gradient from light blue to white
        const r = Math.floor(246 + (255 - 246) * ratio);
        const g = Math.floor(248 + (255 - 248) * ratio);
        const b = Math.floor(252 + (255 - 252) * ratio);
        
        doc.setDrawColor(r, g, b);
        doc.setLineWidth(0.5);
        doc.line(0, i, width, i);
    }

    // Add a decorative header
    doc.setFillColor(99, 102, 241); // Primary color
    doc.roundedRect(0, 0, width, 40, 0, 0, [0, 0], 'F');
    
    // Add a decorative accent line
    doc.setFillColor(16, 185, 129); // Secondary color
    doc.rect(0, 40, width, 3, 'F');

    // Set font and styles for the title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255); // White color
    doc.text(`Performance Analytics Report`, width/2, 25, null, null, 'center');

    // Add current date
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(220, 220, 220); // Light gray
    const currentDate = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    doc.text(`Generated: ${currentDate}`, width - 15, 15, null, null, 'right');

    // Student Details in a modern card format
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(15, 50, width - 30, 60, 3, 3, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40); // Dark gray
    doc.text(`${studentName}`, 25, 65);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100); // Medium gray
    
    let y = 80;
    doc.text(`ID: ${studentID}`, 25, y);
    doc.text(`Class: ${studentClass}`, 80, y);
    doc.text(`Year: ${year}`, 140, y);
    y += 10;
    doc.text(`Specialization: ${branch}`, 25, y);
    doc.text(`Term: ${semester}`, 140, y);

    // Add a section title for performance metrics
    y += 25;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(99, 102, 241); // Primary color
    doc.text(`Performance Metrics`, 25, y);
    
    // Add a subtle line under the section title
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(25, y + 5, 190, y + 5);
    
    // Add subject header
    y += 15;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(80, 80, 80);
    doc.text("Subject", 25, y);
    doc.text("Score", 120, y);
    doc.text("Status", 160, y);
    
    // Add a line under the header
    doc.setDrawColor(220, 220, 220);
    doc.line(25, y + 3, 190, y + 3);
    
    // Set font for subjects
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);

    // Add subjects and marks with a table-like structure
    y += 10;
    subjects.forEach(subject => {
        const status = subject.marks >= 40 ? "Pass" : "Fail";
        
        doc.text(`${subject.name}`, 25, y);
        doc.text(`${subject.marks}/100`, 120, y);
        
        // Set color based on pass/fail
        if (status === "Pass") {
            doc.setTextColor(16, 185, 129); // Success color
        } else {
            doc.setTextColor(239, 68, 68); // Danger color
        }
        
        doc.text(`${status}`, 160, y);
        doc.setTextColor(60, 60, 60); // Reset color
        
        // Add a performance bar
        const barWidth = subject.marks * 0.6; // Scale to fit
        doc.setFillColor(220, 220, 220); // Background color
        doc.roundedRect(25, y + 3, 60, 3, 1.5, 1.5, 'F');
        
        // Set color based on score
        if (subject.marks >= 80) doc.setFillColor(99, 102, 241); // Primary
        else if (subject.marks >= 60) doc.setFillColor(16, 185, 129); // Secondary
        else if (subject.marks >= 40) doc.setFillColor(245, 158, 11); // Warning
        else doc.setFillColor(239, 68, 68); // Danger
        
        doc.roundedRect(25, y + 3, barWidth, 3, 1.5, 1.5, 'F');
        
        y += 15; // Move down for the next subject
    });

    // Add a line after subjects
    doc.setDrawColor(220, 220, 220);
    doc.line(25, y, 190, y);
    y += 15;
    
    // Add overall performance section
    doc.setFillColor(250, 250, 250);
    doc.roundedRect(15, y, width - 30, 50, 3, 3, 'F');
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(99, 102, 241); // Primary color
    doc.text(`Overall Performance`, 25, y + 15);
    
    // Add percentage and result
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(parseInt(gradeColor.slice(1, 3), 16), parseInt(gradeColor.slice(3, 5), 16), parseInt(gradeColor.slice(5, 7), 16));
    doc.text(`${percentage.toFixed(1)}%`, 25, y + 35);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(14);
    doc.text(`${result}`, 80, y + 35);
    
    // Add total marks
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(100, 100, 100);
    doc.text(`Total Score: ${totalMarks}/500`, 150, y + 35);
    
    // Teacher's Remarks section
    y += 65;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(99, 102, 241); // Primary color
    doc.text(`Educator Assessment`, 25, y);
    
    // Add a subtle line under the section title
    doc.setDrawColor(220, 220, 220);
    doc.setLineWidth(0.5);
    doc.line(25, y + 5, 190, y + 5);
    
    y += 15;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    
    // Split remarks into multiple lines if needed
    const splitRemarks = doc.splitTextToSize(teacherRemarks, 165);
    doc.text(splitRemarks, 25, y);

    // Add a footer with a gradient
    doc.setFillColor(99, 102, 241); // Primary color
    doc.rect(0, height - 15, width, 15, 'F');
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text(`© ${new Date().getFullYear()} Academic Performance Analytics System`, width/2, height - 5, null, null, 'center');

    // Store the generated PDF
    generatedPDF = doc;
}

// Function to download the generated PDF
function downloadGeneratedPDF(studentName) {
    if (generatedPDF) {
        generatedPDF.save(`${studentName}_Performance_Report.pdf`);
    }
}

// Function to simulate processing with a futuristic delay sequence
function simulateProcessing(callback) {
    const steps = [
        { delay: 400, message: "Analyzing data" },
        { delay: 600, message: "Calculating metrics" },
        { delay: 400, message: "Generating report" },
        { delay: 300, message: "Finalizing" }
    ];
    
    const button = document.getElementById("submitButton");
    let totalDelay = 0;
    
    steps.forEach((step, index) => {
        totalDelay += step.delay;
        setTimeout(() => {
            button.querySelector('.processing-text').textContent = step.message;
        }, totalDelay);
    });
    
    setTimeout(callback, totalDelay + 300);
}

// Function to create a particle background effect
function createParticleBackground() {
    const canvas = document.createElement('canvas');
    canvas.id = 'particle-background';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let particleColor = '99, 102, 241';
    const particles = [];
    const particleCount = 50;

    // Resize handler
    function handleResize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', handleResize);
    handleResize();

    // Create initial particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2 + 1,
            vx: Math.random() * 1 - 0.5,
            vy: Math.random() * 1 - 0.5,
            opacity: Math.random() * 0.5 + 0.2
        });
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((p, index) => {
            // Move particles
            p.x += p.vx;
            p.y += p.vy;
            
            // Wrap around edges
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${particleColor}, ${p.opacity})`;
            ctx.fill();
            
            // Draw connections
            particles.slice(index + 1).forEach(p2 => {
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(${particleColor}, ${(1 - distance / 100) * 0.2})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(animate);
    }

    // Update particle colors based on theme
    window.updateParticleColors = function(isDarkMode) {
        particleColor = isDarkMode ? '129, 140, 248' : '99, 102, 241';
    };

    // Start animation
    animate();
}

// Function to add typing effect
function typeText(element, text, speed = 50) {
    let i = 0;
    const interval = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, speed);
}

// Function to update the report card display
function updateReportCard(formData, totalMarks, percentage, result) {
    // Show the report card
    const reportCard = document.getElementById("reportCard");
    reportCard.classList.remove("hidden");
    
    // Update student information
    document.getElementById("studentNameDisplay").innerHTML = `
        <h3>${formData.studentName}</h3>
        <p class="student-id">ID: ${formData.studentID}</p>
    `;
    
    document.getElementById("studentDetailsDisplay").innerHTML = `
        <div class="detail-row">
            <span class="detail-label">Class:</span>
            <span class="detail-value">${formData.studentClass}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Year:</span>
            <span class="detail-value">${formData.year}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Branch:</span>
            <span class="detail-value">${formData.branch}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Semester:</span>
            <span class="detail-value">${formData.semester}</span>
        </div>
    `;
    
    // Create marks table
    let marksHTML = `
        <table>
            <thead>
                <tr>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    formData.subjects.forEach(subject => {
        const status = subject.marks >= 40 ? 'pass' : 'fail';
        marksHTML += `
            <tr>
                <td>${subject.name}</td>
                <td>${subject.marks}/100</td>
                <td class="${status}">${status.toUpperCase()}</td>
            </tr>
        `;
    });
    
    marksHTML += `</tbody></table>`;
    document.getElementById("marksDisplay").innerHTML = marksHTML;
    
    // Update results
    document.getElementById("percentageDisplay").innerHTML = `
        <div class="percentage">
            <span class="value">${percentage.toFixed(1)}%</span>
            <span class="label">Overall Percentage</span>
        </div>
        <div class="total-marks">
            <span class="value">${totalMarks}/500</span>
            <span class="label">Total Marks</span>
        </div>
    `;
    
    document.getElementById("resultDisplay").innerHTML = `
        <div class="result ${percentage >= 40 ? 'pass' : 'fail'}">
            ${result}
        </div>
    `;
    
    // Update remarks
    document.getElementById("remarksDisplay").textContent = formData.teacherRemarks;

    // Scroll to the report card
    reportCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Add missing success message function
function showSuccessMessage() {
    const successMessage = document.getElementById("successMessage");
    successMessage.classList.remove("hidden");
    setTimeout(() => {
        successMessage.classList.add("hidden");
    }, 3000);
}
