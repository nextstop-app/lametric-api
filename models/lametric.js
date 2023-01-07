
const icons = { //TODO: search train, there are up/down symbols too
    "1": 51714,
    "2": 51715,
    "3": 51716,
    "4": 51717,
    "5": 51718,
    "6": 51719,
    "7": 51720,
    "A": 51721,
    "C": 51722,
    "E": 51723,
    "B": 51724,
    "D": 51725,
    "F": 51726,
    "M": 51728,
    "L": 51727,
    "J": 51729,
    "Z": 51730,
    "R": 51731,
    "W": 51732,
    "Q": 51713,
    "G": 51712,
    "N": 51617
};
const routeIdToIcon = (routeId) => {
    return icons[routeId] || 2451;
}
const generateFrame = (text, routeId, index = 0) => {

    return {
        "text": text,
        "icon": routeIdToIcon(routeId),
        "index": index
    }
}
const generateFrames = (data, maxFrames = 4) => {
    const stopName = data.stopName;
    const trains = data.trains;
    const direction = data.direction;
    const result = { frames: [
        {
            "text": `${stopName} (${direction})`,
            "icon": 4469,
            "index": 0
        }
    ] };
    const max =  trains.length >= maxFrames ? maxFrames : trains.length;
    let time, routeId;
    for(let i=0; i < (max-1); i++){
        ({time, routeId} = trains[i]);
        result.frames.push(generateFrame(time, routeId, i+1))
    }

    return result;
}

module.exports = {
    generateFrames
}