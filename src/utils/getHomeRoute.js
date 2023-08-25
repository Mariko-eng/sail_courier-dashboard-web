
export const getHomeRoute = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    // console.log(user)

    if (user) {
        return "/home";
    } else {
        return "/login";
    }
};