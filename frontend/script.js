const API_URL = "http://localhost:5000/api";


// =========================
// PAGE LOAD
// =========================

document.addEventListener("DOMContentLoaded", () => {

    loadBooks();
    loadMembers();
    loadCategories();
    loadBorrowings();

    setupForms();

});


// =========================
// API HELPER
// =========================

async function apiRequest(url, options = {}) {

    try {

        const response = await fetch(`${API_URL}${url}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {})
            }
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Something went wrong");
        }

        return data;

    } catch (error) {

        console.error("API Error:", error);

        showNotification(
            error.message || "Server connection failed"
        );

        throw error;
    }
}


// =========================
// LOAD BOOKS
// =========================

async function loadBooks() {

    const container =
        document.getElementById("booksContainer");

    try {

        container.innerHTML =
            `<div class="loading">Loading books...</div>`;

        const data = await apiRequest("/books");

        const books = data.books || [];

        document.getElementById("totalBooks").textContent =
            data.count ?? books.length;

        if (books.length === 0) {

            container.innerHTML =
                `<div class="loading">
                    No books available.
                </div>`;

            return;
        }

        container.innerHTML = books.map(book => {

            const available =
                Number(book.availableCopies || 0);

            return `
                <div class="book-card">

                    <h3>📚 ${escapeHtml(book.title)}</h3>

                    <p>
                        <strong>Author:</strong>
                        ${escapeHtml(book.author)}
                    </p>

                    <p>
                        <strong>ISBN:</strong>
                        ${escapeHtml(book.isbn)}
                    </p>

                    <p>
                        <strong>Category:</strong>
                        ${escapeHtml(book.category)}
                    </p>

                    <p>
                        <strong>Total Copies:</strong>
                        ${book.totalCopies}
                    </p>

                    <p class="${available > 0
                    ? "available"
                    : "unavailable"
                }">

                        ${available > 0
                    ? `Available: ${available}`
                    : "Currently Unavailable"
                }

                    </p>

                </div>
            `;

        }).join("");

    } catch (error) {

        container.innerHTML =
            `<div class="loading">
                Unable to load books.
            </div>`;
    }
}


// =========================
// LOAD MEMBERS
// =========================

async function loadMembers() {

    const container =
        document.getElementById("membersContainer");

    try {

        container.innerHTML =
            `<p class="loading">Loading members...</p>`;

        const data = await apiRequest("/members");

        const members = data.members || [];

        document.getElementById("totalMembers").textContent =
            data.count ?? members.length;

        if (members.length === 0) {

            container.innerHTML =
                `<p class="loading">
                    No active members found.
                </p>`;

            return;
        }

        container.innerHTML = `
            <table>

                <thead>

                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Membership ID</th>
                        <th>Address</th>
                    </tr>

                </thead>

                <tbody>

                    ${members.map(member => `

                        <tr>

                            <td>
                                ${escapeHtml(member.name)}
                            </td>

                            <td>
                                ${escapeHtml(member.email)}
                            </td>

                            <td>
                                ${escapeHtml(member.phone || "-")}
                            </td>

                            <td>
                                ${escapeHtml(
            member.membershipId || "-"
        )}
                            </td>

                            <td>
                                ${escapeHtml(
            member.address || "-"
        )}
                            </td>

                        </tr>

                    `).join("")}

                </tbody>

            </table>
        `;

    } catch (error) {

        container.innerHTML =
            `<p class="loading">
                Unable to load members.
            </p>`;
    }
}


// =========================
// LOAD CATEGORIES
// =========================

async function loadCategories() {

    const container =
        document.getElementById("categoriesContainer");

    try {

        container.innerHTML =
            `<div class="loading">
                Loading categories...
            </div>`;

        const data =
            await apiRequest("/categories");

        const categories =
            data.categories || [];

        document.getElementById("totalCategories").textContent =
            data.count ?? categories.length;

        if (categories.length === 0) {

            container.innerHTML =
                `<div class="loading">
                    No categories found.
                </div>`;

            return;
        }

        container.innerHTML =
            categories.map(category => `

                <div class="category-card">

                    <h3>
                        🏷️ ${escapeHtml(category.name)}
                    </h3>

                    <p>
                        ${escapeHtml(
                category.description ||
                "No description available."
            )}
                    </p>

                </div>

            `).join("");

    } catch (error) {

        container.innerHTML =
            `<div class="loading">
                Unable to load categories.
            </div>`;
    }
}


// =========================
// LOAD BORROWINGS
// =========================

async function loadBorrowings() {

    const container =
        document.getElementById(
            "borrowingsContainer"
        );

    try {

        container.innerHTML =
            `<p class="loading">
                Loading borrowing records...
            </p>`;

        const data =
            await apiRequest("/borrowings");

        const borrowings =
            data.borrowings || [];

        const activeBorrowings =
            borrowings.filter(
                borrowing =>
                    borrowing.status === "issued" ||
                    borrowing.status === "overdue"
            );

        document.getElementById(
            "borrowedBooks"
        ).textContent = activeBorrowings.length;

        if (borrowings.length === 0) {

            container.innerHTML =
                `<p class="loading">
                    No borrowing records found.
                </p>`;

            return;
        }

        container.innerHTML = `

            <table>

                <thead>

                    <tr>
                        <th>Member</th>
                        <th>Book</th>
                        <th>Issue Date</th>
                        <th>Due Date</th>
                        <th>Return Date</th>
                        <th>Status</th>
                        <th>Fine</th>
                        <th>Borrowing ID</th>
                    </tr>

                </thead>

                <tbody>

                    ${borrowings.map(borrowing => {

            const member =
                borrowing.member || {};

            const book =
                borrowing.book || {};

            const status =
                borrowing.status || "-";

            return `

                            <tr>

                                <td>
                                    ${escapeHtml(
                member.name || "-"
            )}
                                </td>

                                <td>
                                    ${escapeHtml(
                book.title || "-"
            )}
                                </td>

                                <td>
                                    ${formatDate(
                borrowing.issueDate
            )}
                                </td>

                                <td>
                                    ${formatDate(
                borrowing.dueDate
            )}
                                </td>

                                <td>
                                    ${formatDate(
                borrowing.returnDate
            )}
                                </td>

                                <td class="
                                    ${status === "issued"
                    ? "status-issued"
                    : status === "returned"
                        ? "status-returned"
                        : status === "overdue"
                            ? "status-overdue"
                            : ""
                }
                                ">
                                    ${escapeHtml(status)}
                                </td>

                                <td>
                                    ₹${borrowing.fine || 0}
                                </td>

                                <td>
                                    <small>
                                        ${escapeHtml(
                    borrowing._id
                )}
                                    </small>
                                </td>

                            </tr>

                        `;

        }).join("")}

                </tbody>

            </table>
        `;

    } catch (error) {

        container.innerHTML =
            `<p class="loading">
                Unable to load borrowing records.
            </p>`;
    }
}


// =========================
// ISSUE BOOK
// =========================

async function issueBook(event) {

    event.preventDefault();

    const memberId =
        document.getElementById(
            "issueMemberId"
        ).value.trim();

    const bookId =
        document.getElementById(
            "issueBookId"
        ).value.trim();

    const dueDate =
        document.getElementById(
            "dueDate"
        ).value;

    if (!memberId || !bookId || !dueDate) {

        showNotification(
            "Please fill all issue book fields."
        );

        return;
    }

    try {

        const data = await apiRequest(
            "/borrowings/issue",
            {
                method: "POST",

                body: JSON.stringify({
                    memberId,
                    bookId,
                    dueDate
                })
            }
        );

        showNotification(
            data.message ||
            "Book issued successfully."
        );

        document
            .getElementById("issueBookForm")
            .reset();

        await loadBooks();
        await loadBorrowings();

    } catch (error) {

        console.error(error);
    }
}


// =========================
// RETURN BOOK
// =========================

async function returnBook(event) {

    event.preventDefault();

    const borrowingId =
        document.getElementById(
            "returnBorrowingId"
        ).value.trim();

    if (!borrowingId) {

        showNotification(
            "Please enter borrowing ID."
        );

        return;
    }

    try {

        const data = await apiRequest(
            `/borrowings/${borrowingId}/return`,
            {
                method: "PUT"
            }
        );

        showNotification(
            `${data.message} Fine: ₹${data.fine || 0}`
        );

        document
            .getElementById("returnBookForm")
            .reset();

        await loadBooks();
        await loadBorrowings();

    } catch (error) {

        console.error(error);
    }
}


// =========================
// LOGIN
// =========================

async function loginUser(event) {

    event.preventDefault();

    const email =
        document.getElementById(
            "loginEmail"
        ).value.trim();

    const password =
        document.getElementById(
            "loginPassword"
        ).value;

    const message =
        document.getElementById(
            "loginMessage"
        );

    try {

        const data = await apiRequest(
            "/auth/login",
            {
                method: "POST",

                body: JSON.stringify({
                    email,
                    password
                })
            }
        );

        localStorage.setItem(
            "libraryToken",
            data.token
        );

        localStorage.setItem(
            "libraryUser",
            JSON.stringify(data.user)
        );

        message.innerHTML = `
            <p style="color: green; margin-top: 15px;">
                Login successful!
            </p>
        `;

        showNotification(
            `Welcome ${data.user.name}`
        );

        setTimeout(() => {

            closeLogin();

            document
                .getElementById("loginForm")
                .reset();

        }, 1000);

    } catch (error) {

        message.innerHTML = `
            <p style="color: red; margin-top: 15px;">
                ${escapeHtml(error.message)}
            </p>
        `;
    }
}


// =========================
// REGISTER
// =========================

async function registerUser(event) {

    event.preventDefault();

    const name =
        document.getElementById(
            "registerName"
        ).value.trim();

    const email =
        document.getElementById(
            "registerEmail"
        ).value.trim();

    const password =
        document.getElementById(
            "registerPassword"
        ).value;

    const message =
        document.getElementById(
            "registerMessage"
        );

    try {

        const data = await apiRequest(
            "/auth/register",
            {
                method: "POST",

                body: JSON.stringify({
                    name,
                    email,
                    password
                })
            }
        );

        message.innerHTML = `
            <p style="color: green; margin-top: 15px;">
                ${escapeHtml(data.message)}
            </p>
        `;

        showNotification(
            "Registration successful."
        );

        document
            .getElementById("registerForm")
            .reset();

    } catch (error) {

        message.innerHTML = `
            <p style="color: red; margin-top: 15px;">
                ${escapeHtml(error.message)}
            </p>
        `;
    }
}


// =========================
// FORM SETUP
// =========================

function setupForms() {

    const issueForm =
        document.getElementById(
            "issueBookForm"
        );

    const returnForm =
        document.getElementById(
            "returnBookForm"
        );

    const loginForm =
        document.getElementById(
            "loginForm"
        );

    const registerForm =
        document.getElementById(
            "registerForm"
        );

    if (issueForm) {

        issueForm.addEventListener(
            "submit",
            issueBook
        );

    }

    if (returnForm) {

        returnForm.addEventListener(
            "submit",
            returnBook
        );

    }

    if (loginForm) {

        loginForm.addEventListener(
            "submit",
            loginUser
        );

    }

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            registerUser
        );

    }

}


// =========================
// LOGIN MODAL
// =========================

function openLogin() {

    document.getElementById(
        "loginModal"
    ).style.display = "flex";

}

function closeLogin() {

    document.getElementById(
        "loginModal"
    ).style.display = "none";

}


// =========================
// REGISTER MODAL
// =========================

function openRegister() {

    document.getElementById(
        "registerModal"
    ).style.display = "flex";

}

function closeRegister() {

    document.getElementById(
        "registerModal"
    ).style.display = "none";

}


// =========================
// VIEW BOOKS
// =========================

function showBooks() {

    document
        .getElementById("books")
        .scrollIntoView({
            behavior: "smooth"
        });

    loadBooks();

}


// =========================
// NOTIFICATION
// =========================

function showNotification(message) {

    const notification =
        document.getElementById(
            "notification"
        );

    notification.textContent = message;

    notification.style.display = "block";

    setTimeout(() => {

        notification.style.display = "none";

    }, 3000);

}


// =========================
// DATE FORMAT
// =========================

function formatDate(date) {

    if (!date) {
        return "-";
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
        return "-";
    }

    return parsedDate.toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );
}


// =========================
// HTML ESCAPE
// =========================

function escapeHtml(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


// =========================
// CLOSE MODAL ON OUTSIDE CLICK
// =========================

window.addEventListener("click", (event) => {

    const loginModal =
        document.getElementById("loginModal");

    const registerModal =
        document.getElementById("registerModal");

    if (event.target === loginModal) {
        closeLogin();
    }

    if (event.target === registerModal) {
        closeRegister();
    }

});