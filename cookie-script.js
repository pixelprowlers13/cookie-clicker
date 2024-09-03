const v = {
    clicks: 0,
    points_per_click: 1,
    points_per_click_cost: 10,
    idle_income: 0,
    idle_income_cost: 20,
};

function cookie_click() {
    v.clicks += v.points_per_click;
    updateUI();
    console.log(v.clicks + " points");
}

function upgrade() {
    if (v.clicks >= v.points_per_click_cost) {
        v.clicks -= v.points_per_click_cost;
        v.points_per_click += 1;
        v.points_per_click_cost += 5;
        updateUI();
        console.log(v.points_per_click_cost + " cost");
    } else {
        window.alert('Not enough clicks');
    }
}

function idle_upgrade() {
    if (v.clicks >= v.idle_income_cost) {
        v.clicks -= v.idle_income_cost;
        v.idle_income += 1;
        v.idle_income_cost *= 2;
        updateUI();
    } else {
        window.alert('Not enough clicks');
    }
}

function idle_income_func() {
    v.clicks += v.idle_income;
    updateUI();
}

// Call idle_income_func every second
setInterval(idle_income_func, 1000);

function save() {
    localStorage.setItem("values", JSON.stringify(v));
}

function load() {
    const savedValues = localStorage.getItem("values");
    if (savedValues) {
        try {
            const parsedValues = JSON.parse(savedValues);
            v.clicks = parsedValues.clicks;
            v.points_per_click = parsedValues.points_per_click;
            v.points_per_click_cost = parsedValues.points_per_click_cost;
            v.idle_income = parsedValues.idle_income;
            v.idle_income_cost = parsedValues.idle_income_cost;
            updateUI();
        } catch (error) {
            console.error('Failed to load saved data:', error);
        }
    } else {
        console.log('No saved game data found.');
    }
}

function updateUI() {
    document.getElementById("clicks").innerHTML = "Clicks: " + v.clicks;
    document.getElementById("points_per_click").innerHTML = "Points per Click: " + v.points_per_click;
    document.getElementById("points_per_click_cost").innerHTML = "Upgrade Cost: " + v.points_per_click_cost;
    document.getElementById("idle_income").innerHTML = "Idle Income: " + v.idle_income;
    document.getElementById("idle_income_cost").innerHTML = "Idle Income Cost: " + v.idle_income_cost;

    // Disable buttons if not enough clicks for upgrades
    document.getElementById("upgrade-button").disabled = v.clicks < v.points_per_click_cost;
    document.getElementById("idle-upgrade-button").disabled = v.clicks < v.idle_income_cost;
}

// Export save data as a JSON file
function exportSave() {
    const dataStr = JSON.stringify(v);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = 'cookie-clicker-save.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
}

// Import save data from a JSON file
function importSave(event) {
    const file = event.target.files[0];
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const contents = e.target.result;
            const importedValues = JSON.parse(contents);

            v.clicks = importedValues.clicks;
            v.points_per_click = importedValues.points_per_click;
            v.points_per_click_cost = importedValues.points_per_click_cost;
            v.idle_income = importedValues.idle_income;
            v.idle_income_cost = importedValues.idle_income_cost;
            updateUI();
            save(); // Save imported data to localStorage
        } catch (error) {
            console.error('Failed to import save data:', error);
            window.alert('Failed to import save data.');
        }
    };

    reader.readAsText(file);
}

// Auto-load the saved game state when the page loads
window.onload = load;
