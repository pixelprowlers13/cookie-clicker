const v = {
    clicks: 0,
    points_per_click: 1,
    points_per_click_cost: 10
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
}

// Auto-load the saved game state when the page loads
window.onload = load;
