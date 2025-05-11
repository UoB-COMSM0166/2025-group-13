/**
 * This file contains the layout of the game levels. Each level has a map associated with it which has game objects
 * which includes platforms, foods, ground damage, enemies, skyFalls and caves. Layout of all the levels is unique i.e.
 * the relative position of all the game objects is different for different levels. These initial location coordinates and types of
 * game objects are stored in this file which then be used by Map class to generate objects in memory for game play.
 */

//#region: Level1
// constructor(type = null, positionX, positionY, widthOrBrickNumber, height = null, assetManager)
let level1Platforms =
    [
        ["GROUND", 335, 485, 780, 30], ["GROUND", 1055, 485, 670, 30], ["GROUND", 2125, 485, 850, 30],
        ["FLOAT", 120, 300, 90, 30], ["TREE", 250, 425, 30, 90], ["FLOAT", 400, 410, 90, 30], ["FLOAT", 900, 420, 90, 30], ["FLOAT", 1050, 330, 150, 30], ["FLOAT", 1540, 400, 210, 30], ["TREE", 2000, 415, 30, 120],
    ];

// constructor(type = null, positionX, positionY, assetManager)
let level1Foods =
    [
        //on ground(y = 460)
        //apple height related to tree height
        ["MEAT", 450, 460], ["APPLE", 250, 370], ["MEAT", 1000, 460], ["MEAT", 1100, 305], ["APPLE", 2000, 345],
    ];

// constructor(type = null, positionX, positionY, assetManager)
let level1GroundDamage =
    [
        //on ground(y = 445)
        ["FIRE", 500, 445, 50, 5], ["FIRE", 1100, 445, 100, 1], ["FIRE", 1850, 445]
    ];

// constructor(type = null, positionX, positionY, assetManager, speed = 1.2, maxDistance = 100, pauseTime = 6)
let level1Enemy =
[
    //on ground(y = 436)
    //default speed = 1.2, maxDistance = 100, pauseTime = 6
    ["FIRE", 700, 436, 0.8, 50, 10], ["FIRE", 1200, 436, 1.2, 100, 5], ["FIRE", 1450, 350, 0.5, 160, 1]
];

let level1SkyFall =
[
    //on ground(y = 445)
    //default constructor(type = null, positionX, startY, assetManager, fallSpeed = 5, groundY = 485, delayBeforeFall = 120)
    ["FIRE", 700, -100, 5, 485, 60], ["FIRE", 1250, -120, 5, 485, 90], ["FIRE", 2050, -150, 5, 485, 120]
];

let level1Cave = ["FIRE",2200, 438];
//#endregion

//#region: Level2
let level2Platforms =
    [
        ["GROUND", 100, 485, 200, 30], ["GROUND", 670, 485, 350, 30], ["GROUND", 1700, 485, 500, 30], ["GROUND", 2180, 485, 150, 30],
        ["GROUND", 2650, 485, 165, 30], ["GROUND", 3330, 485, 190, 30], ["GROUND", 3900, 485, 480, 30],
        //(type = null, positionX, positionY, widthOrBrickNumber, height = null, assetManager)
        ["FLOAT", 290, 380, 150, 30], ["FLOAT", 470, 315, 150, 30], ["FLOAT", 975, 50, 150, 30], ["FLOAT", 975, 382, 150, 30],
        ["FLOAT", 1150, 320, 150, 30], ["FLOAT", 1150, 150, 150, 30], ["FLOAT", 1330, 250, 150, 30], ["FLOAT", 1550, 320, 150, 30],
        ["FLOAT", 1863, 218, 150, 30], ["FLOAT", 2020, 120, 150, 30], ["FLOAT", 2240, 190, 150, 30], ["FLOAT", 2318, 350, 150, 30],
        ["FLOAT", 2490, 270, 150, 30], ["FLOAT", 2880, 350, 150, 30], ["FLOAT", 2990, 220, 150, 30], ["FLOAT", 3170, 150, 150, 30],
        ["FLOAT", 3170, 350, 150, 30], ["FLOAT", 3524, 250, 150, 30], ["FLOAT", 3800, 300, 150, 30],

        ["TREE", 786, 400, 30, 150],
        ["TREE", 1760, 380, 30, 180], ["TREE", 2695, 380, 30, 180], ["TREE", 3367, 400, 30, 150],
    ];
let level2Foods =
    [
        //(type = null, positionX, positionY, assetManager)
        //on ground(y = 460)
        ["MEAT", 520, 460], ["MEAT", 910, 27], ["MEAT", 2023, 95], ["MEAT", 2120, 460],
        //appleY = ?
        ["APPLE", 786, 315], ["APPLE", 1760, 280], ["APPLE", 2695, 280], ["APPLE", 3367, 315],
    ];

let level2GroundDamage =
    [
        //on ground(y = 475)
        ["ICESPIKE", 670, 475], ["ICESPIKE", 1650, 475], ["ICESPIKE", 3320, 475]
    ];

