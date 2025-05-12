/**
 * Brick class keeps track of the dimensions of tile used in game
 */
class Brick {
    static width = 30;
    static height = 30;

    static setup(){
    Brick.width = scaleX * 30;
    Brick.height = scaleY * 30;
    }
}
