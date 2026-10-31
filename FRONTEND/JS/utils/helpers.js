export function get_today() {
    const today = new Date();
    return today.toISOString().split('T')[0];
}
export function formatTime(value) {
    if (!value) return "N/A";

    const date = new Date(value);

    if (isNaN(date.getTime())) return value;

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }) + " • " + date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });
}

export function delay_color(delay) {
    if (delay === "N/A" || delay === "TBA" || delay === null || delay === undefined) {
        return "color: black; background: white;";
    }
    else if (delay < 5) {
        return "color: green; background: lightgreen;";
    }
    else if (delay < 25) {
        return "color: orange; background: lightyellow;";
    }
    else {
        return "color: red; background: lightcoral;";
    }
}
