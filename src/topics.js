const topics = [
    { name: "General", color: "orange" },
    { name: "Drama", color: "blue" },
    { name: "Sports", color: "red" },
    { name: "Movies", color: "yellow" },
    { name: "Other", color: "grey" }
];

const filters = [
    { name: "All Posts", color: "transparent" },
    { name: "My Posts", color: "transparent" },
    { name: "Other Posts", color: "transparent" },
    ...topics
];

export {topics, filters};