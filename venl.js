document.addEventListener('DOMContentLoaded', () => {
    // Theme Switch Logic
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
        const html = document.documentElement;
        const isDark = html.getAttribute('data-theme') === 'dark';
        html.setAttribute('data-theme', isDark ? 'light' : 'dark');
        themeBtn.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });
});

// THE OUTPUT LOGIC: Fetch and Calculate
function fetchVendorLedger() {
    const searchId = document.getElementById('vSearchId').value;
    
    // Internal Linking: Accessing the vendor database we created
    const vendorDB = JSON.parse(localStorage.getItem('vendorDB')) || [];
    const vendor = vendorDB.find(v => v.accNo.toString() === searchId || v.acc === searchId);

    if (vendor) {
        // Populate Header Info
        document.getElementById('dispId').value = vendor.accNo || vendor.acc;
        document.getElementById('dispName').value = vendor.name;
        document.getElementById('sideVendorName').value = vendor.name;
        document.getElementById('dispAddr').value = vendor.address || "Karachi";
        document.getElementById('dispContact').value = vendor.phone || "+9231234567";
        document.getElementById('topBalance').value = vendor.balance;

        // Generate the All Data Wise Ledger rows
        renderLedgerRows(vendor);
    } else {
        alert("❌ Vendor Account Not Found. Search '1' for Demo.");
    }
}

function renderLedgerRows(vendor) {
    const tbody = document.getElementById('ledgerTableBody');
    tbody.innerHTML = ""; // Clear existing

    // Simulation logic to match your image precisely
    // 1. Stock Purchase Row (Blue)
    const row1 = `<tr class="purchase-row">
        <td>1</td>
        <td>10-Jan-2021</td>
        <td>PO-021164420</td>
        <td>PB-1001</td>
        <td>19 LTR Jar</td>
        <td>550</td>
        <td>100</td>
        <td>55000.00</td>
        <td>0</td>
    </tr>`;

    // 2. Payment Entry (Yellow)
    const row2 = `<tr class="payment-row">
        <td>2</td>
        <td>10-Jan-2021</td>
        <td>PAY-9921</td>
        <td>-</td>
        <td>Payment via Cash</td>
        <td>-</td>
        <td>-</td>
        <td>0</td>
        <td>1000.00</td>
    </tr>`;

    tbody.innerHTML = row1 + row2;

    // Update Bottom Summary Output
    document.getElementById('billAmt').value = "55000";
    document.getElementById('totAmt').value = "75000"; // Assuming opening bal included
    document.getElementById('payAmt').value = "1000";
    document.getElementById('finalBal').value = vendor.balance;
}