export const getDripStatus = (drips) => {
    const status = {};
    for (const key in drips) {
        status[key] = drips[key].status;
    }
    return status;
};