let level2Enemy =
[
    //on ground(y = 435)
    //default speed = 1.2, maxDistance = 100, pauseTime = 6
    ["ICESPIKE", 570, 435, 1, 50, 10], ["ICESPIKE", 1110, 100, 1.5, 100, 5], ["ICESPIKE", 3820, 435, 0.7, 150, 1]
];

let level2SkyFall =
[
    //on ground(y = 445)
    // type, positionX, startY, fallSpeed, groundY, delayBeforeFall
    ["ICESPIKE", 870, -100, 5, 485, 60], ["ICESPIKE", 970, -100, 6, 485, 65], ["ICESPIKE", 1070, -100, 4, 485, 55], ["ICESPIKE", 1270, -100, 4, 485, 55], ["ICESPIKE", 1470, -100, 7, 485, 35], ["ICESPIKE", 1670, -100, 9, 485, 25], ["ICESPIKE", 1850, -120, 5, 485, 90], ["ICESPIKE", 3520, -150, 6, 485, 70], ["ICESPIKE", 3520, -150, 3, 485, 40], ["ICESPIKE", 3520, -150, 9, 485, 90]
];

let level2Cave = ["ICE",4070, 438];
//#endregion

//#region: Level3
let level3Platforms =
    [
        ["GROUND", 100, 485, 200, 30], ["GROUND", 670, 485, 350, 30], ["GROUND", 1700, 485, 500, 30], ["GROUND", 2180, 485, 150, 30],
        ["GROUND", 2650, 485, 165, 30], ["GROUND", 3330, 485, 190, 30], ["GROUND", 3900, 485, 480, 30],
        //(type = null, positionX, positionY, widthOrBrickNumber, height = null, assetManager)
        ["FLOAT", 290, 380, 150, 30], ["FLOAT", 470, 315, 150, 30], ["FLOAT", 975, 50, 150, 30], ["FLOAT", 975, 382, 150, 30],
        ["FLOAT", 1150, 320, 150, 30], ["FLOAT", 1150, 150, 150, 30], ["FLOAT", 1330, 250, 150, 30], ["FLOAT", 1550, 320, 150, 30],
        ["FLOAT", 1863, 218, 150, 30], ["FLOAT", 2020, 120, 150, 30], ["FLOAT", 2240, 190, 150, 30], ["FLOAT", 2318, 350, 150, 30],
        ["FLOAT", 2490, 270, 150, 30], ["FLOAT", 2880, 350, 150, 30], ["FLOAT", 2990, 220, 150, 30], ["FLOAT", 3170, 150, 150, 30],
        ["FLOAT", 3170, 350, 150, 30], ["FLOAT", 3524, 250, 150, 30], ["FLOAT", 3800, 300, 150, 30],

        ["TREE", 786, 400, 30, 150],
        ["TREE", 1760, 380, 30, 180], ["TREE", 2695, 380, 30, 180], ["TREE", 3367, 400, 30, 150],
    ];
let level3Foods =
    [
        //(type = null, positionX, positionY, assetManager)
        //on ground(y = 460)
        ["MEAT", 520, 460], ["MEAT", 910, 27], ["MEAT", 2023, 95], ["MEAT", 2120, 460],
        //appleY = ?
        ["APPLE", 786, 315], ["APPLE", 1760, 280], ["APPLE", 2695, 280], ["APPLE", 3367, 315],
    ];

let level3GroundDamage =
    [
        //on ground(y = 455)
        ["DESERT", 670, 455], ["DESERT", 1650, 455], ["DESERT", 3320, 455]
    ];

let level3Enemy =
[
    //on ground(y = 435)
    //default speed = 1.2, maxDistance = 100, pauseTime = 6
    ["DESERT", 570, 435, 1, 50, 10], ["DESERT", 1110, 100, 1.5, 100, 5], ["DESERT", 3820, 435, 0.7, 150, 1]
];

let level3SkyFall =
[
    //on ground(y = 445)
    // type, positionX, startY, fallSpeed, groundY, delayBeforeFall
    ["DESERT", 870, -100, 5, 485, 60], ["DESERT", 970, -100, 6, 485, 65], ["DESERT", 1070, -100, 4, 485, 55], ["DESERT", 1270, -100, 4, 485, 55], ["DESERT", 1470, -100, 7, 485, 35], ["DESERT", 1670, -100, 9, 485, 25], ["DESERT", 1850, -120, 5, 485, 90], ["DESERT", 3520, -150, 6, 485, 70], ["DESERT", 3520, -150, 3, 485, 40], ["DESERT", 3520, -150, 9, 485, 90]
];

let level3Cave = ["DESERT",4070, 438];
//#endregion

/**
 * List of all the layouts in the game.
 * @type {(string|number)[][][][]} - List of lists of coordinates and types of game objects
 */
let layouts =
    [
        [level1Platforms, level1Foods, level1GroundDamage, level1Enemy, level1SkyFall, level1Cave],
        [level2Platforms, level2Foods, level2GroundDamage, level2Enemy, level2SkyFall, level2Cave],
        [level3Platforms, level3Foods, level3GroundDamage, level3Enemy, level3SkyFall, level3Cave],
        
    ];
