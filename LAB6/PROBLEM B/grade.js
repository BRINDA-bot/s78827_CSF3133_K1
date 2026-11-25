/* ============================================================================
   PART 1: IDENTIFIED ERRORS IN GIVEN CODE
   ============================================================================
   Error 1 (grade.html, Line 9): Missing 'return' in onsubmit="checkMark()". Without 'return', the form submits and refreshes the page, making the result disappear immediately.
   Error 2 (grade.html, Line 17): Wrong function capitalization in onclick="showtable()". JavaScript is case-sensitive and the function is named showTable().
   Error 3 (grade.html, Line 19): Wrong script filename src="grades.js". The file is named grade.js (singular).
   Error 4 (grade.js, Line 2 & 3): Missing '=' assignment operators in 'let name document.forms...' and 'let mark document.forms...'.
   Error 5 (grade.js, Line 3): Mismatched bracket '["mark")' instead of '["mark"]'.
   Error 6 (grade.js, Line 5): Used single '=' assignment operator instead of '===' comparison operator in 'if (name = "")'.
   Error 7 (grade.js, Line 9): Misspelled 'isNan(mark)' instead of 'isNaN(mark)' (capital N).
   Error 8 (grade.js, Line 13): Used logical AND '&&' instead of logical OR '||' in 'if (mark < 0 && mark > 100)'. A number cannot be both less than 0 and greater than 100 at the same time.
   Error 9 (grade.js, Line 17): Missing '=' assignment operator in 'mark parseInt(mark);'.
   Error 10 (grade.js, Line 23 & 24): Missing closing parenthesis ')' in 'else if (mark >= 50' and lowercase '"c"' instead of '"C"'.
   Error 11 (grade.js, Line 26): Missing '=' assignment operator in 'grade "F";'.
   Error 12 (grade.js, Line 28-31): Wrong capitalization in 'getElementByID' (should be getElementById), missing quotes around ' got grade ', British spelling 'style.colour' (should be style.color), and 'return true' causes page reload (should be return false).
   Error 13 (grade.js, Line 38 & 42): Loop starts at 'i = 1' instead of 'i = 0' (skipping grade A), and wrong capitalization in '.innerHtml' (should be .innerHTML).
   ============================================================================ */

// Function to validate inputs, calculate grade, set color, and display timestamp
function checkMark() {
    let name = document.forms["gradeForm"]["name"].value.trim();
    let mark = document.forms["gradeForm"]["mark"].value.trim();

    // Case 1: Validate empty name
    if (name === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Extended Feature (Part 2, Step 5): Validate empty mark
    if (mark === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Case 2: Validate non-numeric input
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    // Convert mark to number and check valid range (0 to 100)
    mark = Number(mark);

    // Case 3: Validate out-of-range marks
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Determine grade and result text color (Part 2, Step 6)
    let grade = "";
    let resultColor = "";

    if (mark >= 80) {
        grade = "A";
        resultColor = "green";
    } else if (mark >= 65) {
        grade = "B";
        resultColor = "green";
    } else if (mark >= 50) {
        grade = "C";
        resultColor = "orange";
    } else {
        grade = "F";
        resultColor = "red";
    }

    // Display grade result with dynamic color
    let resultElement = document.getElementById("result");
    resultElement.innerHTML = name + " got grade " + grade;
    resultElement.style.color = resultColor;

    // Extended Feature (Part 2, Step 8): Display date and time checked using Date()
    let timeElement = document.getElementById("checkedTime");
    timeElement.innerHTML = "Checked on: " + Date();
    timeElement.style.color = resultColor;

    // Return false so the form does not refresh the page and erase the result
    return false;
}

// Extended Feature (Part 2, Step 7): Generate a random whole number from 0 to 100
function generateRandomMark() {
    let randomScore = Math.floor(Math.random() * 101);
    document.getElementById("mark").value = randomScore;
}

// Function to generate and display the full Grade Table (fixed loop starting at index 0)
function showTable() {
    let grades = ["A", "B", "C", "F"];
    let ranges = ["80-100", "65-79", "50-64", "0-49"];

    let tableHTML = "<table>";
    tableHTML += "<tr><th>Grade</th><th>Mark range</th></tr>";

    // Loop starts at i = 0 so all four grades (A, B, C, F) are included
    for (let i = 0; i < grades.length; i++) {
        tableHTML += "<tr><td>" + grades[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }

    tableHTML += "</table>";

    document.getElementById("tableContainer").innerHTML = tableHTML;
}