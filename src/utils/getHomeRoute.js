
export const getHomeRoute = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
        return "/home";
    } else {
        return "/login";
    }
};