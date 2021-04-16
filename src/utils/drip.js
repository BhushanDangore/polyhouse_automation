const requirdProperties = ['status', 'dripNumber', 'startTime', 'waterLevel'];

export const filterDripsArray = (drips) => {
    if (!drips?.length) return undefined;

    return drips.filter((drip) =>
        requirdProperties.every((key) => drip?.hasOwnProperty(key))
    );
};

export const getDripStatus = (drips) => {
    return drips?.reduce((acc, drip) => {
        acc['_' + drip.dripNumber] = drip.status;
        return acc;
    }, {});
};
