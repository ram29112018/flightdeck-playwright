const flights = [
    { id: "BA101", status: "ON_TIME" },
    { id: "BA102", status: "DELAYED" },
    { id: "BA103", status: "ON_TIME" }
];

const delayedFlights = flights.filter(
    flight => flight.status === "DELAYED"
);
