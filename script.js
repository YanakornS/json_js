// ฟังก์ชันโหลดข้อมูลจากไฟล์ JSON และแสดงบนหน้าเว็บ
function loadAttendanceData() {
    fetch("student_attendance.json") // ตรงนี้ให้เปลี่ยนเส้นทางไฟล์ให้ถูกต้อง
        .then((response) => response.json())
        .then((data) => {
            const tableContainer = document.getElementById("attendance-table");
            const table = document.createElement("table");
            // Add Bootstrap table classes
            table.classList.add("table", "table-bordered");

            // Create table header
            const thead = document.createElement("thead");
            thead.classList.add("table-light"); // Add dark mode to table header
            const headerRow = document.createElement("tr");
            const header1 = document.createElement("th");
            header1.textContent = "รหัสประจำตัว";
            headerRow.appendChild(header1);
            const header2 = document.createElement("th");
            header2.textContent = "ชื่อ";
            headerRow.appendChild(header2);
            for (let i = 1; i <= 4; i++) {
                const weekHeader = document.createElement("th");
                weekHeader.textContent = `สัปดาห์ที่ ${i}`;
                headerRow.appendChild(weekHeader);
            }
            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Create table body
            const tbody = document.createElement("tbody");
            data.forEach((student) => {
                const row = document.createElement("tr");
                const cell1 = document.createElement("td");
                cell1.textContent = student["รหัสประจำตัว"];
                row.appendChild(cell1);
                const cell2 = document.createElement("td");
                cell2.textContent = student["ชื่อ"];
                row.appendChild(cell2);
                for (let i = 1; i <= 4; i++) {
                    const weekCell = document.createElement("td");
                    const checkbox = document.createElement("input");
                    checkbox.type = "checkbox";
                    checkbox.checked = student[`สัปดาห์${i}`] === "มา"; // Check if the value is "มา"
                    checkbox.addEventListener("change", function() {
                        // Update the JSON data when the checkbox is changed
                        if (checkbox.checked) {
                            student[`สัปดาห์${i}`] = "มา";
                        } else {
                            student[`สัปดาห์${i}`] = "ไม่มา";
                        }
                    });
                    weekCell.appendChild(checkbox);
                    row.appendChild(weekCell);
                }
                tbody.appendChild(row);
            });
            table.appendChild(tbody);

            tableContainer.appendChild(table);

            // Create save button event
            const saveButton = document.getElementById("save-btn");
            saveButton.addEventListener("click", function() {
                saveAttendanceData(data);
            });
        })
        .catch((error) => console.error("Error loading the data:", error));
}

// Function to save JSON data
function saveAttendanceData(data) {
    // Convert the data to a JSON string
    const jsonData = JSON.stringify(data);

    // Create a Blob object containing the JSON data
    const blob = new Blob([jsonData], { type: "application/json" });

    // Create a temporary anchor element to trigger the download
    const anchor = document.createElement("a");
    anchor.href = URL.createObjectURL(blob);
    anchor.download = "attendance_data.json";

    // Trigger the download
    anchor.click();

    // Cleanup
    URL.revokeObjectURL(anchor.href);
}

// Call the loadAttendanceData function when the window is fully loaded
window.onload = loadAttendanceData;