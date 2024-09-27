document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const tableBody = document.querySelector('#entriesTable tbody');
    const today = new Date();

    // Function to check if age is between 18 and 55
    const isValidAge = (dob) => {
        const birthDate = new Date(dob);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        // Adjust age if birth month has not occurred yet this year
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        return age >= 18 && age <= 55;
    };

    // Load saved entries from local storage
    const loadEntries = () => {
        const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
        savedEntries.forEach(entry => addEntryToTable(entry));
    };

    // Add entry to table
    const addEntryToTable = (entry) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.password}</td>
            <td>${entry.dob}</td>
            <td>${entry.acceptedTerms}</td>
        `;
        tableBody.appendChild(row);
    };

    // Handle form submission
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const acceptedTerms = document.getElementById('terms').checked;

        // Validate date of birth (age 18-55)
        if (!isValidAge(dob)) {
            alert('Age must be between 18 and 55 years.');
            return;
        }

        // Create entry object
        const entry = {
            name,
            email,
            password,
            dob,
            acceptedTerms: acceptedTerms ? 'true' : 'false'
        };

        // Save entry to local storage
        const savedEntries = JSON.parse(localStorage.getItem('entries')) || [];
        savedEntries.push(entry);
        localStorage.setItem('entries', JSON.stringify(savedEntries));

        // Add entry to the table
        addEntryToTable(entry);

        // Reset the form
        form.reset();
    });

    // Load existing entries on page load
    loadEntries();
});
