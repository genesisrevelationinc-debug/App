if (response.status >= 200 && response.status < 300) {
    // success
} else if (response.status === 404) {
    // handle not found
} else {
    // generic error
}
